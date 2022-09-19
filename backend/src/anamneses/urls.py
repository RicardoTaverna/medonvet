from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import AnamnesesList

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', AnamnesesList.as_view()),

])