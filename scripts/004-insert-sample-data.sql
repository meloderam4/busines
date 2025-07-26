-- Insert sample businesses (only if table exists and is empty)
DO $$
BEGIN
    -- Check if businesses table exists and has no data
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'businesses') THEN
        -- Only insert if table is empty
        IF NOT EXISTS (SELECT 1 FROM public.businesses LIMIT 1) THEN
            INSERT INTO public.businesses (
                name, category, description, address, phone, email, website, 
                working_hours, services, images, latitude, longitude, 
                is_promoted, status, image, rating, review_count
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
                '680 Beaudesert Rd, Rocklea QLD 4106, Australia',
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
            
            RAISE NOTICE 'Sample businesses inserted successfully';
        ELSE
            RAISE NOTICE 'Businesses table already contains data, skipping sample data insertion';
        END IF;
    ELSE
        RAISE NOTICE 'Businesses table does not exist, skipping sample data insertion';
    END IF;
END $$;
