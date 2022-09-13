from dataclasses import field, fields
from rest_framework import serializers

from .models import Aplicacao


class AplicacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aplicacao
        fields = '__all__'

    def create(self, validated_data):
        pet = validated_data.pop('pet')
        aplicacao  = Aplicacao.objects.create(pet=pet, **validated_data)
        return aplicacao