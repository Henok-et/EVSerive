import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  if (role !== 'client') {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          {/* Add booking list component */}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Favorite Services</h2>
          {/* Add favorites component */}
        </div>
      </div>
    </div>
  );
}