import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables; auth features will be unavailable.")
    return createBrowserClient("https://example.supabase.co", "missing-anon-key")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
