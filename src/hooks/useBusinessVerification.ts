import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BusinessVerification } from '../types/provider';

export function useBusinessVerification() {
  const [verification, setVerification] = useState<BusinessVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    checkVerification();
  }, []);

  const checkVerification = async () => {
    try {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase
        .from('business_verifications')
        .select('*')
        .eq('provider_id', user.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setVerification(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to check verification status'));
    } finally {
      setLoading(false);
    }
  };

  const submitVerification = async (documentUrl: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error('Not authenticated');
      }

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

      setVerification(data);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to submit verification');
    }
  };

  return {
    verification,
    loading,
    error,
    submitVerification,
    refresh: checkVerification
  };
}