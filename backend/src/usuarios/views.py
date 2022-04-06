from django.contrib.auth.models import Group, User
from django.contrib.auth import logout
from django.http import Http404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Endereco
from .serializers import UserSerializer, EnderecoSerializer

from clientes.models import Cliente

# Create your views here.


class UserClienteList(APIView):
    """Class based function para controlar get e post do objeto Usuario."""
    def get(self, request, format=None):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            grupo=Group.objects.get(name=request.data['groupname'])
            grupo.user_set.add(user)
            Cliente.objects.create(user=user)
            Endereco.objects.create(user=user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserClienteDetail(APIView):
    """Class based function para retornar, alterar e deletar u objeto Usuario."""
    def _get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        user = self._get_object(pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self._get_object(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        user = self._get_object(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EnderecoList(APIView):
    """Class based function para controlar get e post do objeto Endereco."""
    def get(self, request, format=None):
        endereco = Endereco.objects.all()
        serializer = EnderecoSerializer(endereco, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EnderecoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnderecoDetail(APIView):
    """Class based function para retornar, alterar e deletar u objeto Endereco."""
    def _get_endereco(self, pk):
        try:
            return Endereco.objects.get(pk=pk)
        except Endereco.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        endereco = self._get_endereco(pk=pk)
        serializer = EnderecoSerializer(endereco)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        endereco = self._get_endereco(pk=pk)
        serializer = EnderecoSerializer(endereco, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        endereco = self._get_endereco(pk=pk)
        endereco.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LogoutView(APIView):
    """Classe para controlar logout dos usuários."""
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        request.user.auth_token.delete()
        logout(request)
        return Response('User Logged out successfully')
