from dataclasses import fields
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Cliente, Endereco


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
    
    def create(self, validated_data):
        user = validated_data.pop('user')
        cliente = Cliente.objects.create(user=user, **validated_data)
        return cliente

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'cliente')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

        def create(self, validate_data):
            user = validate_data.pop('user')
            endereco = Endereco.objects.create(user=user, **validate_data)
            return endereco