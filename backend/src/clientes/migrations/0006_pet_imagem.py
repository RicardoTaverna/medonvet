# Generated by Django 4.0.3 on 2022-04-21 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0005_pet_data_nascimento'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='imagem',
            field=models.ImageField(blank=True, null=True, upload_to='pets'),
        ),
    ]
