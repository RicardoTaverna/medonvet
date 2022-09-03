from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import HorarioFuncionamento, Agendamento
from .serializers import HorarioFuncionamentoSerializer, AgendamentoSerializer
from prestadores.models import Veterinario
from clientes.models import Cliente

# Create your views here.

class HorarioAtendimentoList(APIView):
    """Class based function para controlar get e post do objeto Horario de atendimento."""
    def get(self, request, format=None):
        horario = HorarioFuncionamento.objects.all()
        serializer = HorarioFuncionamentoSerializer(horario, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = HorarioFuncionamentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HorarioAtendimentoDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto Horario de atendimento."""
    permission_classes = [IsAuthenticated]
    
    def __get_horario_funcionamento(self, id):
        try:
            return HorarioFuncionamento.objects.get(id=id)
        except HorarioFuncionamento.DoesNotExist:
            raise Http404
    
    def get(self, request, id_horario, format=None):
        horario = self.__get_horario_funcionamento(id=id_horario)
        serializer = HorarioFuncionamentoSerializer(horario)
        return Response(serializer.data)

    def put(self, request, id_horario, format=None):
        horario = self.__get_horario_funcionamento(id=id_horario)
        print(horario)
        serializer = HorarioFuncionamentoSerializer(horario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id_horario, format=None):
        horario = self.__get_horario_funcionamento(id=id_horario)
        horario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class HorarioByVetDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto Aplicacao."""
    permission_classes = [IsAuthenticated]
    
    def __get_atendimento_by_vet(self, request):
        try:
            veterinario = Veterinario.objects.get(user=request.user.id)
            return HorarioFuncionamento.objects.get(veterinario=veterinario)
        except HorarioFuncionamento.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        horario = self.__get_atendimento_by_vet(request=request)
        serializer = HorarioFuncionamentoSerializer(horario)
        return Response(serializer.data)


class AgendamentoList(APIView):
    """Class based function para controlar get e post do objeto Agendamento."""
    def get(self, request, format=None):
        agendamento = Agendamento.objects.all()
        serializer = AgendamentoSerializer(agendamento, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AgendamentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AgendamentoDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto Agendamento."""
    permission_classes = [IsAuthenticated]
    
    def __get_agendamento(self, id):
        try:
            return Agendamento.objects.get(id=id)
        except Agendamento.DoesNotExist:
            raise Http404
    
    def get(self, request, id_agendamento, format=None):
        agendamento = self.__get_agendamento(id=id_agendamento)
        serializer = AgendamentoSerializer(agendamento)
        return Response(serializer.data)

    def put(self, request, id_agendamento, format=None):
        agendamento = self.__get_agendamento(id=id_agendamento)
        serializer = AgendamentoSerializer(agendamento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id_agendamento, format=None):
        agendamento = self.__get_agendamento(id=id_agendamento)
        agendamento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AgendamentoByVetDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto agendamento."""
    permission_classes = [IsAuthenticated]
    
    def __get_atendimento_by_vet(self, request):
        try:
            veterinario = Veterinario.objects.get(user=request.user.id)
            funcionamento = HorarioFuncionamento.objects.get(veterinario=veterinario)
            return Agendamento.objects.filter(funcionamento=funcionamento)
        except Agendamento.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        Agendamento = self.__get_atendimento_by_vet(request=request)
        serializer = AgendamentoSerializer(Agendamento, many=True   )
        return Response(serializer.data)


class AgendamentoByClienteDetail(APIView):
    """Class based function para retornar, alterar e deletar um objeto agendamento."""
    permission_classes = [IsAuthenticated]
    
    def __get_atendimento_by_cliente(self, request):
        try:
            cliente = Cliente.objects.get(user=request.user.id)
            return Agendamento.objects.filter(cliente=cliente)
        except Agendamento.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        Agendamento = self.__get_atendimento_by_cliente(request=request)
        serializer = AgendamentoSerializer(Agendamento, many=True)
        return Response(serializer.data)