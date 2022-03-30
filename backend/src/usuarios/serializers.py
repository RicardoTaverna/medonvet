from dataclasses import fields
from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Endereco


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')
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
