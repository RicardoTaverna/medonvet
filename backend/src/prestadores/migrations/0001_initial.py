# Generated by Django 4.0.3 on 2022-04-06 00:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Prestador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('crmv', models.CharField(blank=True, max_length=10, null=True)),
                ('avatar', models.CharField(blank=True, max_length=100, null=True)),
                ('descricao', models.CharField(blank=True, max_length=255, null=True)),
                ('capa', models.CharField(blank=True, max_length=255, null=True)),
                ('cpf_cnpj', models.CharField(blank=True, max_length=14, null=True)),
                ('inicioAtendimento', models.TimeField(blank=True, null=True)),
                ('fimAtendimento', models.TimeField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
