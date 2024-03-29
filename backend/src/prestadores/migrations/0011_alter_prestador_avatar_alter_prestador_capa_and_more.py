# Generated by Django 4.1 on 2022-09-14 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("prestadores", "0010_remove_veterinario_prestador_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="prestador",
            name="avatar",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="prestador",
            name="capa",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="veterinario",
            name="avatar",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="veterinario",
            name="capa",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
