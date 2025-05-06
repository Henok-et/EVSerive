import React from 'react';
import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';

interface BookingSummaryProps {
  bookingData: any;
  onBack: () => void;
  onConfirm: () => void;
}

export default function BookingSummary({ bookingData, onBack, onConfirm }: BookingSummaryProps) {
  const { service, date, time, notes, paymentMethod } = bookingData;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Booking Summary</h2>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Service</h3>
          <p className="mt-1 text-lg">{service?.name}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
          <p className="mt-1 text-lg">
            {format(new Date(date), 'MMMM d, yyyy')} at {time}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
          <p className="mt-1 text-lg capitalize">{paymentMethod}</p>
        </div>

        {notes && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Additional Notes</h3>
            <p className="mt-1">{notes}</p>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
          <p className="mt-1 text-2xl font-bold text-emerald-600">
            ETB {service?.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}