from dataclasses import field, fields
from rest_framework import serializers

from .models import Aplicacao


class AplicacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aplicacao
        fields = '__all__'
