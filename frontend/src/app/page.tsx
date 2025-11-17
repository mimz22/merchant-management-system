'use client';

import { useEffect, useState } from 'react';
import MerchantList from '@/components/MerchantList';
import MerchantForm from '@/components/MerchantForm';
import Statistics from '@/components/Statistics';
import { Merchant } from '@/types/merchant';
import { merchantService } from '@/services/merchantService';

export default function Home() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await merchantService.getAllMerchants();
      setMerchants(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch merchants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleCreateSuccess = () => {
    setShowForm(false);
    fetchMerchants();
  };

  const handleEdit = (merchant: Merchant) => {
    setEditingMerchant(merchant);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this merchant?')) {
      try {
        await merchantService.deleteMerchant(id);
        fetchMerchants();
      } catch (err: any) {
        setError(err.message || 'Failed to delete merchant');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMerchant(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Merchant Management System
          </h1>
          <p className="text-gray-600">
            Manage your merchants efficiently and effectively
          </p>
        </div>

        <Statistics />

        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add New Merchant'}
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <MerchantForm
              merchant={editingMerchant}
              onSuccess={handleCreateSuccess}
              onCancel={handleFormClose}
            />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        <MerchantList
          merchants={merchants}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}