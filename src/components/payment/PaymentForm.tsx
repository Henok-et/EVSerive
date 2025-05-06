import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import PaymentMethod from './PaymentMethod';
import TelebirrForm from './TelebirrForm';
import CBEForm from './CBEForm';
import CardPaymentForm from './CardPaymentForm';
import { PAYMENT_TYPES, PaymentType } from './constants';

export default function PaymentForm() {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState<PaymentType>(PAYMENT_TYPES.TELEBIRR);
  const { selectedService } = useBookingStore();

  if (!selectedService) {
    navigate('/services');
    return null;
  }

  const paymentMethods = [
    { name: PAYMENT_TYPES.TELEBIRR, label: 'Telebirr' },
    { name: PAYMENT_TYPES.CBE, label: 'CBE' },
    { name: PAYMENT_TYPES.CARD, label: 'Card' },
  ];

  const renderPaymentForm = () => {
    switch (paymentType) {
      case PAYMENT_TYPES.TELEBIRR:
        return <TelebirrForm />;
      case PAYMENT_TYPES.CBE:
        return <CBEForm />;
      case PAYMENT_TYPES.CARD:
        return <CardPaymentForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Payment for {selectedService.name}
        </h3>
        <p className="text-gray-600">
          Amount: ETB {selectedService.price.toLocaleString()}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
}