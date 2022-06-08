from django.contrib import admin
from .models import Prestador, Veterinario

# Register your models here.
admin.site.register(Prestador)
admin.site.register(Veterinario)