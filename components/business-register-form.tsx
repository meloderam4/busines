"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Building2, CreditCard, Info } from "lucide-react"
import Link from "next/link"
import BusinessForm from "@/components/business-form"
import { addBusinessAction } from "@/app/admin/actions"

interface BusinessRegisterFormProps {
  user: any
  profile: any
}

export default function BusinessRegisterForm({ user, profile }: BusinessRegisterFormProps) {
  const [isPremium, setIsPremium] = useState(false)
  const [showUpgradeAlert, setShowUpgradeAlert] = useState(false)

  console.log("BusinessRegisterForm - User:", user?.email)
  console.log("BusinessRegisterForm - Profile:", profile)

  // Check if user is business owner
  const isBusinessOwner = profile?.user_type === "business_owner"

  const handlePremiumPayment = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 50000, // $500 AUD in cents
          currency: "AUD",
          productName: "Business Finder Premium Package",
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("Failed to create Stripe checkout session:", data.error)
        alert("Error initiating payment. Please try again.")
      }
    } catch (error) {
      console.error("Error initiating Stripe checkout:", error)
      alert("Error connecting to payment server. Please check your internet connection.")
    }
  }

  const handleBusinessRegistration = async (formData: FormData) => {
    try {
      // Add user ID to form data
      formData.set("userId", user.id)
      formData.set("userEmail", user.email)

      console.log("Submitting business registration...")

      // Call the business registration action
      await addBusinessAction(formData)

      console.log("Business registration successful!")
    } catch (error) {
      console.error("Business registration error:", error)
      throw error
    }
  }

  // Show upgrade prompt for regular users
  if (!isBusinessOwner) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Your Business</h1>
          <p className="text-gray-600">Join our platform and reach more customers</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Upgrade Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                To register a business, you need to upgrade your account to a Business Owner account.
              </AlertDescription>
            </Alert>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Business Owner Benefits</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Register and manage multiple businesses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Access to business analytics and insights
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Priority customer support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Promotional opportunities
                </li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Current Account: <Badge variant="secondary">Regular User</Badge>
              </p>
              <p className="text-gray-600">
                Required Account: <Badge variant="default">Business Owner</Badge>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/profile" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Update Profile
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button className="w-full">Contact Support</Button>
              </Link>
            </div>

            <div className="text-center">
              <Link href="/" className="text-blue-600 hover:underline">
                ← Back to Homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  // Show business registration form for business owners
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Business</h1>
        <p className="text-gray-600">Add your business to our platform and reach more customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <p className="text-sm text-gray-600">
                Registered by: {profile?.first_name} {profile?.last_name} ({user.email})
              </p>
            </CardHeader>
            <CardContent>
              <BusinessForm onSubmit={handleBusinessRegistration} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Premium Package */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-left text-yellow-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Premium Package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="premium" checked={isPremium} onCheckedChange={setIsPremium} />
                <Label htmlFor="premium" className="text-sm">
                  Activate Premium Package ($500.00/year)
                </Label>
              </div>

              <div className="space-y-2 text-sm text-yellow-800">
                <p>✓ Featured listing on homepage</p>
                <p>✓ Premium badge display</p>
                <p>✓ Advanced analytics</p>
                <p>✓ Priority search results</p>
                <p>✓ Social media promotion</p>
                <p>✓ 24/7 priority support</p>
              </div>

              {isPremium && (
                <Button className="w-full mt-4" onClick={handlePremiumPayment}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Registration Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Registration Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <p>Fill out business information</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <p>Submit for admin review</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <p>Get approved and go live</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <p>Start receiving customers</p>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p className="text-left">• All starred fields are mandatory</p>
              <p className="text-left">• Upload high-quality images</p>
              <p className="text-left">• Write a complete description</p>
              <p className="text-left">• Provide accurate contact info</p>
              <div className="pt-2">
                <Link href="/help" className="text-blue-600 hover:underline">
                  View detailed guide →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
