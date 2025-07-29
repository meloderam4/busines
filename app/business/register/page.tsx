"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import BusinessRegisterForm from "@/components/business-register-form"

export default function BusinessRegisterPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...")

        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()

        console.log("Current user:", currentUser?.email || "No user")

        if (!currentUser) {
          console.log("No user found, redirecting to login...")
          router.push("/login?redirect=/business/register")
          return
        }

        setUser(currentUser)

        // Fetch user profile to check user type
        console.log("Fetching user profile...")
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("user_type, first_name, last_name")
          .eq("id", currentUser.id)
          .single()

        if (profileError) {
          console.log("Profile error:", profileError)
          // If profile doesn't exist, create a fallback
          setProfile({
            user_type: currentUser.user_metadata?.user_type || "regular",
            first_name: currentUser.user_metadata?.first_name || "",
            last_name: currentUser.user_metadata?.last_name || "",
          })
        } else {
          console.log("Profile loaded:", profileData)
          setProfile(profileData)
        }
      } catch (err) {
        console.error("Auth check error:", err)
        setError("Failed to load user information")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="text-blue-600 hover:underline">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return <BusinessRegisterForm user={user} profile={profile} />
}
