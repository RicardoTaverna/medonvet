from django.db import models

from prestadores.models import Veterinario
from clientes.models import Cliente

# Create your models here.


class HorarioFuncionamento(models.Model):
    veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)
    inicio = models.TimeField(blank=True, null=True)
    termino = models.TimeField(blank=True, null=True)
    intervalo = models.IntegerField(blank=True, null=True)
    domingo = models.BooleanField(default=True ,blank=True, null=True)
    segunda_feira = models.BooleanField(default=True ,blank=True, null=True)
    terca_feira = models.BooleanField(default=True ,blank=True, null=True)
    quarta_feira = models.BooleanField(default=True ,blank=True, null=True)
    quinta_feira = models.BooleanField(default=True ,blank=True, null=True)
    sexta_feira = models.BooleanField(default=True ,blank=True, null=True)
    sabado = models.BooleanField(default=True ,blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.veterinario.user.username} {self.id}"


class Agendamento(models.Model):
    funcionamento = models.ForeignKey(HorarioFuncionamento, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    data = models.DateField(blank=True, null=True)
    horario_selecionado = models.TimeField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.id} - Prestador:{self.funcionamento.veterinario.user.username} - Cliente:{self.cliente.user.first_name}"

