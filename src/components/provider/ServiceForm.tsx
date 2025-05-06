import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useServiceStore } from '../../store/serviceStore';

export default function ServiceForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: 'maintenance',
    images: [] as File[]
  });

  const addService = useServiceStore(state => state.addService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addService(formData);
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        category: 'maintenance',
        images: []
      });
    } catch (error) {
      console.error('Failed to add service:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...Array.from(e.target.files!)]
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">Service Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value="maintenance">Maintenance</option>
          <option value="repair">Repair</option>
          <option value="cleaning">Cleaning</option>
          <option value="charging">Charging</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price (ETB)</label>
        <input
          type="number"
          value={formData.price}
          onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500">
                <span>Upload files</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        Publish Service
      </button>
    </form>
  );
}