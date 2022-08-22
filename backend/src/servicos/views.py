from django.shortcuts import render
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import ServicoSerializer

from .models import Servico,Prestador

# Create your views here.


class ServicoList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request, format=None):
        servico = Servico.objects.all()
        serializer = ServicoSerializer(servico, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        request.data["prestador"] = prestador.id
        serializer = ServicoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServicoDetail(APIView):

    permission_classes = [IsAuthenticated]
    
    def __get_servico(self, request, id_servico):
        try:
            prestador = Prestador.objects.get(user=request.user.id)
            servico = Servico.objects.get(prestador=prestador.id, id=id_servico)
            return servico
        except Servico.DoesNotExist:
            raise Http404
    
    def get(self, request, id_servico, format=None):
        servico = self.__get_servico(request, id_servico)
        serializer = ServicoSerializer(servico)
        return Response(serializer.data)

    def put(self, request,id_servico, format=None):
        servico = self.__get_servico(request, id_servico)
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        request.data["prestador"] = prestador.id
        serializer = ServicoSerializer(servico, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request,id_servico,format=None):
        servico = self.__get_servico(request, id_servico)
        servico.delete()
        return Response(status.HTTP_204_NO_CONTENT)


class ServicoPrestadorDetail(APIView):

    permission_classes = [IsAuthenticated]
    
    def __get_servico(self, request):
        try:
            prestador = Prestador.objects.get(user=request.user.id)
            servico = Servico.objects.filter(prestador=prestador.id)
            return servico
        except Servico.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        servico = self.__get_servico(request)
        serializer = ServicoSerializer(servico, many=True)
        return Response(serializer.data)