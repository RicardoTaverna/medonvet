from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ServicoDetail, ServicoList

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', ServicoList.as_view()),
    path('servico/<int:id_servico>/', ServicoDetail.as_view()),


])