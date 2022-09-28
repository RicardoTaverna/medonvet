from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Anamneses
from .serializers import AnamnesesSerializer

# Create your views here.
class AnamnesesList(APIView):
    """Class based function para controlar get e post do objeto Aplicacao."""
    def get(self, request, format=None):
        anamneses = Anamneses.objects.all()
        serializer = AnamnesesSerializer(anamneses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AnamnesesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnamnesesDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto Aplicacao."""
    permission_classes = [IsAuthenticated]
    
    def __get_anamneses(self, agendamento):
        try:
            return Anamneses.objects.get(agendamento=agendamento)
        except Anamneses.DoesNotExist:
            raise Http404
    
    def get(self, request,agendamento, format=None):
        
        print(agendamento)
        anamneses = self.__get_anamneses(agendamento=agendamento)
        serializer = AnamnesesSerializer(anamneses)
        return Response(serializer.data)

    def put(self, request, format=None):

        agendamento = request.data['agendamento']
        print(agendamento)
        print(aplicacao)
        anamneses = self.__get_anamneses(agendamento=agendamento)
        
        serializer = AnamnesesSerializer(anamneses, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id_anamneses, format=None):
        anamneses = self.__get_anamneses(id=id_anamneses)
        anamneses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)