import { supabase } from '../lib/supabase';
import type { ProviderService, BusinessVerification } from '../types/provider';

export const providerService = {
  async submitVerification(documentUrl: string): Promise<BusinessVerification> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('business_verifications')
      .insert({
        provider_id: user.user.id,
        document_url: documentUrl,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getVerificationStatus(): Promise<BusinessVerification | null> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('business_verifications')
      .select('*')
      .eq('provider_id', user.user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createService(service: Omit<ProviderService, 'id' | 'provider_id' | 'created_at' | 'updated_at'>): Promise<ProviderService> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('provider_services')
      .insert({
        ...service,
        provider_id: user.user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateService(id: string, updates: Partial<ProviderService>): Promise<ProviderService> {
    const { data, error } = await supabase
      .from('provider_services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteService(id: string): Promise<void> {
    const { error } = await supabase
      .from('provider_services')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getServices(): Promise<ProviderService[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('provider_services')
      .select(`
        *,
        images:service_images(*)
      `)
      .eq('provider_id', user.user.id);

    if (error) throw error;
    return data;
  }
};