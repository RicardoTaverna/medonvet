from dataclasses import fields
from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Prestador


class PrestadorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prestador
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data.pop('user')
        prestador = Prestador.objects.create(user=user, **validated_data)
        return prestador
