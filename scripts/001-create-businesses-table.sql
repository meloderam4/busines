-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  working_hours VARCHAR(255),
  services TEXT[],
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_promoted BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'pending',
  image TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  distance DECIMAL(10, 2) DEFAULT 0,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_created_at ON businesses(created_at);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON businesses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON businesses
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON businesses
  FOR DELETE USING (true);
