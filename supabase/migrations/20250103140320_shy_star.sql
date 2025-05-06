/*
  # Business Verification and Services Schema

  1. New Tables
    - `business_verifications`
      - Stores business verification documents and status
    - `provider_services`
      - Stores service provider offerings
    - `service_images`
      - Stores images for services

  2. Security
    - Enable RLS on all tables
    - Add policies for service providers
*/

-- Business Verification table
CREATE TABLE IF NOT EXISTS business_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  document_url text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'verified', 'rejected')),
  submitted_at timestamptz DEFAULT now(),
  verified_at timestamptz,
  notes text,
  UNIQUE (provider_id)
);

-- Provider Services table
CREATE TABLE IF NOT EXISTS provider_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL CHECK (price >= 0),
  location text NOT NULL,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Images table
CREATE TABLE IF NOT EXISTS service_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES provider_services(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE business_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_images ENABLE ROW LEVEL SECURITY;

-- Policies for business_verifications
CREATE POLICY "Providers can view own verification"
  ON business_verifications FOR SELECT
  USING (auth.uid() = provider_id);

CREATE POLICY "Providers can submit verification"
  ON business_verifications FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

-- Policies for provider_services
CREATE POLICY "Anyone can view active services"
  ON provider_services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Providers can manage own services"
  ON provider_services FOR ALL
  USING (auth.uid() = provider_id);

-- Policies for service_images
CREATE POLICY "Anyone can view service images"
  ON service_images FOR SELECT
  USING (true);

CREATE POLICY "Providers can manage service images"
  ON service_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM provider_services
      WHERE id = service_images.service_id
      AND provider_id = auth.uid()
    )
  );

-- Function to update service timestamps
CREATE OR REPLACE FUNCTION update_service_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating service timestamps
CREATE TRIGGER update_service_timestamp
  BEFORE UPDATE ON provider_services
  FOR EACH ROW
  EXECUTE FUNCTION update_service_timestamp();