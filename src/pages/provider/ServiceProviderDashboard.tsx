import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import ServicesList from '../../components/provider/ServicesList';
import ServiceForm from '../../components/provider/ServiceForm';
import BusinessVerification from '../../components/provider/BusinessVerification';
import { useBusinessVerification } from '../../hooks/useBusinessVerification';

export default function ServiceProviderDashboard() {
  const { role } = useAuthStore();
  const { verification, loading } = useBusinessVerification();

  if (role !== 'provider') {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // If not verified, only show verification page
  if (!verification || verification.status !== 'verified') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BusinessVerification />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Routes>
        <Route index element={<Navigate to="services" />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="services/new" element={<ServiceForm />} />
        <Route path="verification" element={<BusinessVerification />} />
      </Routes>
    </div>
  );
}