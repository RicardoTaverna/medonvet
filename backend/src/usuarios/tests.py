from os import name
from django.contrib.auth.models import User, Group
from rest_framework import status
from rest_framework.test import APITestCase

class AccountTests(APITestCase):
    def setUp(self):
        Group.objects.create(name="cliente")
        Group.objects.create(name="prestador")

    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = '/usuarios/clientes/'
        data = {
            'username':'gnomoteste',
            'first_name':'Gnomo',
            'last_name':'Teste',
            'email':'gnomedeteste@teste.com',
            'password':'senhadognomo1234',
            'groupname': 'cliente'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_prestador(self):
        """
        Ensure we can create a new prestador account object.
        """
        url = '/usuarios/prestadores/'
        data = {
            'username':'gnomoPrestador',
            'first_name':'GnomoP',
            'last_name':'Teste',
            'email':'prestador@teste.com',
            'password':'senhadognomo1234',
            'groupname': 'prestador'           
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)