import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  images: string[];
  provider_id: string;
}

interface ServiceStore {
  services: Service[];
  addService: (service: Omit<Service, 'id' | 'provider_id'>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  fetchServices: () => Promise<void>;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  
  addService: async (serviceData) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('services')
      .insert({
        ...serviceData,
        provider_id: user.user.id
      })
      .select()
      .single();

    if (error) throw error;

    set(state => ({
      services: [...state.services, data]
    }));
  },

  deleteService: async (id) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    set(state => ({
      services: state.services.filter(service => service.id !== id)
    }));
  },

  fetchServices: async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('provider_id', user.user.id);

    if (error) throw error;

    set({ services: data });
  }
}));