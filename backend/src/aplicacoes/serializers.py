from dataclasses import field, fields
from rest_framework import serializers

from .models import Aplicacao


class AplicacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aplicacao
        fields = '__all__'

    def create(self, validated_data):
        print("antes")
        pet = validated_data.pop('pet')
        print("antes 2")
        anamneses = validated_data.pop('anamneses')
        print("depois")
        aplicacao  = Aplicacao.objects.create(pet=pet,anamneses=anamneses, **validated_data)
        print("fudeu")
        return aplicacao