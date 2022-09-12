from django.db import models

from prestadores.models import Veterinario
from clientes.models import Cliente, Pet
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
    veterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=True)
    data = models.DateField(blank=True, null=True)
    horario_selecionado = models.CharField(max_length=20 ,blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.id} - Prestador:{self.veterinario.user.username} - Cliente:{self.cliente.user.first_name} - Data:{self.data}"

