/*
  # Add email field to profiles table
  
  1. Changes
    - Add email column to profiles table
    - Make email unique
    - Add index for faster lookups
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email text UNIQUE NOT NULL;
    CREATE INDEX idx_profiles_email ON profiles(email);
  END IF;
END $$;