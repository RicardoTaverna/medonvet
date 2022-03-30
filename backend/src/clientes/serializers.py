from dataclasses import fields
from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Cliente


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
    
    def create(self, validated_data):
        user = validated_data.pop('user')
        cliente = Cliente.objects.create(user=user, **validated_data)
        return cliente