import type { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Basic Maintenance',
    description: 'Regular check-up and basic maintenance for your EV',
    category: 'maintenance',
    price: 2500,
    duration: '2 hours'
  },
  {
    id: '2',
    name: 'Battery Diagnostics',
    description: 'Comprehensive battery health check and optimization',
    category: 'maintenance',
    price: 3500,
    duration: '3 hours'
  },
  {
    id: '3',
    name: 'Charging System Repair',
    description: 'Diagnosis and repair of charging system issues',
    category: 'repair',
    price: 4500,
    duration: '4 hours'
  },
  {
    id: '4',
    name: 'Interior Cleaning',
    description: 'Deep cleaning of vehicle interior',
    category: 'cleaning',
    price: 1500,
    duration: '1.5 hours'
  },
  {
    id: '5',
    name: 'Exterior Detailing',
    description: 'Complete exterior cleaning and protection',
    category: 'cleaning',
    price: 2000,
    duration: '2 hours'
  },
  {
    id: '6',
    name: 'Software Update',
    description: 'Vehicle software update and system optimization',
    category: 'maintenance',
    price: 1800,
    duration: '1 hour'
  }
];