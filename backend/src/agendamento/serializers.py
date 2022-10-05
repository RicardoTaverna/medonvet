from dataclasses import fields
from rest_framework import serializers


from .models import HorarioFuncionamento, Agendamento
from prestadores.serializers import VeterinarioSerializer
from servicos.serializers import ServicoSerializer
from clientes.serializers import ClienteNestedSerializer, PetSerializer

class HorarioFuncionamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioFuncionamento
        fields = '__all__'
    

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'


class AgendamentoNestedSerializer(serializers.ModelSerializer):
    veterinario = VeterinarioSerializer()
    servico = ServicoSerializer()
    cliente = ClienteNestedSerializer()
    pet = PetSerializer()
    class Meta:
        model = Agendamento
        fields = ['id','cliente', 'servico', 'veterinario', 'pet', 'data', 'horario_selecionado']
