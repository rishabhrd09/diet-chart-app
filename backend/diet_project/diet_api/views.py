from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import DietItem
from .serializers import DietItemSerializer

class DietItemViewSet(viewsets.ModelViewSet):
    queryset = DietItem.objects.all().order_by('time')  # Add sorting
    serializer_class = DietItemSerializer