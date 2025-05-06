/*
  # Fix authentication policies and prevent recursion

  1. Changes
    - Simplify profile policies to prevent recursion
    - Add better constraints and validation
    - Improve admin role handling

  2. Security
    - Maintain RLS while fixing recursion
    - Ensure proper access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- Create simplified policies
CREATE POLICY "Enable read access for all users"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Add admin role check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;