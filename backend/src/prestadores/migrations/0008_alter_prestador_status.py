# Generated by Django 4.0.3 on 2022-06-09 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prestadores', '0007_prestador_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prestador',
            name='status',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
