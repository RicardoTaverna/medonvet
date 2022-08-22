from django.db import models
from prestadores.models import Prestador

# Create your models here.


class Servico(models.Model):
    prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100, blank=True, null=True)
    descricao = models.CharField(max_length=255, blank=True, null=True)
    valor = models.FloatField(blank=True, null=True)
    status_servico = models.IntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return self.nome