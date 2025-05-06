import React from 'react';
import ChargingMap from '../components/charging/ChargingMap';

export default function ChargingStationsPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Charging Stations</h1>
        <ChargingMap />
      </div>
    </div>
  );
}