import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { bookingService } from '../../services/bookingService';
import { FormInput } from '../ui/FormInput';
import { FormError } from '../ui/FormError';
import type { Service } from '../../types';

interface BookingFormProps {
  service: Service;
}

export default function BookingForm({ service }: BookingFormProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const booking = await bookingService.createBooking({
        serviceId: service.id,
        userId: user.id,
        date,
        time,
        status: 'pending'
      });

      navigate('/booking/payment', { 
        state: { 
          booking: {
            id: booking.id,
            serviceName: service.name,
            amount: service.price
          }
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        >
          <option value="">Select time</option>
          {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
            <option key={hour} value={`${hour}:00`}>
              {hour}:00
            </option>
          ))}
        </select>
      </div>

      {error && <FormError message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </button>
    </form>
  );
}