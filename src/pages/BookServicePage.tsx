import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ServiceSelection from '../components/booking/ServiceSelection';
import SchedulingForm from '../components/booking/SchedulingForm';
import PaymentMethodSelection from '../components/booking/PaymentMethodSelection';
import BookingSummary from '../components/booking/BookingSummary';
import { Steps } from '../components/ui/Steps';
import type { Service } from '../types';

interface LocationState {
  service?: Service;
}

export default function BookServicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: (location.state as LocationState)?.service || null,
    date: '',
    time: '',
    notes: '',
    paymentMethod: ''
  });

  // If service was passed via navigation, start at step 2
  useEffect(() => {
    if (bookingData.service) {
      setCurrentStep(2);
    }
  }, []);

  const steps = [
    { number: 1, title: 'Select Service', description: 'Choose your service' },
    { number: 2, title: 'Schedule', description: 'Pick date and time' },
    { number: 3, title: 'Payment', description: 'Choose payment method' },
    { number: 4, title: 'Review', description: 'Confirm booking details' }
  ];

  const handleServiceSelect = (service: Service) => {
    setBookingData({ ...bookingData, service });
    setCurrentStep(2);
  };

  const handleScheduleSubmit = (scheduleData: any) => {
    setBookingData({ ...bookingData, ...scheduleData });
    setCurrentStep(3);
  };

  const handlePaymentSelect = (paymentMethod: string) => {
    setBookingData({ ...bookingData, paymentMethod });
    setCurrentStep(4);
  };

  const handleConfirmBooking = async () => {
    try {
      // Navigate to payment processing page
      navigate('/booking/payment', { 
        state: { 
          booking: {
            id: Date.now().toString(), // Temporary ID until backend integration
            serviceName: bookingData.service?.name,
            amount: bookingData.service?.price,
            paymentMethod: bookingData.paymentMethod
          }
        }
      });
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Steps steps={steps} currentStep={currentStep} />

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        {currentStep === 1 && (
          <ServiceSelection onSelect={handleServiceSelect} />
        )}

        {currentStep === 2 && (
          <SchedulingForm 
            onSubmit={handleScheduleSubmit}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <PaymentMethodSelection
            onSelect={handlePaymentSelect}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <BookingSummary
            bookingData={bookingData}
            onBack={() => setCurrentStep(3)}
            onConfirm={handleConfirmBooking}
          />
        )}
      </div>
    </div>
  );
}