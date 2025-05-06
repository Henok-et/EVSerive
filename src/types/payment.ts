export type PaymentMethod = 'telebirr' | 'cbe' | 'card';

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface PaymentTransaction {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  payment_method: PaymentMethod;
  reference_number?: string;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
}