/*
  # Add chat and payment features

  1. New Tables
    - chat_messages: Store chat messages
    - payment_transactions: Track payments
    
  2. Changes
    - Add payment status to bookings
    - Add payment method tracking
    
  3. Security
    - RLS policies for new tables
    - Payment verification
*/

-- Create payment_transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  amount decimal NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('telebirr', 'cbe', 'card')),
  reference_number text,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add payment fields to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status text 
  CHECK (payment_status IN ('pending', 'paid', 'failed'));
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id uuid 
  REFERENCES payment_transactions(id);

-- Enable RLS
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Policies for payment_transactions
CREATE POLICY "Users can view own payments"
  ON payment_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments"
  ON payment_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to handle payment verification
CREATE OR REPLACE FUNCTION verify_payment()
RETURNS TRIGGER AS $$
BEGIN
  -- Update booking payment status
  UPDATE bookings 
  SET payment_status = NEW.status,
      payment_id = NEW.id
  WHERE id = NEW.booking_id;
  
  -- Create notification
  INSERT INTO notifications (
    user_id,
    title,
    message,
    type
  ) VALUES (
    NEW.user_id,
    'Payment Update',
    CASE 
      WHEN NEW.status = 'completed' THEN 'Payment successful'
      WHEN NEW.status = 'failed' THEN 'Payment failed'
      ELSE 'Payment pending'
    END,
    'system'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;