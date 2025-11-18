'use client';

import { useEffect, useState } from 'react';
import { merchantService } from '@/services/merchantService';
import { MerchantStatistics } from '@/types/merchant';

interface StatisticsProps {
  onFilterChange?: (status: string | null) => void;
}

export default function Statistics({ onFilterChange }: StatisticsProps) {
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
      <button 
        onClick={() => onFilterChange?.(null)}
        className="bg-gradient-to-br from-slate-600 to-slate-700 border border-slate-500 text-white p-6 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-slate-200 text-sm font-medium">Total Merchants</p>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>
          <div className="bg-slate-500/30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </button>

      <button 
        onClick={() => onFilterChange?.('Active')}
        className="bg-gradient-to-br from-emerald-500 to-emerald-600 border border-emerald-400 text-white p-6 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-emerald-100 text-sm font-medium">Active</p>
            <p className="text-3xl font-bold mt-2">{stats.active}</p>
          </div>
          <div className="bg-emerald-400/30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </button>

      <button 
        onClick={() => onFilterChange?.('Pending')}
        className="bg-gradient-to-br from-amber-500 to-orange-500 border border-amber-400 text-white p-6 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-amber-100 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold mt-2">{stats.pending}</p>
          </div>
          <div className="bg-amber-400/30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </button>

      <button 
        onClick={() => onFilterChange?.('Suspended')}
        className="bg-gradient-to-br from-rose-500 to-red-600 border border-rose-400 text-white p-6 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-rose-500/20 transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-rose-100 text-sm font-medium">Suspended</p>
            <p className="text-3xl font-bold mt-2">{stats.suspended}</p>
          </div>
          <div className="bg-rose-400/30 rounded-full p-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}