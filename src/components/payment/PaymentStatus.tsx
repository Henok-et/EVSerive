import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { PaymentStatus as Status } from '../../types/payment';

interface PaymentStatusProps {
  status: Status;
  message?: string;
}

export default function PaymentStatus({ status, message }: PaymentStatusProps) {
  const statusConfig = {
    pending: {
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      text: 'Payment Pending',
      className: 'bg-yellow-50 text-yellow-700'
    },
    completed: {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      text: 'Payment Successful',
      className: 'bg-green-50 text-green-700'
    },
    failed: {
      icon: <XCircle className="w-6 h-6 text-red-500" />,
      text: 'Payment Failed',
      className: 'bg-red-50 text-red-700'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`p-4 rounded-lg flex items-center space-x-3 ${config.className}`}>
      {config.icon}
      <div>
        <p className="font-medium">{config.text}</p>
        {message && <p className="text-sm mt-1">{message}</p>}
      </div>
    </div>
  );
}