from cmath import exp
from django.shortcuts import render
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Prestador, Veterinario
from .serializers import PrestadorSerializer, PrestadorNestedSerializer, VeterinarioSerializer, VeterinarioUpdateSerializer

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
    
    def __get_prestador(self, request):
        try:
            return Prestador.objects.get(user=request.user.id)
        except Prestador.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        prestador = self.__get_prestador(request)
        serializer = PrestadorNestedSerializer(prestador)
        return Response(serializer.data)

    def put(self, request, format=None):
        prestador = self.__get_prestador(request)
        request.data['user'] = request.user.id
        serializer = PrestadorSerializer(prestador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request,format=None):
        prestador = self.__get_prestador(request)
        prestador.delete()
        return Response(status.HTTP_204_NO_CONTENT)

class VeterinarioList(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request, format=None):
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        veterinario = Veterinario.objects.filter(prestador=prestador)
        serializer = VeterinarioSerializer(veterinario, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        request.data['prestador'] = prestador.id
        serializer = VeterinarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VeterinarioDetail(APIView):

    permission_classes = [IsAuthenticated]
    
    def __get_veterinario(self, id_vet, prestador):
        try:
            return Veterinario.objects.get(id=id_vet, prestador=prestador)
        except Prestador.DoesNotExist:
            raise Http404

    def __get_prestador(self, request):
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        return prestador.id
    
    def get(self, request, id_vet, format=None):
        veterinario = self.__get_veterinario(id_vet=id_vet, prestador=self.__get_prestador(request=request))
        serializer = VeterinarioSerializer(veterinario)
        return Response(serializer.data)

    def put(self, request, id_vet, format=None):
        prestador = self.__get_prestador(request=request)
        veterinario = self.__get_veterinario(id_vet=id_vet, prestador=prestador)
        request.data['prestador'] = prestador
        serializer = VeterinarioUpdateSerializer(veterinario, data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id_vet, format=None):
        veterinario = self.__get_veterinario(id_vet=id_vet, prestador=self.__get_prestador(request=request))
        veterinario.delete()
        return Response(status.HTTP_204_NO_CONTENT)
