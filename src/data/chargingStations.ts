import type { ChargingStation } from '../types';

export const chargingStations: ChargingStation[] = [
  {
    id: '1',
    name: 'Bole Charging Hub',
    location: {
      lat: 9.0252,
      lng: 38.7895
    },
    address: 'Bole Road, Addis Ababa',
    available: true,
    chargingType: ['DC Fast Charging', 'Level 2 AC'],
    rating: 4.5
  },
  {
    id: '2',
    name: 'Megenagna Station',
    location: {
      lat: 9.0346,
      lng: 38.7931
    },
    address: 'Megenagna, Addis Ababa',
    available: true,
    chargingType: ['Level 2 AC'],
    rating: 4.2
  },
  {
    id: '3',
    name: 'Sarbet EV Center',
    location: {
      lat: 9.0098,
      lng: 38.7623
    },
    address: 'Sarbet, Addis Ababa',
    available: false,
    chargingType: ['DC Fast Charging'],
    rating: 4.8
  }
];