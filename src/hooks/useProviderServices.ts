import { useState, useEffect } from 'react';
import { providerService } from '../services/providerService';
import type { ProviderService } from '../types/provider';

export function useProviderServices() {
  const [services, setServices] = useState<ProviderService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await providerService.getServices();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load services'));
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<ProviderService, 'id' | 'provider_id' | 'created_at' | 'updated_at'>) => {
    try {
      const newService = await providerService.createService(service);
      setServices(prev => [...prev, newService]);
      return newService;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add service');
    }
  };

  const updateService = async (id: string, updates: Partial<ProviderService>) => {
    try {
      const updatedService = await providerService.updateService(id, updates);
      setServices(prev => prev.map(service => 
        service.id === id ? updatedService : service
      ));
      return updatedService;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update service');
    }
  };

  const deleteService = async (id: string) => {
    try {
      await providerService.deleteService(id);
      setServices(prev => prev.filter(service => service.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete service');
    }
  };

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refresh: loadServices
  };
}