# Generated by Django 4.0.3 on 2022-06-08 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prestadores', '0004_veterinario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prestador',
            name='cpf_cnpj',
            field=models.CharField(blank=True, max_length=18, null=True),
        ),
    ]