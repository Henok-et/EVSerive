import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { FormInput } from '../ui/FormInput';

interface CBEFormProps {
  bookingId: string;
  amount: number;
}

export default function CBEForm({ bookingId, amount }: CBEFormProps) {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payment = await paymentService.createPayment(bookingId, amount, 'cbe');
      await paymentService.verifyCBE(payment.id, accountNumber);
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
        label="CBE Account Number"
        type="text"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        placeholder="1000XXXXXX"
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
        {loading ? 'Processing...' : 'Pay with CBE'}
      </button>
    </form>
  );
}