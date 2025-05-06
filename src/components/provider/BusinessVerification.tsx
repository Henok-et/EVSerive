import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function BusinessVerification() {
  const [document, setDocument] = useState<File | null>(null);
  const [status, setStatus] = useState<'pending' | 'verified' | 'unverified'>('unverified');
  const { user } = useAuthStore();

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!document) return;

    try {
      // Upload document logic here
      setStatus('pending');
    } catch (error) {
      console.error('Verification submission failed:', error);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Business Verification Required
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Please upload your business registration document to verify your service provider account.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Registration Document
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500">
                  <span>Upload document</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentUpload}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
            </div>
          </div>
        </div>

        {status === 'pending' && (
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Your verification is pending review. We'll notify you once it's processed.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!document || status === 'pending'}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          Submit for Verification
        </button>
      </form>
    </div>
  );
}