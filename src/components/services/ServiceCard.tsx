import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  onClick?: (service: Service) => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (onClick) {
      onClick(service);
    } else {
      navigate('/book-service', { state: { service } });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
      <p className="mt-2 text-gray-600">{service.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-emerald-600 font-semibold">
          ETB {service.price.toLocaleString()}
        </span>
        <span className="text-gray-500">{service.duration}</span>
      </div>
      <button
        onClick={handleBooking}
        className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700"
      >
        Book Now
      </button>
    </div>
  );
}