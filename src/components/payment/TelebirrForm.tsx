import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { FormInput } from '../ui/FormInput';

interface TelebirrFormProps {
  bookingId: string;
  amount: number;
}

export default function TelebirrForm({ bookingId, amount }: TelebirrFormProps) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payment = await paymentService.createPayment(bookingId, amount, 'telebirr');
      await paymentService.verifyTelebirr(payment.id, phone);
      navigate('/booking/confirmation');
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Telebirr Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="251 9XX XXX XXX"
        required
      />
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay with Telebirr'}
      </button>
    </form>
  );
}