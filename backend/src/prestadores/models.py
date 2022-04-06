from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Prestador(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    crmv = models.CharField(max_length=10, blank=True, null=True)
    avatar = models.CharField(max_length=100, blank=True, null=True)
    descricao = models.CharField(max_length=255, blank=True, null=True)
    capa = models.CharField(max_length=255, blank=True, null=True)
    cpf_cnpj = models.CharField(max_length=14, blank=True, null=True)
    inicioAtendimento = models.TimeField(blank=True, null=True)
    fimAtendimento = models.TimeField(blank=True, null=True)


