# Generated by Django 4.1 on 2022-09-26 22:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("agendamento", "0007_alter_agendamento_horario_selecionado"),
        ("aplicacoes", "0002_aplicacao_data_reaplicacao_aplicacao_notificar"),
    ]

    operations = [
        migrations.AddField(
            model_name="aplicacao",
            name="agendamento",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="agendamento.agendamento",
            ),
        ),
    ]