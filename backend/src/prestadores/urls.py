from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    PrestadorList,
    PrestadorDetail,
    VeterinarioList,
    VeterinarioDetail,
    VeterinarioFind,
    PrestadorVeterianrioList,
    PrestadorByIdDetail,
    VeterinarioByIdDetail, 
    AllPrestadores
)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', PrestadorList.as_view()),
    path('all/', AllPrestadores.as_view()),
    path('detalhe/', PrestadorDetail.as_view()),
    path('detalhe/<int:id_prestador>/', PrestadorByIdDetail.as_view()),
    path('veterinarios/', VeterinarioList.as_view()),
    path('veterinario/', VeterinarioDetail.as_view()),
    path('veterinario/detalhe/<int:id_veterinario>/', VeterinarioByIdDetail.as_view()),
    path('veterinario/<str:cpf_cnpj>/', VeterinarioFind.as_view()),
    path('prestadorveterinario/', PrestadorVeterianrioList.as_view()),
    path('prestadorveterinario/<int:id_vet>/', PrestadorVeterianrioList.as_view()),
])