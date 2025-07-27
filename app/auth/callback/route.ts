import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const redirect = searchParams.get("redirect")
  const userType = searchParams.get("user_type")

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // If user_type is provided (from OAuth registration), update the profile
      if (userType) {
        await supabase.from("profiles").update({ user_type: userType }).eq("id", data.user.id)
      }

      // Redirect to the specified page or profile
      const redirectUrl = redirect || "/profile"
      return NextResponse.redirect(`${origin}${redirectUrl}`)
    }
  }

  // If there's an error, redirect to login
  return NextResponse.redirect(`${origin}/login`)
}
