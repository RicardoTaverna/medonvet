from dataclasses import fields
from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Cliente
from .models import Pet


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
    
    def create(self, validated_data):
        user = validated_data.pop('user')
        cliente = Cliente.objects.create(user=user, **validated_data)
        return cliente


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'
    
    def create(self, validated_data):
        cliente = validated_data.pop('cliente')
        pet = Pet.objects.create(cliente=cliente, **validated_data)
        return pet
