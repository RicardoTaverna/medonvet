# Generated by Django 4.0.3 on 2022-03-31 19:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_pet'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='idCliente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente'),
        ),
    ]
