-- Verify database setup
DO $$
DECLARE
    businesses_count INTEGER;
    profiles_count INTEGER;
    reviews_count INTEGER;
BEGIN
    -- Check if tables exist
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'businesses') THEN
        SELECT COUNT(*) INTO businesses_count FROM public.businesses;
        RAISE NOTICE 'Businesses table exists with % records', businesses_count;
    ELSE
        RAISE NOTICE 'Businesses table does not exist';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        SELECT COUNT(*) INTO profiles_count FROM public.profiles;
        RAISE NOTICE 'Profiles table exists with % records', profiles_count;
    ELSE
        RAISE NOTICE 'Profiles table does not exist';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'reviews') THEN
        SELECT COUNT(*) INTO reviews_count FROM public.reviews;
        RAISE NOTICE 'Reviews table exists with % records', reviews_count;
    ELSE
        RAISE NOTICE 'Reviews table does not exist';
    END IF;
    
    -- Check if UUID extension is enabled
    IF EXISTS (SELECT FROM pg_extension WHERE extname = 'uuid-ossp') THEN
        RAISE NOTICE 'UUID extension is enabled';
    ELSE
        RAISE NOTICE 'UUID extension is not enabled';
    END IF;
END $$;
