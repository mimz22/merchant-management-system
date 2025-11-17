'use client';

import { useEffect, useState } from 'react';
import { merchantService } from '@/services/merchantService';
import { MerchantStatistics } from '@/types/merchant';

export default function Statistics() {
  const [stats, setStats] = useState<MerchantStatistics>({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await merchantService.getStatistics();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Merchants</p>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>
          <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Active</p>
            <p className="text-3xl font-bold mt-2">{stats.active}</p>
          </div>
          <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold mt-2">{stats.pending}</p>
          </div>
          <div className="bg-yellow-400 bg-opacity-30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium">Suspended</p>
            <p className="text-3xl font-bold mt-2">{stats.suspended}</p>
          </div>
          <div className="bg-red-400 bg-opacity-30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}