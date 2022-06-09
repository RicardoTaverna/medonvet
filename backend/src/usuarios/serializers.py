from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Endereco

from prestadores.models import Prestador


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserPrestadorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Prestador
        fields = ('crmv', 'cpf_cnpj', 'user')

    def create(self, validated_data):
        user_payload = validated_data.pop('user')
        password = user_payload.pop('password')
        user = User(**user_payload)
        user.set_password(password)
        user.save()

        prestador = Prestador.objects.create(user=user, **validated_data)
        Endereco.objects.create(user=user)

        return prestador


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

        def create(self, validate_data):
            user = validate_data.pop('user')
            endereco = Endereco.objects.create(user=user, **validate_data)
            return endereco


class ForgetPasswordFormSerializer(serializers.Serializer):
    """Serializador para enviar email quando esquecer a senha."""
    password = serializers.CharField(required=True)
