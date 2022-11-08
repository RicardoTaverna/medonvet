from rest_framework import serializers

from .models import Anamneses


class AnamnesesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anamneses
        fields = '__all__'

    def create(self, validated_data):
        aplicacao = validated_data.pop('aplicacao')
        agendamento = validated_data.pop('agendamento')

        anamneses  = Anamneses.objects.create(aplicacao=aplicacao,agendamento=agendamento, **validated_data)
        return anamneses
