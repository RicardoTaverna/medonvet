from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ClienteList, ClienteDetail, PetList, PetDetail


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', ClienteList.as_view()),
    path('detalhe/', ClienteDetail.as_view()),
    path('pet/', PetList.as_view()),
    path('pet/<int:idPets>',PetDetail.as_view()),
])