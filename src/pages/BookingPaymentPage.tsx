import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PaymentMethod from '../components/payment/PaymentMethod';
import TelebirrForm from '../components/payment/TelebirrForm';
import CBEForm from '../components/payment/CBEForm';
import PaymentStatus from '../components/payment/PaymentStatus';
import { PAYMENT_TYPES, PaymentType } from '../components/payment/constants';

export default function BookingPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const [paymentType, setPaymentType] = useState<PaymentType>(PAYMENT_TYPES.TELEBIRR);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');

  // Get booking details from location state
  const booking = location.state?.booking;
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!booking) {
    navigate('/services');
    return null;
  }

  const paymentMethods = [
    { name: PAYMENT_TYPES.TELEBIRR, label: 'Telebirr' },
    { name: PAYMENT_TYPES.CBE, label: 'CBE' }
  ];

  const renderPaymentForm = () => {
    const props = {
      bookingId: booking.id,
      amount: booking.amount,
      onPaymentStart: () => setPaymentStatus('processing'),
      onPaymentComplete: () => setPaymentStatus('completed'),
      onPaymentError: () => setPaymentStatus('failed')
    };

    switch (paymentType) {
      case PAYMENT_TYPES.TELEBIRR:
        return <TelebirrForm {...props} />;
      case PAYMENT_TYPES.CBE:
        return <CBEForm {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Payment for {booking.serviceName}
        </h3>
        <p className="text-gray-600">
          Amount: ETB {booking.amount.toLocaleString()}
        </p>
      </div>

      {paymentStatus === 'pending' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map(({ name, label }) => (
              <PaymentMethod
                key={name}
                name={name}
                label={label}
                selected={paymentType === name}
                onClick={() => setPaymentType(name as PaymentType)}
              />
            ))}
          </div>

          <div className="mt-6">
            {renderPaymentForm()}
          </div>
        </div>
      )}

      {paymentStatus !== 'pending' && (
        <PaymentStatus 
          status={paymentStatus === 'processing' ? 'pending' : paymentStatus}
          message={
            paymentStatus === 'completed' 
              ? 'Your booking has been confirmed!'
              : paymentStatus === 'failed'
              ? 'Please try again or choose a different payment method'
              : 'Processing your payment...'
          }
        />
      )}
    </div>
  );
}