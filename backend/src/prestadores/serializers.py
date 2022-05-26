from rest_framework import serializers
from .models import Prestador
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
