from django.contrib.auth.models import Group, User
from django.core.mail import send_mail
from django.http import Http404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
class SendResetPasswordMail(APIView):
    """Classe para controlar logout dos usuários."""
    def post(self, request, format=None):

        # Send Email
        send_mail(
            'Subject - Django Email Testing', 
            'Hello Ricardo' + ',\n' 'Teste de envio de email', 
            'medonvet.contato@protonmail.com',
            ['taverna.ricardo@gmail.com'],
            fail_silently=False,
        ) 
        
        return Response(request.data)