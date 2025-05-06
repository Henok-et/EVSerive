import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FormInput } from '../ui/FormInput';
import { FormError } from '../ui/FormError';

export default function AdminRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    adminCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Verify admin code
      if (formData.adminCode !== import.meta.env.VITE_ADMIN_ACCESS_CODE) {
        throw new Error('Invalid admin access code');
      }

      await register(formData.email, formData.password, formData.name, 'admin');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Admin Registration</h2>
        <p className="mt-2 text-gray-600">Create an administrator account</p>
      </div>

      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <FormInput
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          minLength={8}
        />

        <FormInput
          label="Admin Access Code"
          type="password"
          value={formData.adminCode}
          onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Admin Account'}
        </button>
      </form>
    </div>
  );
}