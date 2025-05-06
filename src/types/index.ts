export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'repair' | 'maintenance' | 'cleaning' | 'charging';
  price: number;
  duration: string;
}

export interface ChargingStation {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  available: boolean;
  chargingType: string[];
  rating: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'appointment' | 'chat' | 'system';
  read: boolean;
  created_at: string;
}