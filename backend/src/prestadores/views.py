from django.shortcuts import render
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.views import IsAuthenticated
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
        serializer = PrestadorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrestadorDetail(APIView):


    def _get_prestador(self, pk):
        try:
            return Prestador.objects.get(pk=pk)
        except Prestador.DoesNotExist:
            return Http404
    
    def get(self, request, pk, format=None):
        prestador = self._get_prestador(pk=pk)
        serializer = PrestadorSerializer(prestador)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        prestador = self._get_prestador(pk=pk)
        serializer = PrestadorSerializer(prestador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        prestador = self._get_prestador(pk=pk)
        prestador.delete()
        return Response(status.HTTP_204_NO_CONTENT)

