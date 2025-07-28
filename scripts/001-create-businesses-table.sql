-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  website TEXT,
  working_hours TEXT,
  services JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  latitude DECIMAL,
  longitude DECIMAL,
  is_promoted BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
  rating DECIMAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  distance DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_created_at ON businesses(created_at);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on businesses" ON businesses
  FOR ALL USING (true);
