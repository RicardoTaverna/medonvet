# Generated by Django 4.1 on 2022-08-22 19:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('prestadores', '0010_remove_veterinario_prestador_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Servico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(blank=True, max_length=100, null=True)),
                ('descricao', models.CharField(blank=True, max_length=255, null=True)),
                ('valor', models.FloatField(blank=True, null=True)),
                ('status_servico', models.IntegerField(blank=True, null=True)),
                ('prestador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prestadores.prestador')),
            ],
        ),
    ]