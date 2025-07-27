"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X, User, Building2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, user_type")
          .eq("id", user.id)
          .single()
        setProfile(profile)
      }
    }

    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email) // Debug log

      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, user_type")
          .eq("id", session.user.id)
          .single()
        setProfile(profile)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ]

  const userName = profile?.first_name || user?.email?.split("@")[0] || "User"

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Business Finder
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  pathname === item.href ? "text-blue-600 font-medium" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="text" placeholder="Search businesses..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Authenticated User Menu */}
                <div className="hidden md:flex items-center space-x-4">
                  {profile?.user_type === "business_owner" && (
                    <Link href="/business/register">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Building2 className="w-4 h-4 mr-2" />
                        Add Business
                      </Button>
                    </Link>
                  )}
                  <Link href="/favorites">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="hidden lg:inline">{userName}</span>
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Guest User Menu */}
                <div className="hidden md:flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input type="text" placeholder="Search businesses..." className="pl-10 pr-4 py-2 w-full" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 text-gray-700 hover:text-blue-600 transition-colors ${
                  pathname === item.href ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t pt-4">
              {user ? (
                <>
                  {/* Authenticated Mobile Menu */}
                  <div className="space-y-2">
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Profile ({userName})
                      </Button>
                    </Link>
                    <Link href="/favorites" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Heart className="w-4 h-4 mr-2" />
                        Favorites
                      </Button>
                    </Link>
                    {profile?.user_type === "business_owner" && (
                      <Link href="/business/register" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Building2 className="w-4 h-4 mr-2" />
                          Add Business
                        </Button>
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Guest Mobile Menu */}
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start">Sign Up</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
