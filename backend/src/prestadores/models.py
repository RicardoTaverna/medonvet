from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Prestador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    crmv = models.CharField(max_length=10, blank=True, null=True)
    avatar = models.ImageField(upload_to="user_avatar", height_field=100, width_field=100, max_length=100, blank=True, null=True)
    descricao = models.CharField(max_length=255, blank=True, null=True)
    capa = models.ImageField(upload_to="user_background", height_field=1600, width_field=200, max_length=100, blank=True, null=True)
    cpf_cnpj = models.CharField(max_length=18, blank=True, null=True)
    inicioAtendimento = models.TimeField(blank=True, null=True)
    fimAtendimento = models.TimeField(blank=True, null=True)

    def __str__(self) -> str:
        return self.user.username

class Veterinario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    crmv = models.CharField(max_length=10, blank=True, null=True)
    avatar = models.CharField(max_length=100, blank=True, null=True)
    descricao = models.CharField(max_length=255, blank=True, null=True)
    capa = models.CharField(max_length=255, blank=True, null=True)
    cpf_cnpj = models.CharField(max_length=18, blank=True, null=True)
    inicioAtendimento = models.TimeField(blank=True, null=True)
    fimAtendimento = models.TimeField(blank=True, null=True)

    def __str__(self) -> str:
        return self.user.username