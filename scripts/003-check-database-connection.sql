-- Test database connection and check if businesses table exists
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'businesses'
ORDER BY ordinal_position;

-- Check if there are any businesses in the table
SELECT COUNT(*) as total_businesses FROM businesses;

-- Show all businesses with their status
SELECT id, name, category, status, created_at FROM businesses ORDER BY created_at DESC;
