import axios from 'axios';
import { Merchant, MerchantFormData, MerchantStatistics } from '@/types/merchant';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const merchantService = {
  getAllMerchants: async (): Promise<Merchant[]> => {
    try {
      const response = await api.get('/merchants/');
      return response.data.results || response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch merchants');
    }
  },

  getMerchant: async (id: number): Promise<Merchant> => {
    try {
      const response = await api.get(`/merchants/${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch merchant');
    }
  },

  createMerchant: async (data: MerchantFormData): Promise<Merchant> => {
    try {
      const response = await api.post('/merchants/', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                          JSON.stringify(error.response?.data) || 
                          'Failed to create merchant';
      throw new Error(errorMessage);
    }
  },

  updateMerchant: async (id: number, data: MerchantFormData): Promise<Merchant> => {
    try {
      const response = await api.put(`/merchants/${id}/`, data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                          JSON.stringify(error.response?.data) || 
                          'Failed to update merchant';
      throw new Error(errorMessage);
    }
  },

  deleteMerchant: async (id: number): Promise<void> => {
    try {
      await api.delete(`/merchants/${id}/`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete merchant');
    }
  },

  getStatistics: async (): Promise<MerchantStatistics> => {
    try {
      const response = await api.get('/merchants/statistics/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
    }
  },

  exportCSV: async (): Promise<void> => {
    try {
      const response = await api.get('/merchants/export_csv/', {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `merchants_export_${new Date().toISOString().slice(0, 10)}.csv`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to export data');
    }
  },

  generateReport: async (): Promise<void> => {
    try {
      const response = await api.get('/merchants/generate_report/', {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `merchant_report_${new Date().toISOString().slice(0, 10)}.json`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to generate report');
    }
  },
};