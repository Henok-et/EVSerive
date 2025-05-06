import { supabase } from '../lib/supabase';
import type { Booking } from '../types';

export const bookingService = {
  async createBooking(bookingData: Omit<Booking, 'id'>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (error) throw new Error('Failed to create booking');
    return data;
  },

  async getBooking(id: string): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services:service_id (
          name,
          price
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw new Error('Failed to fetch booking');
    return data;
  },

  async updateBookingStatus(id: string, status: string): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) throw new Error('Failed to update booking status');
  }
};