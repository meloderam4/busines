"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client" // Import client-side Supabase client

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push("/login")
      router.refresh() // Refresh to update server components
    } else {
      console.error("Error logging out:", error.message)
      alert("Failed to log out. Please try again.")
    }
  }

  return (
    <Button variant="outline" className="w-full justify-between bg-transparent" onClick={handleLogout}>
      <LogOut className="w-4 h-4" />
      <span>Log Out</span>
    </Button>
  )
}
