import React from 'react';
import { Phone, CreditCard } from 'lucide-react';

export default function PaymentMethodSelection({ onSelect, onBack }) {
  const paymentMethods = [
    {
      id: 'telebirr',
      name: 'Telebirr',
      icon: <Phone className="w-6 h-6" />,
      description: 'Pay using your Telebirr mobile money account'
    },
    {
      id: 'cbe',
      name: 'CBE',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Pay using your Commercial Bank of Ethiopia account'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className="flex items-start p-4 border rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
          >
            <div className="flex-shrink-0 p-2 bg-emerald-100 rounded-lg">
              {method.icon}
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-semibold">{method.name}</h3>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}