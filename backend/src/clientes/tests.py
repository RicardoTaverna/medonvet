from os import name
from re import M
from django.contrib.auth.models import User, Group
from .models import Cliente, Pet
from rest_framework import status
from rest_framework.test import APITestCase, APIClient, force_authenticate
from rest_framework.authtoken.models import Token

class PetTests(APITestCase):
    def setUp(self):
        Group.objects.create(name="cliente")
        User.objects.create(username="gnomo2",first_name="gnominho2",password="senhadognomo1234")
        Cliente.objects.create(cpf="00000",telefone="4444",cad_unico="0000",user_id=1)

    def test_create_pet(self):
        """
        Ensure we can create a new account object.
        """
        user = User.objects.get(username='gnomo2')
        client = APIClient()
        client.force_authenticate(user=user)

        url = '/clientes/pet/'
        data = {
	            'nome':'Muska',
	            'peso':4.00,
	            'raca':'Shitzu',
	            'idade_anos':1,
	            'idade_meses':12,
	            'sexo':'Macho'
        }
        response = client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pet.objects.count(), 1)
        self.assertEqual(Pet.objects.get().nome, 'Muska')




class PetAuthTests(APITestCase):
    def test_create_pet_no_auth(self):
        """
        Ensure we can create a new account object.
        """

        url = '/clientes/pet/'
        data = {
	            'nome':'Muska2',
	            'peso':4.00,
	            'raca':'Shitzu',
                'tipo':'cachorro',
	            'idade_anos':1,
	            'idade_meses':12,
	            'sexo':'Macho'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



