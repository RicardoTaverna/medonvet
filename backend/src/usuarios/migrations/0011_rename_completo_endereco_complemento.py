# Generated by Django 4.1 on 2022-08-29 05:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0010_alter_endereco_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='endereco',
            old_name='completo',
            new_name='complemento',
        ),
    ]
