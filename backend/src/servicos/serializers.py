from rest_framework import serializers

from .models import Servico



class ServicoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Servico
        fields = '__all__'

    def create(self, validated_data):
        prestador = validated_data.pop('prestador')
        servico = Servico.objects.create(prestador=prestador, **validated_data)
        return servico