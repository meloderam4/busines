"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect")

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Show redirect message if user was redirected from business registration
  const showRedirectMessage = redirectTo === "/business/register"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      // Redirect to the original destination or profile
      const destination = redirectTo || "/profile"
      router.push(destination)
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: "google" | "apple") => {
    setLoading(true)
    setError(null)
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback${redirectTo ? `?redirect=${redirectTo}` : ""}`,
        },
      })

      if (authError) {
        setError(authError.message)
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600 mb-8 block">
            Business Finder
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Log In to Your Account</h2>
          <p className="mt-2 text-gray-600">Welcome back! Please sign in to continue</p>
        </div>

        {showRedirectMessage && (
          <Alert>
            <AlertDescription>
              You need to log in to register a business. Please sign in to your account or create a new one.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-left block mb-2">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="text-left"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-left block mb-2">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="text-left pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging In..." : "Log In"}
              </Button>

              <Separator className="my-4" />

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  type="button"
                  onClick={() => handleOAuthSignIn("google")}
                  disabled={loading}
                >
                  Log In with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  type="button"
                  onClick={() => handleOAuthSignIn("apple")}
                  disabled={loading}
                >
                  Log In with Apple
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href={`/register${redirectTo ? `?redirect=${redirectTo}` : ""}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm text-green-800 text-center">
              🔒 Your information is protected with the highest security.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
