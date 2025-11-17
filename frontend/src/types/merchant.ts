export interface Merchant {
  id: number;
  name: string;
  business_registration_number: string;
  email: string;
  phone: string;
  status: 'Active' | 'Pending' | 'Suspended';
  created_at: string;
  updated_at: string;
}

export interface MerchantFormData {
  name: string;
  business_registration_number: string;
  email: string;
  phone: string;
  status: 'Active' | 'Pending' | 'Suspended';
}

export interface MerchantStatistics {
  total: number;
  active: number;
  pending: number;
  suspended: number;
}