import React, { useState } from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';

export default function SchedulingForm({ onSubmit, onBack }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Schedule Your Service</h2>

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="block w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select time</option>
              {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                <option key={hour} value={`${hour}:00`}>
                  {hour}:00
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 z-10" />
            <textarea
              placeholder="Additional notes or requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}