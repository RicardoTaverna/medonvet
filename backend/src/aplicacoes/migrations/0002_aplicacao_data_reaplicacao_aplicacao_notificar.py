# Generated by Django 4.1 on 2022-08-31 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aplicacoes", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="aplicacao",
            name="data_reaplicacao",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name="aplicacao",
            name="notificar",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
