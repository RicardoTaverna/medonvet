# Generated by Django 4.1 on 2022-09-14 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clientes", "0007_pet_tipo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pet",
            name="imagem",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
