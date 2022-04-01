from django.contrib.auth.models import Group, User
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Cliente
from .models import Pet
from .serializers import ClienteSerializer
from .serializers import PetSerializer

# Create your views here.
class ClienteList(APIView):
    """Class based function para controlar get e post do objeto Cliente."""
    def get(self, request, format=None):
        cliente = Cliente.objects.all()
        serializer = ClienteSerializer(cliente, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClienteDetail(APIView):
    """Class based function para retornar, alterar e deletar u objeto Cliente."""
    def _get_cliente(self, pk):
        try:
            return Cliente.objects.get(pk=pk)
        except Cliente.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        cliente = self._get_cliente(pk=pk)
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cliente = self._get_cliente(pk=pk)
        serializer = ClienteSerializer(cliente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        cliente = self._get_cliente(pk=pk)
        cliente.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PetList(APIView):
    "Função para controlar o get e  post dos Pets"
    def get(self, request, format=None):
        pet = Pet.objects.all()
        serializer = PetSerializer(pet, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)


class PetDetail(APIView):

    def _get_pet(self,idPets):
        try:
            return Pet.objects.get(idPets=idPets)
        except Pet.DoesNotExist:
            raise Http404

    def get(self, request, idPets, format=None):      
        pet = Pet.objects.get(idPets=idPets)
        serializer = PetSerializer(pet)
        return Response(serializer.data)

    def put(self, request, idPets, format=None):
        pet = self._get_pet(idPets=idPets)
        serializer = PetSerializer(pet,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, idPets, format=None):
        pet = self._get_pet(idPets=idPets)
        pet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

