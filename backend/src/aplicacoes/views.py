from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from anamneses.models import Anamneses
from clientes.models import Pet


from .models import Aplicacao
from .serializers import AplicacaoSerializer

# Create your views here.


class AplicacaoList(APIView):
    """Class based function para controlar get e post do objeto Aplicacao."""
    def get(self, request, format=None):
        aplicacao = Aplicacao.objects.all()
        serializer = AplicacaoSerializer(aplicacao, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AplicacaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AplicacaoDetailByAnamnese(APIView):
    """Class based function para retornar, alterar e deletar um objeto Aplicacao."""
    permission_classes = [IsAuthenticated]
    
    def __get_aplicacao(self, anamneses):
        try:
            return Aplicacao.objects.filter(anamneses=anamneses)
        except Aplicacao.DoesNotExist:
            raise Http404
    
    def get(self, request, anamneses, format=None):
        aplicacao = self.__get_aplicacao(anamneses=anamneses)
        serializer = AplicacaoSerializer(aplicacao, many=True)
        return Response(serializer.data)


class AplicacaoPetDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto Aplicacao para um determinado pet."""
    permission_classes = [IsAuthenticated]

    def __get_aplicacao_pet(self, id_pet):
        try:
            return Aplicacao.objects.filter(pet=id_pet)
        except Aplicacao.DoesNotExist:
            raise Http404

    def get(self, request, id_pet, format=None):
        aplicacao = self.__get_aplicacao_pet(id_pet=id_pet)
        serializer = AplicacaoSerializer(aplicacao, many=True)
        return Response(serializer.data)


class AplicacaoDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto Aplicacao."""
    permission_classes = [IsAuthenticated]
    
    def __get_aplicacao(self, id):
        try:
            return Aplicacao.objects.get(id=id)
        except Aplicacao.DoesNotExist:
            raise Http404
    
    def get(self, request, anamneses, format=None):
        aplicacao = self.__get_aplicacao(anamneses=anamneses)
        serializer = AplicacaoSerializer(aplicacao, many=True)
        return Response(serializer.data)

    def put(self, request,id_aplicacao, format=None,queryset=None):
        aplicacao = self.__get_aplicacao(id=id_aplicacao)
        print(request.data)
        #request.data['pet'] = aplicacao.pet.id
        serializer = AplicacaoSerializer(aplicacao, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id_aplicacao, format=None):
        aplicacao = self.__get_aplicacao(id=id_aplicacao)
        aplicacao.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
