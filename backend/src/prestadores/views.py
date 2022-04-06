from cmath import exp
from django.shortcuts import render
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .models import Prestador
from .serializers import PrestadorSerializer

# Create your views here.
class PrestadorList(APIView):

    def get(self,request, format=None):
        prestador = Prestador.objects.all()
        serializer = PrestadorSerializer(prestador, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PrestadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrestadorDetail(APIView):

    permission_classes = [IsAuthenticated]
    
    def _get_prestador(self, request):
        try:
            return Prestador.objects.get(user=request.user.id)
        except Prestador.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        prestador = self._get_prestador(request)
        serializer = PrestadorSerializer(prestador)
        return Response(serializer.data)

    def put(self, request, format=None):
        prestador = self._get_prestador(request)
        request.data['user'] = request.user.id
        serializer = PrestadorSerializer(prestador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request,format=None):
        prestador = self._get_prestador(request)
        prestador.delete()
        return Response(status.HTTP_204_NO_CONTENT)

