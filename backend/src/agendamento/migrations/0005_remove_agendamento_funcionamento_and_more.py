# Generated by Django 4.1 on 2022-09-07 10:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("prestadores", "0010_remove_veterinario_prestador_and_more"),
        ("servicos", "0002_servico_veterinario_alter_servico_prestador"),
        ("agendamento", "0004_agendamento_servico"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="agendamento",
            name="funcionamento",
        ),
        migrations.AddField(
            model_name="agendamento",
            name="veterinario",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="prestadores.veterinario",
            ),
        ),
        migrations.AlterField(
            model_name="agendamento",
            name="servico",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="servicos.servico"
            ),
        ),
    ]
