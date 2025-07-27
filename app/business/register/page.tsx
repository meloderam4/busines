"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import BusinessForm from "@/components/business-form" // Import the new BusinessForm
import { addBusinessAction } from "@/app/admin/actions" // Re-use the add action from admin

// Extend Window interface to include google (needed by BusinessForm)
declare global {
  interface Window {
    google: any
  }
}

export default function BusinessRegisterPage() {
  const [isPremium, setIsPremium] = useState(false)

  const handlePremiumPayment = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 50000, // Example amount in cents for AUD
          currency: "AUD", // Changed to AUD
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Business Finder
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Homepage</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Business</h1>
          <p className="text-gray-600">Register your business and find more customers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - Now using BusinessForm component */}
          <div className="lg:col-span-2">
            <BusinessForm onSubmit={addBusinessAction} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Premium Package */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-left text-yellow-800">Premium Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="premium" checked={isPremium} onCheckedChange={setIsPremium} />
                  <Label htmlFor="premium" className="text-sm">
                    Activate Premium Package ($50.00/month)
                  </Label>
                </div>

                <div className="space-y-2 text-sm text-yellow-800">
                  <p>✓ Display on homepage</p>
                  <p>✓ Special badge</p>
                  <p>✓ View statistics</p>
                  <p>✓ Priority support</p>
                </div>

                {isPremium && (
                  <Button className="w-full mt-4" onClick={handlePremiumPayment}>
                    Pay Online
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p className="text-left">• All starred fields are mandatory</p>
                <p className="text-left">• Upload high-quality images</p>
                <p className="text-left">• Write a complete and engaging description</p>
                <p className="text-left">• Enter accurate contact information</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
