from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cpf = models.CharField(max_length=11, blank=True, null=True)
    telefone = models.CharField(max_length=11, blank=True, null=True)
    data_nascimento = models.DateField(blank=True, null=True)
    cad_unico = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self) -> str:
        return self.user.username


class Pet(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100, blank=True, null=True)
    peso = models.FloatField(blank=True, null=True)
    raca = models.CharField(max_length=32, blank=True, null=True)
    idade_anos = models.IntegerField(blank=True, null=True)
    idade_meses = models.IntegerField(blank=True, null=True)
    sexo = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self) -> str:
        return self.nome + " " + str(self.cliente.id)