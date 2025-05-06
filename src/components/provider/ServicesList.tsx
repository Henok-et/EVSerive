import React from 'react';
import { Edit2, Trash2, BarChart2 } from 'lucide-react';
import { useServiceStore } from '../../store/serviceStore';

export default function ServicesList() {
  const services = useServiceStore(state => state.services);
  const deleteService = useServiceStore(state => state.deleteService);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            {service.images?.[0] && (
              <img
                src={service.images[0]}
                alt={service.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{service.description}</p>
            <p className="text-emerald-600 font-semibold mt-2">
              ETB {Number(service.price).toLocaleString()}
            </p>
            
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {}} // Add edit handler
                className="flex items-center text-gray-600 hover:text-emerald-600"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => {}} // Add stats handler
                className="flex items-center text-gray-600 hover:text-emerald-600"
              >
                <BarChart2 className="h-4 w-4 mr-1" />
                Stats
              </button>
              <button
                onClick={() => deleteService(service.id)}
                className="flex items-center text-gray-600 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}