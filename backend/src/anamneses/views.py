from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Anamneses
from .serializers import AnamnesesSerializer

# Create your views here.
class AnamnesesList(APIView):
    """Class based function para controlar get e post do objeto Aplicacao."""
    def get(self, request, format=None):
        anamneses = Anamneses.objects.all()
        serializer = AnamnesesSerializer(anamneses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AnamnesesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)