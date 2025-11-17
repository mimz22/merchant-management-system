from rest_framework import serializers
from .models import Merchant


class MerchantSerializer(serializers.ModelSerializer):
    """
    Serializer for Merchant model with validation.
    """
    
    class Meta:
        model = Merchant
        fields = [
            'id',
            'name',
            'business_registration_number',
            'email',
            'phone',
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_name(self, value):
        """Validate merchant name."""
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Name must be at least 2 characters long."
            )
        return value.strip()
    
    def validate_business_registration_number(self, value):
        """Validate business registration number."""
        value = value.strip().upper()
        
        if len(value) < 3:
            raise serializers.ValidationError(
                "Business registration number must be at least 3 characters long."
            )
        
        # Check uniqueness on update
        if self.instance:
            if Merchant.objects.exclude(pk=self.instance.pk).filter(
                business_registration_number=value
            ).exists():
                raise serializers.ValidationError(
                    "A merchant with this business registration number already exists."
                )
        
        return value
    
    def validate_email(self, value):
        """Validate email."""
        value = value.lower().strip()
        
        # Check uniqueness on update
        if self.instance:
            if Merchant.objects.exclude(pk=self.instance.pk).filter(
                email=value
            ).exists():
                raise serializers.ValidationError(
                    "A merchant with this email already exists."
                )
        
        return value
    
    def validate_phone(self, value):
        """Validate and format phone number."""
        # Remove spaces and dashes
        cleaned = value.replace(' ', '').replace('-', '')
        return cleaned
    
    def validate_status(self, value):
        """Validate status."""
        valid_statuses = ['Active', 'Pending', 'Suspended']
        if value not in valid_statuses:
            raise serializers.ValidationError(
                f"Status must be one of: {', '.join(valid_statuses)}"
            )
        return value