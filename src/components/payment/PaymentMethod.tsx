import React from 'react';

interface PaymentMethodProps {
  name: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function PaymentMethod({ name, label, selected, onClick }: PaymentMethodProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 border rounded-lg text-center transition-colors ${
        selected
          ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
          : 'border-gray-200 hover:border-emerald-600'
      }`}
    >
      {label}
    </button>
  );
}