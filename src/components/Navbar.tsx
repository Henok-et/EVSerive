import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuthStore();

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <div className="space-x-2">
          <Link 
            to="/login"
            className="bg-white text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-50"
          >
            Login
          </Link>
          <Link 
            to="/register"
            className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-400"
          >
            Register
          </Link>
        </div>
      );
    }

    if (role === 'provider') {
      return (
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/services" className="hover:bg-emerald-700 px-3 py-2 rounded-md">
            My Services
          </Link>
          <Link to="/dashboard/verification" className="hover:bg-emerald-700 px-3 py-2 rounded-md">
            Verification
          </Link>
          <button 
            onClick={() => logout()}
            className="bg-white text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-50"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Link to="/services" className="hover:bg-emerald-700 px-3 py-2 rounded-md">Services</Link>
        <Link to="/charging-stations" className="hover:bg-emerald-700 px-3 py-2 rounded-md">Charging Stations</Link>
        <Link to="/book-service" className="hover:bg-emerald-700 px-3 py-2 rounded-md">Book Service</Link>
        <Link to="/dashboard" className="hover:bg-emerald-700 px-3 py-2 rounded-md">Dashboard</Link>
        <button 
          onClick={() => logout()}
          className="bg-white text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-50"
        >
          Logout
        </button>
      </div>
    );
  };

  return (
    <nav className="bg-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Battery className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">EV Ethiopia</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            {renderNavLinks()}
          </div>
          
          <div className="md:hidden">
            <Menu className="h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
}