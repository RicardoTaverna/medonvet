from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Prestador, Veterinario
from usuarios.serializers import UserSerializer

class PrestadorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prestador
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data.pop('user')
        prestador = Prestador.objects.create(user=user, **validated_data)
        return prestador

class PrestadorNestedSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Prestador
        fields = ['user', 'crmv', 'avatar', 'descricao', 'capa', 'cpf_cnpj', 'inicioAtendimento', 'fimAtendimento']


class VeterinarioSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Veterinario
        fields = ['id', 'user', 'prestador','crmv', 'avatar', 'descricao', 'capa', 'cpf_cnpj', 'inicioAtendimento', 'fimAtendimento']

    def create(self, validated_data):
        user_payload = validated_data.pop('user')
        password = user_payload.pop('password')
        user = User(**user_payload)
        user.set_password(password)
        user.save()

        veterinario = Veterinario.objects.create(user=user, **validated_data)

        return veterinario


class VeterinarioUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veterinario
        fields = '__all__'

        def create(self, validated_data):
            user = validated_data.pop('user')
            veterinario = Veterinario.objects.create(user=user, **validated_data)
            return veterinario