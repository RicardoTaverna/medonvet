from os import name
from django.urls import reverse
from django.contrib.auth.models import User, Group
from rest_framework import status
from rest_framework.test import APITestCase

class AccountTests(APITestCase):
    def setUp(self):
        Group.objects.create(name="cliente")

    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = '/usuarios/cliente/'
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
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'gnomoteste')
