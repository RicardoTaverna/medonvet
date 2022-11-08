from django.db import models

from agendamento.models import Agendamento;

# Create your models here.
class Anamneses(models.Model):
    agendamento = models.ForeignKey(Agendamento, on_delete=models.CASCADE)
    queixa_principal = models.CharField(max_length=1000, blank=True, null=True)
    frequencia_cardiaca = models.CharField(max_length=100, blank=True, null=True)
    frequencia_respiratoria = models.CharField(max_length=100, blank=True, null=True)
    linfonodo = models.CharField(max_length=100, blank=True, null=True)
    cor_mucosa = models.CharField(max_length=100, blank=True, null=True)
    tpc = models.CharField(max_length=100, blank=True, null=True)
    hidratacao = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.agendamento.pet.nome} "
