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
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "business">("user")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessCategory: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the registration logic
    console.log("Registration data:", { ...formData, userType })
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

        <Card>
          <CardContent className="p-6">
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "user" | "business")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user">Regular User</TabsTrigger>
                <TabsTrigger value="business">Business Owner</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="user" className="space-y-4 mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-left block mb-2">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
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
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Last Name"
                        className="text-left"
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business" className="space-y-4 mt-0">
                  <div>
                    <Label htmlFor="businessName" className="text-left block mb-2">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Business Name"
                      className="text-left"
                      required={userType === "business"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessCategory" className="text-left block mb-2">
                      Business Category *
                    </Label>
                    <Input
                      id="businessCategory"
                      value={formData.businessCategory}
                      onChange={(e) => setFormData((prev) => ({ ...prev, businessCategory: e.target.value }))}
                      placeholder="e.g., Restaurant, Barbershop, Store"
                      className="text-left"
                      required={userType === "business"}
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
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="example@email.com"
                    className="text-left"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-left block mb-2">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1234567890"
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
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="At least 8 characters"
                      className="text-left pl-10"
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
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm password"
                      className="text-left pl-10"
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
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                    required
                  />
                  <Label htmlFor="terms" className="text-sm text-left">
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

                <Button type="submit" className="w-full" disabled={!formData.agreeToTerms}>
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                      Log In
                    </Link>
                  </p>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>

        {userType === "business" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <p className="text-sm text-blue-800 text-center">
                💡 After registration, you can register your business with full details.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
