from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserList, UserDetail, EnderecoList, EnderecoDetail


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('cliente/', UserList.as_view()),
    path('cliente/<int:pk>/', UserDetail.as_view()),
    path('endereco/', EnderecoList.as_view()),
    path('endereco/<int:pk>', EnderecoDetail.as_view()),
])
