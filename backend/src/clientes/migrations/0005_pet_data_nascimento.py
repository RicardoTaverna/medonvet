# Generated by Django 4.0.3 on 2022-04-21 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0004_rename_idcliente_pet_cliente'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='data_nascimento',
            field=models.DateField(blank=True, null=True),
        ),
    ]
