import { create } from 'zustand';
import type { Service, Booking } from '../types';

interface BookingState {
  selectedService: Service | null;
  selectedDate: Date | null;
  bookings: Booking[];
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: Date | null) => void;
  createBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedService: null,
  selectedDate: null,
  bookings: [],
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  createBooking: async (booking) => {
    // Simulate API call
    const newBooking = { ...booking, id: Math.random().toString() };
    set((state) => ({ bookings: [...state.bookings, newBooking] }));
  },
}));