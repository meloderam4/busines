-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    status TEXT DEFAULT 'pending',
    image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
    rating DECIMAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Add constraints
    CONSTRAINT businesses_status_check CHECK (status IN ('pending', 'approved', 'rejected')),
    CONSTRAINT businesses_rating_check CHECK (rating >= 0 AND rating <= 5)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_is_promoted ON public.businesses(is_promoted);
CREATE INDEX IF NOT EXISTS idx_businesses_created_at ON public.businesses(created_at);
CREATE INDEX IF NOT EXISTS idx_businesses_name ON public.businesses(name);

-- Enable Row Level Security
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view approved businesses" ON public.businesses;
DROP POLICY IF EXISTS "Authenticated users can view all businesses" ON public.businesses;
DROP POLICY IF EXISTS "Only admins can insert businesses" ON public.businesses;
DROP POLICY IF EXISTS "Only admins can update businesses" ON public.businesses;
DROP POLICY IF EXISTS "Only admins can delete businesses" ON public.businesses;

-- Create policies for businesses table
CREATE POLICY "Anyone can view approved businesses" ON public.businesses
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Authenticated users can view all businesses" ON public.businesses
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert businesses" ON public.businesses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update businesses" ON public.businesses
    FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete businesses" ON public.businesses
    FOR DELETE USING (true);
