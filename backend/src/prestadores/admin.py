from django.contrib import admin
from .models import Prestador, Veterinario, PrestadorVeterinario

# Register your models here.
admin.site.register(Prestador)
admin.site.register(Veterinario)
admin.site.register(PrestadorVeterinario)