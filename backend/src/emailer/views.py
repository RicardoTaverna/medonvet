import secrets, hashlib

from uuid import uuid4

from django.contrib.auth.models import Group, User
from django.core.mail import send_mail
from django.http import Http404
from django.template.loader import render_to_string

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ForgetPasswordSerializer

from usuarios.models import ResetPassword


# Create your views here.


class ForgetPasswordSendMail(APIView):
    """Classe para enviar emails quando o ususário esquecer a senha."""
    def __get_user(self, email):
        try:
            return User.objects.get(email=email)
        
        except User.DoesNotExist:
            raise Http404
    
    def __create_token(self, user):
        salt = secrets.token_hex(8) + user.username
        return hashlib.sha256(salt.encode('utf-8')).hexdigest()

    def post(self, request, format=None):
        """Método para envio do email."""
        serializer = ForgetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            user = self.__get_user(email=email)
            token = self.__create_token(user=user)
            ResetPassword.objects.create(user=user, token=token)

            send_mail(
                subject='Reset de Senha MedOnVet',
                message=None,
                from_email='medonvet.contato@protonmail.com',
                recipient_list=[email],
                fail_silently=False,
                html_message=render_to_string('reset_password.html')
            ) 

            context = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': f'Email enviado com sucesso para {email}'
            }

            return Response(context)

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