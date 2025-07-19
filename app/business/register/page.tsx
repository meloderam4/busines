"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Upload, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Extend Window interface to include google
declare global {
  interface Window {
    google: any
  }
}

export default function BusinessRegisterPage() {
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    workingHours: "",
    services: [] as string[],
    images: [] as string[],
    latitude: null as number | null,
    longitude: null as number | null,
  })
  const [newService, setNewService] = useState("")
  const [isPremium, setIsPremium] = useState(false)

  const categories = [
    "Restaurant & Cafe",
    "Beauty & Salon",
    "Shopping & Retail",
    "Automotive Services",
    "Medical & Health",
    "Educational",
    "Sports",
    "Real Estate",
    "Transportation",
    "Other",
  ]

  useEffect(() => {
    if (addressInputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "au" }, // Restrict to Australia for better results based on provided businesses
      })

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          setFormData((prev) => ({
            ...prev,
            address: place.formatted_address || "",
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          }))
        } else {
          setFormData((prev) => ({
            ...prev,
            address: addressInputRef.current?.value || "",
            latitude: null,
            longitude: null,
          }))
        }
      })
    }
  }, [])

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }))
      setNewService("")
    }
  }

  const handleRemoveService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit the form data to your backend
    console.log("Submitting business registration:", formData)
    // You might want to redirect or show a success message here
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
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName" className="text-left block mb-2">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Enter your business name"
                      className="text-left"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-left block mb-2">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="text-left">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-left block mb-2">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide a full description of your business"
                      className="text-left min-h-[100px]"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-left block mb-2">
                      Full Address *
                    </Label>
                    <Input
                      id="address"
                      ref={addressInputRef}
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your full business address"
                      className="text-left"
                      required
                    />
                    {formData.latitude && formData.longitude && (
                      <p className="text-xs text-gray-500 mt-1 text-left">
                        Coordinates: {formData.latitude}, {formData.longitude}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-left block mb-2">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (123) 456-7890"
                        className="text-left"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-left block mb-2">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="info@business.com"
                        className="text-left"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website" className="text-left block mb-2">
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                        placeholder="https://www.business.com"
                        className="text-left"
                      />
                    </div>

                    <div>
                      <Label htmlFor="workingHours" className="text-left block mb-2">
                        Working Hours
                      </Label>
                      <Input
                        id="workingHours"
                        value={formData.workingHours}
                        onChange={(e) => setFormData((prev) => ({ ...prev, workingHours: e.target.value }))}
                        placeholder="Mon-Fri 9 AM - 6 PM"
                        className="text-left"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      placeholder="Enter new service"
                      className="text-left"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddService())}
                    />
                    <Button type="button" onClick={handleAddService}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {service}
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Business Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Upload your business images</p>
                    <p className="text-sm text-gray-500 mb-4">Max 5 images, 5MB each</p>
                    <Button type="button" variant="outline">
                      Select Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                Register Business
              </Button>
            </form>
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
