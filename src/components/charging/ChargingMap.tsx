import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { chargingStations } from '../../data/chargingStations';

export default function ChargingMap() {
  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={[9.0320, 38.7520]} // Addis Ababa coordinates
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {chargingStations.map((station) => (
          <Marker key={station.id} position={[station.location.lat, station.location.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{station.name}</h3>
                <p className="text-sm text-gray-600">{station.address}</p>
                <p className="text-sm mt-1">
                  Status: {station.available ? 'Available' : 'Occupied'}
                </p>
                <div className="mt-2">
                  {station.chargingType.map((type) => (
                    <span
                      key={type}
                      className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded mr-1"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}