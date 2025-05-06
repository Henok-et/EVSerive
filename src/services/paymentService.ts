import { supabase } from '../lib/supabase';
import type { PaymentMethod, PaymentTransaction, PaymentStatus } from '../types/payment';
import { PaymentError } from '../utils/errors';
import { validatePaymentDetails } from '../utils/validation';

export const paymentService = {
  async createPayment(bookingId: string, amount: number, method: PaymentMethod): Promise<PaymentTransaction> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new PaymentError('Not authenticated');

    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .insert({
          booking_id: bookingId,
          user_id: user.user.id,
          amount,
          payment_method: method,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw new PaymentError('Failed to create payment');
      return data as PaymentTransaction;
    } catch (error) {
      console.error('Payment creation error:', error);
      throw new PaymentError('Payment creation failed');
    }
  },

  async verifyTelebirr(transactionId: string, phoneNumber: string): Promise<void> {
    try {
      validatePaymentDetails({ phoneNumber });
      // Simulate Telebirr API call
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });
      await this.updatePaymentStatus(transactionId, 'completed');
    } catch (error) {
      await this.updatePaymentStatus(transactionId, 'failed');
      throw error;
    }
  },

  async verifyCBE(transactionId: string, accountNumber: string): Promise<void> {
    try {
      validatePaymentDetails({ accountNumber });
      // Simulate CBE API call
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });
      await this.updatePaymentStatus(transactionId, 'completed');
    } catch (error) {
      await this.updatePaymentStatus(transactionId, 'failed');
      throw error;
    }
  },

  async updatePaymentStatus(transactionId: string, status: PaymentStatus): Promise<void> {
    const { error } = await supabase
      .from('payment_transactions')
      .update({ status })
      .eq('id', transactionId);

    if (error) throw new PaymentError('Failed to update payment status');
  }
};