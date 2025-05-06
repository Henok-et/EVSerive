import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle, CheckCircle, XCircle, FileText } from 'lucide-react';

interface VerificationRequest {
  id: string;
  provider_id: string;
  document_url: string;
  status: 'pending' | 'verified' | 'rejected';
  submitted_at: string;
  notes?: string;
  provider: {
    name: string;
    email: string;
  }
}

export default function VerificationRequests() {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVerificationRequests();
  }, []);

  const fetchVerificationRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('business_verifications')
        .select(`
          id,
          provider_id,
          document_url,
          status,
          submitted_at,
          notes,
          provider:profiles!provider_id (
            name,
            email
          )
        `)
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching verification requests:', err);
      setError('Failed to load verification requests');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (id: string, status: 'verified' | 'rejected', notes?: string) => {
    try {
      const { error } = await supabase
        .from('business_verifications')
        .update({
          status,
          notes,
          verified_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Update profiles table to mark provider as verified
      if (status === 'verified') {
        const request = requests.find(r => r.id === id);
        if (request) {
          await supabase
            .from('profiles')
            .update({ verified: true })
            .eq('id', request.provider_id);
        }
      }

      // Refresh the list
      fetchVerificationRequests();
    } catch (err) {
      console.error('Error updating verification status:', err);
      setError('Failed to update verification status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Pending Verifications</h2>
        <button 
          onClick={() => fetchVerificationRequests()}
          className="text-emerald-600 hover:text-emerald-700"
        >
          Refresh
        </button>
      </div>
      
      <div className="grid gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{request.provider.name}</h3>
                  <p className="text-gray-600">{request.provider.email}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Submitted: {new Date(request.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleVerification(request.id, 'verified')}
                    className="flex items-center px-3 py-2 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      const notes = window.prompt('Enter rejection reason:');
                      if (notes) {
                        handleVerification(request.id, 'rejected', notes);
                      }
                    }}
                    className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <a
                  href={request.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Document
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No pending verification requests</p>
          </div>
        )}
      </div>
    </div>
  );
}