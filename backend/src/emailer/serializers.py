from importlib.metadata import requires
from rest_framework import serializers


class ForgetPasswordSerializer(serializers.Serializer):
    """Serializador para enviar email quando esquecer a senha."""
    email = serializers.EmailField(required=True)


class ApointmentSerializer(serializers.Serializer):
    """Serializador para envio de email quando realizado agendamento."""
    pet = serializers.CharField(required=True)
    veterinario = serializers.CharField(required=True)
    data = serializers.CharField(required=True)
    horario = serializers.CharField(required=True)
