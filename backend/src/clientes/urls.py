from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ClienteList, ClienteDetail


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('cliente/', ClienteList.as_view()),
    path('cliente/<int:pk>/', ClienteDetail.as_view()),
])