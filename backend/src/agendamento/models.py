from django.db import models

from prestadores.models import Veterinario
from clientes.models import Cliente
from servicos.models import Servico

# Create your models here.


class HorarioFuncionamento(models.Model):
    veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)
    inicio = models.IntegerField(blank=True, null=True)
    termino = models.IntegerField(blank=True, null=True)
    intervalo = models.IntegerField(blank=True, null=True)
    dia_0 = models.BooleanField(default=True ,blank=True, null=True)
    dia_1 = models.BooleanField(default=True ,blank=True, null=True)
    dia_2 = models.BooleanField(default=True ,blank=True, null=True)
    dia_3 = models.BooleanField(default=True ,blank=True, null=True)
    dia_4 = models.BooleanField(default=True ,blank=True, null=True)
    dia_5 = models.BooleanField(default=True ,blank=True, null=True)
    dia_6 = models.BooleanField(default=True ,blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.veterinario.user.username} {self.id}"


class Agendamento(models.Model):
    funcionamento = models.ForeignKey(HorarioFuncionamento, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    data = models.DateField(blank=True, null=True)
    horario_selecionado = models.TimeField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.id} - Prestador:{self.funcionamento.veterinario.user.username} - Cliente:{self.cliente.user.first_name}"

