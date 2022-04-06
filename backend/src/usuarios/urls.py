from django.urls import include, path
from rest_framework.authtoken import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserClienteList, UserClienteDetail, UserPrestadorList, UserPrestadorDetail, EnderecoList, EnderecoDetail, LogoutView


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('clientes/', UserClienteList.as_view()),
    path('cliente/', UserClienteDetail.as_view()),
    path('prestadores/', UserPrestadorList.as_view()),
    path('prestador/', UserPrestadorDetail.as_view()),
    path('endereco/', EnderecoList.as_view()),
    path('endereco/<int:pk>', EnderecoDetail.as_view()),
    path('login/', views.obtain_auth_token),
    path('logout/', LogoutView.as_view()),
])
