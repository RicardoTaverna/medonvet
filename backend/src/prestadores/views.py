import collections
from itertools import chain
from django.contrib.auth.models import Group, User
from django.http import Http404
from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Prestador, Veterinario, PrestadorVeterinario
from .serializers import PrestadorSerializer, PrestadorNestedSerializer, VeterinarioFindSerializer, VeterinarioSerializer, VeterinarioUpdateSerializer, PrestadorVeterinarioSerializer

# Create your views here.
class PrestadorList(APIView):

    def get(self,request, format=None):
        prestador = Prestador.objects.all()
        serializer = PrestadorSerializer(prestador, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PrestadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrestadorDetail(APIView):

    permission_classes = [IsAuthenticated]
    
    def __get_prestador(self, request):
        try:
            return Prestador.objects.get(user=request.user.id)
        except Prestador.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        prestador = self.__get_prestador(request)
        serializer = PrestadorNestedSerializer(prestador)
        return Response(serializer.data)

    def put(self, request, format=None):
        prestador = self.__get_prestador(request)
        request.data['user'] = request.user.id
        serializer = PrestadorSerializer(prestador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request,format=None):
        prestador = self.__get_prestador(request)
        prestador.delete()
        return Response(status.HTTP_204_NO_CONTENT)

class PrestadorByIdDetail(APIView):
    permission_classes = [IsAuthenticated]
    
    def __get_prestador(self, id_prestador):
        try:
            return Prestador.objects.get(id=id_prestador)
        except Prestador.DoesNotExist:
            raise Http404
    
    def get(self, request, id_prestador, format=None):
        prestador = self.__get_prestador(id_prestador=id_prestador)
        serializer = PrestadorNestedSerializer(prestador)
        return Response(serializer.data)

class VeterinarioList(APIView):

    permission_classes = [IsAuthenticated]

    def __get_veterinarios_id(self, prestador):
        queryset = PrestadorVeterinario.objects.filter(prestador=prestador)
        return [v.veterinario.id for v in queryset]

    def get(self,request, format=None):
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        veterinarios_ids = self.__get_veterinarios_id(prestador=prestador)
        veterinario = Veterinario.objects.filter(id__in=veterinarios_ids)
        serializer = VeterinarioSerializer(veterinario, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        request.data['prestador'] = prestador.id
        serializer = VeterinarioSerializer(data=request.data)
        if serializer.is_valid():
            veterinario =serializer.save()
            user = veterinario.user.id
            grupo=Group.objects.get(name=request.data['groupname'])
            grupo.user_set.add(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VeterinarioDetail(APIView):

    permission_classes = [IsAuthenticated]
    
    def __get_veterinario(self, request):
        try:
            user = request.user
            veterinario = Veterinario.objects.get(user=user.id)
            return veterinario
        except Veterinario.DoesNotExist:
            raise Http404
    
    def get(self, request, format=None):
        veterinario = self.__get_veterinario(request)
        serializer = VeterinarioSerializer(veterinario)
        return Response(serializer.data)

    def put(self, request, format=None):
            veterinario = self.__get_veterinario(request)
            print(request.data)
            request.data['user'] = request.user.id
            serializer = VeterinarioUpdateSerializer(veterinario, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id_vet, format=None):
        veterinario = self.__get_veterinario(id_vet=id_vet, prestador=self.__get_prestador(request=request))
        veterinario.delete()
        return Response(status.HTTP_204_NO_CONTENT)


class VeterinarioByIdDetail(APIView):

    permission_classes = [IsAuthenticated]
    
    def __get_veterinario(self, id_veterinario):
        try:
            veterinario = Veterinario.objects.get(id=id_veterinario)
            return veterinario
        except Veterinario.DoesNotExist:
            raise Http404
    
    def get(self, request, id_veterinario, format=None):
        veterinario = self.__get_veterinario(id_veterinario=id_veterinario)
        serializer = VeterinarioSerializer(veterinario)
        return Response(serializer.data)

class VeterinarioFind(APIView):
    permission_classes = [IsAuthenticated]

    def __get_veterinario(self, cpf_cnpj):
        if Veterinario.objects.filter(cpf_cnpj=cpf_cnpj):
            return Veterinario.objects.get(cpf_cnpj=cpf_cnpj)
        return 0

    def get(self, request, cpf_cnpj, format=None):
        veterinario = self.__get_veterinario(cpf_cnpj=cpf_cnpj)
        if veterinario:
            serializer = VeterinarioFindSerializer(veterinario)
            return Response(serializer.data)
        return Response({})

class PrestadorVeterianrioList(APIView):
    permission_classes = [IsAuthenticated]

    def __get_prestador(self, request):
        user = request.user
        prestador = Prestador.objects.get(user=user.id)
        return prestador.id

    def get(self,request, format=None):
        prestador_veterinario = PrestadorVeterinario.objects.all()
        serializer = PrestadorVeterinarioSerializer(prestador_veterinario, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PrestadorVeterinarioSerializer(data=request.data)
        prestador = self.__get_prestador(request=request)
        request.data['prestador'] = prestador
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id_vet, format=None):
        prestador = self.__get_prestador(request=request)
        prestador_veterinario = PrestadorVeterinario.objects.get(veterinario=id_vet, prestador=prestador)
        prestador_veterinario.delete()
        return Response(status.HTTP_204_NO_CONTENT)


class AllPrestadores(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        prestador_list = Prestador.objects.all()
        veterinario_list = Veterinario.objects.all()
        all_list = list(chain(prestador_list, veterinario_list))
        serializer = PrestadorSerializer(all_list, many=True)
        new_serializer_data = []
        for dictionary in serializer.data:
            user = User.objects.get(id=dictionary.get('user'))
            grupo = user.groups.values_list('name',flat = True).first()
            new_item = ('grupo', grupo)
            items = list(dictionary.items())
            items.append(new_item)
            items.append(('first_name', user.first_name))
            items.append(('last_name', user.last_name))
            dictionary = collections.OrderedDict(items)
            new_serializer_data.append(dictionary)
        
        return Response(new_serializer_data)
