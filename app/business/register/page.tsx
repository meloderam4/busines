import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import BusinessRegisterForm from "@/components/business-register-form"

export default async function BusinessRegisterPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect to login if user is not authenticated
  if (!user) {
    redirect("/login?redirect=/business/register")
  }

  // Fetch user profile to check user type
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type, first_name, last_name")
    .eq("id", user.id)
    .single()

  return <BusinessRegisterForm user={user} profile={profile} />
}
