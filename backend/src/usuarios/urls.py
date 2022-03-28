from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserList, UserDetail, CLienteList, EnderecoList


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', UserList.as_view()),
    path('<int:pk>/', UserDetail.as_view()),
    path('cliente/', CLienteList.as_view()),
    path('endereco/', EnderecoList.as_view()),
])