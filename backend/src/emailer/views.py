import pika, json, hashlib, secrets

from uuid import uuid4

from django.contrib.auth.models import Group, User
from django.core.mail import send_mail
from django.http import Http404
from django.template.loader import render_to_string

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ForgetPasswordSerializer, ApointmentSerializer

from usuarios.models import ResetPassword
from prestadores.models import Veterinario


# Create your views here.


class ForgetPasswordSendMail(APIView):
    """Classe para enviar emails quando o ususário esquecer a senha."""
    def __get_user(self, email: str):
        """Método privado para retornar um usuário passando um email.

        Args:
            email (str): email do usuário.

        Raises:
            Http404: se o usuário não existir.

        Returns:
            User: retorna um usuário.
        """
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise Http404
    
    @staticmethod
    def create_token(user: User):
        """Método para criar um token único com os dados do usuário.

        Args:
            user (User): usuário

        Returns:
            str: token único
        """
        salt = secrets.token_hex(8) + user.username
        return hashlib.sha256(salt.encode('utf-8')).hexdigest()

    def post(self, request, format=None):
        serializer = ForgetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            user = self.__get_user(email=email)
            token = self.create_token(user=user)
            reset = ResetPassword.objects.create(user=user, token=token)
            reset.save()

            context = {
                "user": user.username,
                "token": token,
                "email": email,
                'reset_password': True
            }

            url = ('amqp://guest:guest@localhost')
            params = pika.URLParameters(url=url)
            params.socket_timeout = 5

            connection = pika.BlockingConnection(params)
            channel = connection.channel()
            channel.queue_declare(queue='mail')
            channel.basic_publish(
                exchange='',
                routing_key='mail',
                body=json.dumps(context)
            )
            connection.close()

            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': f'Mensagem adicionada a fila do Rabbitmq'
            }

            return Response(response)
    

class AgendamentoSendMail(APIView):
    def post(self, request, format=None):
        user = User.objects.get(id=request.user.id)
        serializer = ApointmentSerializer(data=request.data)
        if serializer.is_valid():
            veterinario = Veterinario.objects.get(id=serializer.data.get('veterinario'))
            user_vet = User.objects.get(username=veterinario.user)

            context = {
                "user": user.first_name,
                "pet": serializer.data.get('pet'),
                "email": user.email,
                'reset_password': False,
                'data': serializer.data.get('data'),
                'horario': serializer.data.get('horario'),
                'veterinario': f'{user_vet.first_name} {user_vet.last_name}'
            }

            url = ('amqp://guest:guest@localhost')
            params = pika.URLParameters(url=url)
            params.socket_timeout = 5

            connection = pika.BlockingConnection(params)
            channel = connection.channel()
            channel.queue_declare(queue='mail')
            channel.basic_publish(
                exchange='',
                routing_key='mail',
                body=json.dumps(context)
            )
            connection.close()

            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': f'Mensagem adicionada a fila do Rabbitmq'
            }

            return Response(response)
