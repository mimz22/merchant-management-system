'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MerchantList from '@/components/MerchantList';
import MerchantForm from '@/components/MerchantForm';
import Statistics from '@/components/Statistics';
import { Merchant } from '@/types/merchant';
import { merchantService } from '@/services/merchantService';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'home');
  const [statusFilter, setStatusFilter] = useState<string | null>(searchParams.get('filter'));

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

  useEffect(() => {
    const tab = searchParams.get('tab') || 'home';
    const filter = searchParams.get('filter');
    setActiveTab(tab);
    setStatusFilter(filter);
  }, [searchParams]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #1e40af 0%, transparent 40%), radial-gradient(circle at 80% 80%, #7c3aed 0%, transparent 40%), radial-gradient(circle at 40% 70%, #059669 0%, transparent 30%)`,
          backgroundSize: '600px 600px'
        }}></div>
      </div>
      <div className="relative z-10">
        {/* Top Navigation */}
        <nav className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => {
                  setActiveTab('home');
                  router.push('?tab=home');
                }}
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>Merchant</span>
                <span className="text-blue-400 font-black">HUB</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </button>
              <div className="flex space-x-1">
                {['home', 'dashboard', 'merchants', 'analytics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      router.push(`?tab=${tab}`);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>+</span>
              New Merchant
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'home' && (
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold text-white leading-tight">
                Scale Your Business
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Effortlessly
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                The all-in-one platform that transforms how you manage merchants. Real-time analytics, seamless operations, and intelligent insights—all in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  router.push('?tab=dashboard');
                }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all text-left w-full"
              >
                <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-blue-400 text-xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Dashboard Analytics</h3>
                <p className="text-gray-300 leading-relaxed">Real-time insights and comprehensive analytics to track your merchant performance.</p>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('merchants');
                  router.push('?tab=merchants');
                }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:shadow-xl hover:shadow-green-500/10 transition-all text-left w-full"
              >
                <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-green-400 text-xl">🏪</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Merchant Management</h3>
                <p className="text-gray-300 leading-relaxed">Efficiently manage all your merchants with advanced filtering and organization tools.</p>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('analytics');
                  router.push('?tab=analytics');
                }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all text-left w-full"
              >
                <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-purple-400 text-xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Growth Analytics</h3>
                <p className="text-gray-300 leading-relaxed">Advanced reporting and insights to drive strategic business decisions.</p>
              </button>
            </div>
            
            <div className="mt-16">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  router.push('?tab=dashboard');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
              >
                <span className="text-xl">🚀</span>
                Get Started
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
                <p className="text-gray-300">Welcome back! Here's what's happening with your merchants today.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setActiveTab('merchants');
                    router.push('?tab=merchants');
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  View All
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                >
                  <span>+</span> Add Merchant
                </button>
              </div>
            </div>
            
            <Statistics onFilterChange={(status) => {
              setStatusFilter(status);
              setActiveTab('merchants');
              const params = new URLSearchParams();
              params.set('tab', 'merchants');
              if (status) params.set('filter', status);
              router.push(`?${params.toString()}`);
            }} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                    <span className="text-sm text-gray-400">Last 5 merchants</span>
                  </div>
                  <MerchantList
                    merchants={merchants.slice(0, 5)}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-blue-600/20 border border-blue-600/30 text-blue-300 px-4 py-3 rounded-lg hover:bg-blue-600/30 transition-colors text-left flex items-center gap-3"
                    >
                      <span className="text-blue-400">+</span>
                      <span>Add New Merchant</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('analytics');
                        router.push('?tab=analytics');
                      }}
                      className="w-full bg-purple-600/20 border border-purple-600/30 text-purple-300 px-4 py-3 rounded-lg hover:bg-purple-600/30 transition-colors text-left flex items-center gap-3"
                    >
                      <span className="text-purple-400">📊</span>
                      <span>View Analytics</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">API Status</span>
                      <span className="text-green-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Online
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Database</span>
                      <span className="text-green-400 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'merchants' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Merchants</h2>
                <p className="text-gray-300">Manage and monitor your entire merchant network</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    router.push('?tab=dashboard');
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                >
                  <span>+</span> Add Merchant
                </button>
              </div>
            </div>
            
            <Statistics onFilterChange={(status) => {
              setStatusFilter(status);
              const params = new URLSearchParams();
              params.set('tab', 'merchants');
              if (status) params.set('filter', status);
              router.push(`?${params.toString()}`);
            }} />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold text-white">
                        {statusFilter ? `${statusFilter} Merchants` : 'All Merchants'}
                      </h3>
                      <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                        {statusFilter ? merchants.filter(m => m.status === statusFilter).length : merchants.length} total
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {statusFilter && (
                        <button
                          onClick={() => {
                            setStatusFilter(null);
                            router.push('?tab=merchants');
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                        >
                          <span>×</span> Clear Filter
                        </button>
                      )}
                      <button
                        onClick={() => fetchMerchants()}
                        className="text-gray-400 hover:text-white text-sm flex items-center gap-1"
                      >
                        <span>↻</span> Refresh
                      </button>
                    </div>
                  </div>
                  <MerchantList
                    merchants={statusFilter ? merchants.filter(m => m.status === statusFilter) : merchants}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Filters</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setStatusFilter(null);
                        router.push('?tab=merchants');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !statusFilter ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      All Merchants
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('Active');
                        router.push('?tab=merchants&filter=Active');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        statusFilter === 'Active' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Active Only
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('Pending');
                        router.push('?tab=merchants&filter=Pending');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        statusFilter === 'Pending' ? 'bg-amber-600/20 text-amber-300 border border-amber-600/30' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Pending Only
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('Suspended');
                        router.push('?tab=merchants&filter=Suspended');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        statusFilter === 'Suspended' ? 'bg-rose-600/20 text-rose-300 border border-rose-600/30' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Suspended Only
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-blue-600/20 border border-blue-600/30 text-blue-300 px-4 py-3 rounded-lg hover:bg-blue-600/30 transition-colors text-left flex items-center gap-3"
                    >
                      <span className="text-blue-400">+</span>
                      <span>Add New Merchant</span>
                    </button>
                    <button
                      onClick={() => fetchMerchants()}
                      className="w-full bg-gray-700/50 border border-gray-600 text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-left flex items-center gap-3"
                    >
                      <span className="text-gray-400">↻</span>
                      <span>Refresh Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Analytics & Insights</h2>
              <p className="text-gray-300">Deep dive into your data</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Growth Metrics</h3>
                <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-900 rounded-lg">
                  📈 Advanced charts coming soon
                </div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Stats</h3>
                <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-900 rounded-lg">
                  🎯 Interactive dashboards coming soon
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <span className="text-red-400 text-lg mr-3">⚠️</span>
              <div>
                <p className="text-red-300 font-medium">Something went wrong</p>
                <p className="text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <MerchantForm
              merchant={editingMerchant}
              onSuccess={handleCreateSuccess}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}