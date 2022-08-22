from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import AplicacaoList, AplicacaoDetail, AplicacaoPetDetail


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', AplicacaoList.as_view()),
    path('<int:id_aplicacao>/', AplicacaoDetail.as_view()),
    path('pet/<int:id_pet>/', AplicacaoPetDetail.as_view())
])