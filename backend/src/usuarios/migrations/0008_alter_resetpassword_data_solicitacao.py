# Generated by Django 4.0.3 on 2022-04-07 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0007_alter_resetpassword_data_solicitacao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resetpassword',
            name='data_solicitacao',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
