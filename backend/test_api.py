#!/usr/bin/env python3
import requests
import json

# Test data
test_merchant = {
    "name": "Test Company",
    "business_registration_number": "TEST123456",
    "email": "test@example.com",
    "phone": "+1234567890",
    "status": "Pending"
}

# API endpoint
url = "http://localhost:8000/api/merchants/"

try:
    # Test POST request
    print("Testing merchant creation...")
    response = requests.post(url, json=test_merchant, headers={'Content-Type': 'application/json'})
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 201:
        print("✅ Merchant created successfully!")
        merchant_data = response.json()
        merchant_id = merchant_data['id']
        
        # Test GET request
        print(f"\nTesting merchant retrieval...")
        get_response = requests.get(f"{url}{merchant_id}/")
        print(f"GET Status Code: {get_response.status_code}")
        print(f"GET Response: {get_response.text}")
        
    else:
        print("❌ Failed to create merchant")
        
except requests.exceptions.ConnectionError:
    print("❌ Could not connect to the server. Make sure Django is running on port 8000.")
except Exception as e:
    print(f"❌ Error: {e}")