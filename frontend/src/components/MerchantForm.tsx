'use client';

import { useState, useEffect } from 'react';
import { Merchant, MerchantFormData } from '@/types/merchant';
import { merchantService } from '@/services/merchantService';

interface MerchantFormProps {
  merchant?: Merchant | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function MerchantForm({ merchant, onSuccess, onCancel }: MerchantFormProps) {
  const [formData, setFormData] = useState<MerchantFormData>({
    name: '',
    business_registration_number: '',
    email: '',
    phone: '',
    status: 'Pending',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (merchant) {
      setFormData({
        name: merchant.name,
        business_registration_number: merchant.business_registration_number,
        email: merchant.email,
        phone: merchant.phone,
        status: merchant.status,
      });
    }
  }, [merchant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (merchant) {
        await merchantService.updateMerchant(merchant.id, formData);
      } else {
        await merchantService.createMerchant(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {merchant ? 'Edit Merchant' : 'Create New Merchant'}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter business name"
            />
          </div>

          <div>
            <label htmlFor="business_registration_number" className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number *
            </label>
            <input
              type="text"
              id="business_registration_number"
              name="business_registration_number"
              value={formData.business_registration_number}
              onChange={handleChange}
              required
              className="input"
              placeholder="e.g., BRN123456"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : merchant ? 'Update Merchant' : 'Create Merchant'}
          </button>
        </div>
      </form>
    </div>
  );
}