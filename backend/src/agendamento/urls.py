from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    HorarioAtendimentoList,
    HorarioAtendimentoDetail,
    HorarioByVetDetail,
    AgendamentoList,
    AgendamentoDetail,
    AgendamentoByVetDetail,
    AgendamentoByClienteDetail,
)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = format_suffix_patterns([
    path('', AgendamentoList.as_view()),
    path('<int:id_agendamento>/', AgendamentoDetail.as_view()),
    path('veterinario/', AgendamentoByVetDetail.as_view()),
    path('cliente/', AgendamentoByClienteDetail.as_view()),
    path('horarioatendimento/', HorarioAtendimentoList.as_view()),
    path('horarioatendimento/veterinario/', HorarioByVetDetail.as_view()),
    path('horarioatendimento/<int:id_horario>/', HorarioAtendimentoDetail.as_view()),
])