from django.db import models

from clientes.models import Pet


# Create your models here.
class Aplicacao(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=100, blank=True, null=True)
    nome_medicamento = models.CharField(max_length=100, blank=True, null=True)
    data_aplicacao = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.pet.nome} - {self.nome_medicamento} - {self.data_aplicacao}"
