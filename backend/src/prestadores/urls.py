from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PrestadorList, PrestadorDetail, VeterinarioList, VeterinarioDetail, VeterinarioFind


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', PrestadorList.as_view()),
    path('detalhe/', PrestadorDetail.as_view()),
    path('veterinario/', VeterinarioList.as_view()),
    path('veterinario/<int:id_vet>/', VeterinarioDetail.as_view()),
    path('veterinario/<str:cpf_cnpj>/', VeterinarioFind.as_view())
])