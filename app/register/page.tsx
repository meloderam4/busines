"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"regular" | "business_owner">("regular")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Show redirect message if user was redirected from business registration
  const showRedirectMessage = redirectTo === "/business/register"

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_type: userType,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback${redirectTo ? `?redirect=${redirectTo}` : ""}`,
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (data.user) {
        // Update profile with user_type
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            user_type: userType,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          })
          .eq("id", data.user.id)

        if (profileError) {
          setError(profileError.message)
          return
        }

        alert("Registration successful! Please check your email to verify your account.")

        // Redirect to login with the same redirect parameter
        const loginUrl = `/login${redirectTo ? `?redirect=${redirectTo}` : ""}`
        router.push(loginUrl)
      }
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
          redirectTo: `${window.location.origin}/auth/callback?user_type=${userType}${redirectTo ? `&redirect=${redirectTo}` : ""}`,
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
          <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-gray-600">Join the local business community</p>
        </div>

        {showRedirectMessage && (
          <Alert>
            <AlertDescription>
              To register a business, you need an account first. Please create a Business Owner account to continue.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "regular" | "business_owner")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="regular">Regular User</TabsTrigger>
                <TabsTrigger value="business_owner">Business Owner</TabsTrigger>
              </TabsList>

              <form onSubmit={handleRegister} className="space-y-4">
                <TabsContent value="regular" className="space-y-4 mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-left block mb-2">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="text-left"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-left block mb-2">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="text-left"
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business_owner" className="space-y-4 mt-0">
                  <div>
                    <Label htmlFor="firstName" className="text-left block mb-2">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="text-left"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-left block mb-2">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="text-left"
                      required
                    />
                  </div>
                </TabsContent>

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
                  <Label htmlFor="phone" className="text-left block mb-2">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+61 400 000 000"
                    className="text-left"
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
                      placeholder="At least 8 characters"
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

                <div>
                  <Label htmlFor="confirmPassword" className="text-left block mb-2">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      className="text-left pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-left">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <Button type="submit" className="w-full" disabled={!formData.agreeToTerms || loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href={`/login${redirectTo ? `?redirect=${redirectTo}` : ""}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Log In
                    </Link>
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    type="button"
                    onClick={() => handleOAuthSignIn("google")}
                    disabled={loading}
                  >
                    Sign Up with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    type="button"
                    onClick={() => handleOAuthSignIn("apple")}
                    disabled={loading}
                  >
                    Sign Up with Apple
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>

        {userType === "business_owner" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <p className="text-sm text-blue-800 text-center">
                💼 Business Owner accounts can register and manage businesses on our platform.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
