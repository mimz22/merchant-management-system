from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Merchant


class MerchantModelTest(TestCase):
    """Test cases for Merchant model."""
    
    def setUp(self):
        self.merchant = Merchant.objects.create(
            name="Test Merchant",
            business_registration_number="BRN123456",
            email="test@example.com",
            phone="+1234567890",
            status="Active"
        )
    
    def test_merchant_creation(self):
        """Test merchant is created correctly."""
        self.assertEqual(self.merchant.name, "Test Merchant")
        self.assertEqual(self.merchant.status, "Active")
        self.assertTrue(isinstance(self.merchant, Merchant))
    
    def test_merchant_str(self):
        """Test merchant string representation."""
        expected = "Test Merchant (BRN123456)"
        self.assertEqual(str(self.merchant), expected)


class MerchantAPITest(APITestCase):
    """Test cases for Merchant API endpoints."""
    
    def setUp(self):
        self.merchant_data = {
            'name': 'API Test Merchant',
            'business_registration_number': 'BRN789012',
            'email': 'api@example.com',
            'phone': '+1987654321',
            'status': 'Pending'
        }
        
        self.merchant = Merchant.objects.create(
            name="Existing Merchant",
            business_registration_number="BRN111111",
            email="existing@example.com",
            phone="+1111111111",
            status="Active"
        )
    
    def test_create_merchant(self):
        """Test creating a merchant via API."""
        url = reverse('merchant-list')
        response = self.client.post(url, self.merchant_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Merchant.objects.count(), 2)
        self.assertEqual(response.data['name'], 'API Test Merchant')
    
    def test_create_merchant_invalid_email(self):
        """Test creating merchant with invalid email."""
        url = reverse('merchant-list')
        invalid_data = self.merchant_data.copy()
        invalid_data['email'] = 'invalid-email'
        response = self.client.post(url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_get_merchants_list(self):
        """Test retrieving list of merchants."""
        url = reverse('merchant-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data['results']), 1)
    
    def test_get_merchant_detail(self):
        """Test retrieving a single merchant."""
        url = reverse('merchant-detail', kwargs={'pk': self.merchant.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Existing Merchant')
    
    def test_update_merchant(self):
        """Test updating a merchant."""
        url = reverse('merchant-detail', kwargs={'pk': self.merchant.pk})
        updated_data = {
            'name': 'Updated Merchant',
            'business_registration_number': 'BRN111111',
            'email': 'existing@example.com',
            'phone': '+1111111111',
            'status': 'Suspended'
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated Merchant')
        self.assertEqual(response.data['status'], 'Suspended')
    
    def test_partial_update_merchant(self):
        """Test partially updating a merchant."""
        url = reverse('merchant-detail', kwargs={'pk': self.merchant.pk})
        partial_data = {'status': 'Suspended'}
        response = self.client.patch(url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'Suspended')
    
    def test_delete_merchant(self):
        """Test deleting a merchant."""
        url = reverse('merchant-detail', kwargs={'pk': self.merchant.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Merchant.objects.count(), 0)
    
    def test_filter_by_status(self):
        """Test filtering merchants by status."""
        url = reverse('merchant-list')
        response = self.client.get(url, {'status': 'Active'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for merchant in response.data['results']:
            self.assertEqual(merchant['status'], 'Active')
    
    def test_search_merchants(self):
        """Test searching merchants."""
        url = reverse('merchant-list')
        response = self.client.get(url, {'search': 'Existing'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data['results']), 1)
    
    def test_statistics_endpoint(self):
        """Test merchant statistics endpoint."""
        url = reverse('merchant-statistics')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total', response.data)
        self.assertIn('active', response.data)
        self.assertIn('pending', response.data)
        self.assertIn('suspended', response.data)