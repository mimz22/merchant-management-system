from django.db import models
from django.core.validators import RegexValidator, EmailValidator


class Merchant(models.Model):
    """
    Merchant model representing a business entity.
    """
    
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Pending', 'Pending'),
        ('Suspended', 'Suspended'),
    ]
    
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    
    name = models.CharField(
        max_length=255,
        help_text="Merchant business name"
    )
    
    business_registration_number = models.CharField(
        max_length=100,
        unique=True,
        help_text="Unique business registration number"
    )
    
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        help_text="Merchant contact email"
    )
    
    phone = models.CharField(
        validators=[phone_regex],
        max_length=17,
        help_text="Merchant contact phone number"
    )
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending',
        help_text="Current status of the merchant"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Merchant'
        verbose_name_plural = 'Merchants'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['business_registration_number']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.business_registration_number})"