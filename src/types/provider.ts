export interface BusinessVerification {
  id: string;
  provider_id: string;
  document_url: string;
  status: 'pending' | 'verified' | 'rejected';
  submitted_at: string;
  verified_at?: string;
  notes?: string;
  provider?: {
    name: string;
    email: string;
  };
}

export interface ProviderService {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images?: ServiceImage[];
}

export interface ServiceImage {
  id: string;
  service_id: string;
  url: string;
  created_at: string;
}

export interface ServiceStats {
  views: number;
  bookings: number;
  revenue: number;
}