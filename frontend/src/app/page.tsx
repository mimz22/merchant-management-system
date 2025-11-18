'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MerchantList from '@/components/MerchantList';
import MerchantForm from '@/components/MerchantForm';
import Statistics from '@/components/Statistics';
import { Merchant } from '@/types/merchant';
import { merchantService } from '@/services/merchantService';

// Footer configuration
const FOOTER_CONFIG = {
  githubUsername: 'mimz22',
  repositoryName: 'merchant-management-system',
  authorName: 'Mimi Oppong',
  year: new Date().getFullYear()
};

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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Moving Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%),
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 60%)
            `,
            backgroundSize: '150px 150px, 150px 150px, 300px 300px, 300px 300px',
            animation: 'moveBackground 15s linear infinite'
          }}></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-white/15 rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-1/6 w-16 h-16 border border-white/15 -rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="relative z-10">
        {/* Top Navigation */}
        <nav className="bg-black/95 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => {
                  setActiveTab('home');
                  router.push('/');
                  window.location.reload();
                }}
                className="text-2xl font-light text-white hover:text-amber-300 transition-all duration-500 tracking-wider cursor-pointer"
              >
                <span className="font-thin">MERCHANT</span>
                <span className="text-amber-400 font-extralight mx-1">HUB</span>
              </button>
              <div className="flex space-x-1">
                {['home', 'dashboard', 'merchants', 'analytics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      router.push(`?tab=${tab}`);
                    }}
                    className={`px-6 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
                      activeTab === tab
                        ? 'text-amber-400 border-b border-amber-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-amber-600 to-amber-500 text-black px-8 py-2 font-light tracking-wide hover:from-amber-500 hover:to-amber-400 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-xs">+</span>
              <span>ADD MERCHANT</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'home' && (
          <div className="text-center space-y-12">
            <div className="space-y-8">
              <h1 className="text-7xl font-thin text-white leading-none tracking-wider">
                <span className="block">ELEVATE</span>
                <span className="block text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text font-extralight">
                  EXCELLENCE
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-light tracking-wide">
                Premium merchant management for discerning businesses. 
                <span className="text-amber-400">Sophisticated</span> analytics, 
                <span className="text-amber-400">seamless</span> operations, 
                <span className="text-amber-400">unparalleled</span> insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  router.push('?tab=dashboard');
                }}
                className="group bg-black/40 border border-amber-500/20 backdrop-blur-sm p-10 hover:border-amber-400/40 transition-all duration-500 text-left w-full"
              >
                <div className="w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-600 mb-8 group-hover:h-16 transition-all duration-300"></div>
                <h3 className="text-lg font-light text-white mb-4 tracking-wider">DASHBOARD</h3>
                <p className="text-gray-500 leading-relaxed font-light text-sm">Executive overview and key metrics</p>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('merchants');
                  router.push('?tab=merchants');
                }}
                className="group bg-black/40 border border-amber-500/20 backdrop-blur-sm p-10 hover:border-amber-400/40 transition-all duration-500 text-left w-full"
              >
                <div className="w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-600 mb-8 group-hover:h-16 transition-all duration-300"></div>
                <h3 className="text-lg font-light text-white mb-4 tracking-wider">MANAGEMENT</h3>
                <p className="text-gray-500 leading-relaxed font-light text-sm">Effortless merchant portfolio control</p>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('analytics');
                  router.push('?tab=analytics');
                }}
                className="group bg-black/40 border border-amber-500/20 backdrop-blur-sm p-10 hover:border-amber-400/40 transition-all duration-500 text-left w-full"
              >
                <div className="w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-600 mb-8 group-hover:h-16 transition-all duration-300"></div>
                <h3 className="text-lg font-light text-white mb-4 tracking-wider">ANALYTICS</h3>
                <p className="text-gray-500 leading-relaxed font-light text-sm">Advanced charts and data insights</p>
              </button>
            </div>
            
            <div className="mt-20">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  router.push('?tab=dashboard');
                }}
                className="bg-gradient-to-r from-amber-600 to-amber-500 text-black px-12 py-4 font-light text-sm tracking-[0.2em] hover:from-amber-500 hover:to-amber-400 transition-all duration-500 mx-auto block"
              >
                ENTER PLATFORM
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-thin text-white mb-2 tracking-wider">DASHBOARD</h2>
                <p className="text-gray-500 font-light">Your merchant empire at a glance</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setActiveTab('merchants');
                    router.push('?tab=merchants');
                  }}
                  className="border border-amber-500/30 text-amber-400 px-6 py-2 hover:bg-amber-500/10 transition-all duration-300 text-xs tracking-wider"
                >
                  VIEW ALL
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-amber-600 text-black px-6 py-2 hover:bg-amber-500 transition-all duration-300 text-xs tracking-wider"
                >
                  ADD MERCHANT
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-8">
                <h3 className="text-2xl font-light text-white mb-6 tracking-wider">PERFORMANCE</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-amber-500/10">
                    <span className="text-gray-400 font-light">Total Revenue</span>
                    <span className="text-2xl font-thin text-amber-400">$2.4M</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-amber-500/10">
                    <span className="text-gray-400 font-light">Growth Rate</span>
                    <span className="text-2xl font-thin text-green-400">+24%</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-amber-500/10">
                    <span className="text-gray-400 font-light">Active Merchants</span>
                    <span className="text-2xl font-thin text-white">{merchants.filter(m => m.status === 'Active').length}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-8">
                <h3 className="text-2xl font-light text-white mb-6 tracking-wider">INSIGHTS</h3>
                <div className="space-y-6">
                  <div className="p-4 border border-amber-500/10">
                    <div className="text-sm text-gray-400 mb-2">TOP PERFORMER</div>
                    <div className="text-lg font-light text-white">Premium Merchants</div>
                    <div className="text-amber-400 text-sm">+18% this month</div>
                  </div>
                  <div className="p-4 border border-amber-500/10">
                    <div className="text-sm text-gray-400 mb-2">TRENDING</div>
                    <div className="text-lg font-light text-white">New Registrations</div>
                    <div className="text-green-400 text-sm">+32% increase</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-light text-white mb-6 tracking-wider">RECENT ACTIVITY</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-amber-500/10">
                  <div>
                    <div className="text-white font-light">New merchant registration</div>
                    <div className="text-gray-400 text-sm">Premium Electronics Co.</div>
                  </div>
                  <div className="text-gray-500 text-sm">2 hours ago</div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-amber-500/10">
                  <div>
                    <div className="text-white font-light">Status update</div>
                    <div className="text-gray-400 text-sm">Luxury Goods Ltd. activated</div>
                  </div>
                  <div className="text-gray-500 text-sm">4 hours ago</div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-amber-500/10">
                  <div>
                    <div className="text-white font-light">System maintenance</div>
                    <div className="text-gray-400 text-sm">Database optimization completed</div>
                  </div>
                  <div className="text-gray-500 text-sm">6 hours ago</div>
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
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-thin text-white mb-2 tracking-wider">ANALYTICS</h2>
                <p className="text-gray-500 font-light">Advanced insights and data intelligence</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={async () => {
                    try {
                      await merchantService.exportCSV();
                    } catch (err: any) {
                      setError(err.message || 'Failed to export data');
                    }
                  }}
                  className="border border-amber-500/30 text-amber-400 px-6 py-2 hover:bg-amber-500/10 transition-all duration-300 text-xs tracking-wider"
                >
                  EXPORT DATA
                </button>
                <button 
                  onClick={async () => {
                    try {
                      await merchantService.generateReport();
                    } catch (err: any) {
                      setError(err.message || 'Failed to generate report');
                    }
                  }}
                  className="bg-amber-600 text-black px-6 py-2 hover:bg-amber-500 transition-all duration-300 text-xs tracking-wider"
                >
                  GENERATE REPORT
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-6">
                <h3 className="text-lg font-light text-white mb-4 tracking-wider">REVENUE TREND</h3>
                <div className="h-44 relative">
                  <div className="absolute bottom-0 left-0 w-full flex items-end justify-between gap-2">
                    {[65, 45, 78, 52, 89, 67, 94].map((height, i) => (
                      <div key={i} className="bg-gradient-to-t from-amber-600 to-amber-400 w-8 animate-pulse" style={{height: `${height}%`, animationDelay: `${i * 0.2}s`}}></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-thin text-amber-400">+24%</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-6">
                <h3 className="text-lg font-light text-white mb-4 tracking-wider">MERCHANT GROWTH</h3>
                <div className="h-44 flex flex-col items-center justify-center relative">
                  <div className="w-32 h-32 border-4 border-amber-500/20 rounded-full relative">
                    <div className="w-32 h-32 border-4 border-amber-400 rounded-full absolute -top-1 -left-1" style={{clipPath: 'circle(75% at 50% 50%)'}}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-thin text-amber-400">75%</span>
                      <span className="text-sm font-thin text-white">Active</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-400">Merchant Status</div>
                </div>
              </div>
              
              <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-6">
                <h3 className="text-lg font-light text-white mb-4 tracking-wider">PERFORMANCE</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Conversion Rate</span>
                    <span className="text-green-400 font-light">12.4%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2">
                    <div className="bg-gradient-to-r from-green-600 to-green-400 h-2 w-3/4 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Customer Satisfaction</span>
                    <span className="text-amber-400 font-light">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 w-11/12 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-8">
                <h3 className="text-2xl font-light text-white mb-6 tracking-wider">MARKET INSIGHTS</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-amber-500/10">
                    <div>
                      <div className="text-white font-light">Top Category</div>
                      <div className="text-gray-400 text-sm">Premium Electronics</div>
                    </div>
                    <div className="text-amber-400 text-xl font-thin">42%</div>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-amber-500/10">
                    <div>
                      <div className="text-white font-light">Peak Hours</div>
                      <div className="text-gray-400 text-sm">2PM - 6PM</div>
                    </div>
                    <div className="text-green-400 text-xl font-thin">+18%</div>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <div className="text-white font-light">Avg. Transaction</div>
                      <div className="text-gray-400 text-sm">Per merchant</div>
                    </div>
                    <div className="text-white text-xl font-thin">$2,847</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 border border-amber-500/20 backdrop-blur-sm p-8">
                <h3 className="text-2xl font-light text-white mb-6 tracking-wider">FORECASTING</h3>
                <div className="space-y-6">
                  <div className="p-4 border border-amber-500/10">
                    <div className="text-sm text-gray-400 mb-2">NEXT QUARTER PROJECTION</div>
                    <div className="text-2xl font-thin text-amber-400 mb-1">$3.2M</div>
                    <div className="text-green-400 text-sm">+33% growth expected</div>
                  </div>
                  <div className="p-4 border border-amber-500/10">
                    <div className="text-sm text-gray-400 mb-2">NEW MERCHANTS</div>
                    <div className="text-2xl font-thin text-white mb-1">127</div>
                    <div className="text-amber-400 text-sm">Projected additions</div>
                  </div>
                  <div className="p-4 border border-amber-500/10">
                    <div className="text-sm text-gray-400 mb-2">MARKET EXPANSION</div>
                    <div className="text-2xl font-thin text-white mb-1">3</div>
                    <div className="text-blue-400 text-sm">New regions targeted</div>
                  </div>
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
      
      {/* Footer */}
      <footer className="border-t border-amber-500/20 bg-black/95 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="text-white font-light tracking-wider mb-2">
                <span className="font-thin">MERCHANT</span>
                <span className="text-amber-400 font-extralight mx-1">HUB</span>
              </div>
              <p className="text-gray-500 text-sm font-light">Premium business management platform</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm font-light mb-1">
                Licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">MIT License</a>
              </p>
              <p className="text-gray-600 text-xs font-light mb-1">
                © {FOOTER_CONFIG.year} MerchantHub. Built with ❤️ by <a href={`https://github.com/${FOOTER_CONFIG.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">@{FOOTER_CONFIG.githubUsername}</a>
              </p>
              <p className="text-gray-700 text-xs font-light">
                <a href={`https://github.com/${FOOTER_CONFIG.githubUsername}/${FOOTER_CONFIG.repositoryName}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-400 transition-colors">View on GitHub</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-30px) translateY(-15px); }
          50% { transform: translateX(-60px) translateY(-30px); }
          75% { transform: translateX(-30px) translateY(-45px); }
          100% { transform: translateX(0) translateY(-60px); }
        }
      `}</style>
    </div>
  );
}