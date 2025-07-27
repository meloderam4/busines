-- Drop existing table if it exists and recreate with proper structure
DROP TABLE IF EXISTS businesses CASCADE;

-- Create businesses table
CREATE TABLE businesses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    website VARCHAR(255),
    working_hours VARCHAR(255),
    services JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_promoted BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    image VARCHAR(500) DEFAULT '/placeholder.svg?height=400&width=600',
    rating DECIMAL(3, 2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    distance DECIMAL(10, 2) DEFAULT 0.0,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE INDEX idx_businesses_location ON businesses(latitude, longitude);
CREATE INDEX idx_businesses_created_at ON businesses(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view approved businesses" ON businesses
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can view their own businesses" ON businesses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all businesses" ON businesses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_type = 'admin'
        )
    );

CREATE POLICY "Business owners can insert businesses" ON businesses
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_type IN ('business_owner', 'admin')
        )
    );

CREATE POLICY "Users can update their own businesses" ON businesses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any business" ON businesses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_type = 'admin'
        )
    );

CREATE POLICY "Users can delete their own businesses" ON businesses
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any business" ON businesses
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.user_type = 'admin'
        )
    );

-- Insert sample data
INSERT INTO businesses (
    name, category, description, address, phone, email, website, 
    working_hours, services, images, latitude, longitude, is_promoted, 
    status, image, rating, review_count
) VALUES 
(
    'Paradise Market',
    'Shopping & Retail',
    'Fresh and organic produce market. Expect the best quality from us.',
    'Shop 1/365 Logan Rd, Stones Corner QLD 4120, Australia',
    '0431181021',
    'info@paradisemarket.com.au',
    'https://paradisemarket.com.au',
    'Mon-Sat: 7:30-20:00 Sun: 8:00-19:00',
    '["Fresh Produce", "Fruits & Vegetables", "Organic Products", "Groceries"]'::jsonb,
    '["/images/paradise-market.png"]'::jsonb,
    -27.499644,
    153.044794,
    true,
    'approved',
    '/images/paradise-market.png',
    4.7,
    120
),
(
    'Toranj Restaurant',
    'Restaurant & Cafe',
    'Authentic Iranian cuisine with an unparalleled taste and a pleasant ambiance.',
    '693 Brunswick St, New Farm QLD 4005, Australia',
    '0734969158',
    'info@toranjrestaurant.com.au',
    'https://toranjrestaurant.com.au',
    'Daily 12:00 to 22:00',
    '["Iranian Food", "Kebab", "Stew", "Tea & Dessert"]'::jsonb,
    '["/images/toranj-restaurant.png"]'::jsonb,
    -27.4642967,
    153.0394663,
    false,
    'approved',
    '/images/toranj-restaurant.png',
    4.9,
    210
),
(
    'Farah Restaurant',
    'Restaurant & Cafe',
    'A unique experience of Middle Eastern cuisine with exceptional quality.',
    '391 Wickham Ter, Spring Hill QLD 4000, Australia',
    '0731725300',
    'info@farahrestaurant.com.au',
    'https://farahrestaurant.com.au',
    'Daily 11:00 to 21:00',
    '["Middle Eastern Food", "Fast Food", "Salad", "Beverages"]'::jsonb,
    '["/images/farah-restaurant.png"]'::jsonb,
    -27.4632558,
    153.0185756,
    true,
    'approved',
    '/images/farah-restaurant.png',
    4.5,
    95
),
(
    'Iraj Auto Repair (RWC)',
    'Automotive Services',
    'Specialized car repairs and RWC certification at the best prices.',
    '680 Beaudesert Rd, Rocklea QLD 4106, QLD 4104, Australia',
    '0412544121',
    'info@irajautorepair.com.au',
    'https://irajautorepair.com.au',
    'Monday to Friday 8:00 to 17:00',
    '["Engine Repair", "Oil Change", "RWC Inspection", "Brake Repair"]'::jsonb,
    '["/images/iraj-auto-repair.png"]'::jsonb,
    -27.5553195,
    153.0186751,
    false,
    'approved',
    '/images/iraj-auto-repair.png',
    4.2,
    60
);
