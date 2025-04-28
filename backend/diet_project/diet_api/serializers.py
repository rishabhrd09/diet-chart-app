from rest_framework import serializers
from .models import DietItem

# backend/diet_api/serializers.py
class DietItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietItem
        fields = '__all__'
        extra_kwargs = {
            'calories': {'required': False, 'allow_null': True},
            'quantity_ml': {'required': False, 'allow_null': True},
            'description': {'required': False, 'allow_null': True}
        }