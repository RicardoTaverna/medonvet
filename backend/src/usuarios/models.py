from django.db import models
from django.contrib.auth.models import User
from django.forms import model_to_dict

# Create your models here.
class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cpf = models.CharField(max_length=11, blank=True, null=True)
    telefone = models.CharField(max_length=11, blank=True, null=True)
    data_nascimento = models.DateField(blank=True, null=True)
    cad_unico = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self) -> str:
        return self.user.username


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
        return self.user.username + " " + self.cidade