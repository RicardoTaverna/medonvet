from importlib.metadata import requires
from rest_framework import serializers


class ForgetPasswordSerializer(serializers.Serializer):
    """Serializador para enviar email quando esquecer a senha."""
    email = serializers.EmailField(required=True)