from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Endereco(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cep = models.CharField(max_length=8, blank=True, null=True)
    estado = models.CharField(max_length=100, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    bairro = models.CharField(max_length=100, blank=True, null=True)
    rua = models.CharField(max_length=100, blank=True, null=True)
    numero = models.IntegerField(blank=True, null=True)
    completo = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self) -> str:
        return self.user.username
