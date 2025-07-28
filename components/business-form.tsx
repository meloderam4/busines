"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Upload, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BusinessDetails } from "@/types/business"

// Extend Window interface to include google
declare global {
  interface Window {
    google: any
  }
}

interface BusinessFormProps {
  initialData?: BusinessDetails
  onSubmit: (formData: FormData) => Promise<void>
}

const categories = [
  { value: "restaurant", label: "Restaurant" },
  { value: "grocery", label: "Grocery Store" },
  { value: "automotive", label: "Automotive" },
  { value: "healthcare", label: "Healthcare" },
  { value: "beauty", label: "Beauty & Spa" },
  { value: "retail", label: "Retail" },
  { value: "services", label: "Services" },
]

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export default function BusinessForm({ initialData, onSubmit }: BusinessFormProps) {
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [category, setCategory] = useState(initialData?.category || "")
  const [status, setStatus] = useState(initialData?.status || "pending")
  const [isPromoted, setIsPromoted] = useState(initialData?.isPromoted || false)

  const [formData, setFormData] = useState({
    businessName: initialData?.name || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    website: initialData?.website || "",
    workingHours: initialData?.workingHours || "",
    services: initialData?.services || [],
    images: initialData?.images || [],
    latitude: initialData?.latitude || null,
    longitude: initialData?.longitude || null,
  })

  useEffect(() => {
    if (addressInputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "au" },
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

  const handleAddService = (service: string) => {
    if (service.trim() && !formData.services.includes(service.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service.trim()],
      }))
    }
  }

  const handleRemoveService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const form = e.currentTarget as HTMLFormElement
      const data = new FormData(form)

      // Manually set all the form data to ensure it's properly included
      data.set("businessName", formData.businessName)
      data.set("category", category)
      data.set("description", formData.description)
      data.set("address", formData.address)
      data.set("phone", formData.phone)
      data.set("email", formData.email || "")
      data.set("website", formData.website || "")
      data.set("workingHours", formData.workingHours || "")
      data.set("services", JSON.stringify(formData.services))
      data.set("images", JSON.stringify(formData.images))
      data.set("latitude", formData.latitude?.toString() || "")
      data.set("longitude", formData.longitude?.toString() || "")
      data.set("isPromoted", isPromoted.toString())
      data.set("status", status)

      // For existing business, also include original data
      if (initialData) {
        data.set("id", initialData.id)
        data.set("rating", initialData.rating.toString())
        data.set("reviewCount", initialData.reviewCount.toString())
        data.set("distance", initialData.distance.toString())
        data.set("reviews", JSON.stringify(initialData.reviews))
        data.set("image", initialData.image)
      }

      console.log("Submitting form data:", Object.fromEntries(data.entries())) // Debug log

      // Call the server action - redirect errors are expected and handled by Next.js
      await onSubmit(data)

      // If we reach here, there was no redirect (shouldn't happen in normal flow)
      console.log("Form submitted successfully without redirect")
    } catch (err: any) {
      console.error("Form submission error:", err)

      // Check if this is a redirect error (which is expected)
      if (err.message && err.message.includes("Redirect")) {
        // This is expected behavior - the redirect is working
        console.log("Redirect successful")
        return
      }

      // Only set error for actual errors, not redirects
      setError(err.message || "An error occurred while saving the business.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
                name="businessName"
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
              <Select value={category} onValueChange={setCategory} name="category" required>
                <SelectTrigger className="text-left">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="category" value={category} />
            </div>

            <div>
              <Label htmlFor="description" className="text-left block mb-2">
                Description *
              </Label>
              <Textarea
                id="description"
                name="description"
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
                name="address"
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
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+61 400 000 000"
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
                  name="email"
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
                  name="website"
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
                  name="workingHours"
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
                value={formData.services.join(", ")}
                onChange={(e) => handleAddService(e.target.value)}
                placeholder="Enter new service"
                className="text-left"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddService(e.target.value))}
              />
              <Button type="button" onClick={() => handleAddService(formData.services.join(", "))}>
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
            {formData.images && formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {formData.images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`Business image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admin-specific fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-left">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status" className="text-left block mb-2">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus} name="status">
                <SelectTrigger className="text-left">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="status" value={status} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isPromoted" className="text-left">
                Promote Business
              </Label>
              <Checkbox id="isPromoted" checked={isPromoted} onCheckedChange={setIsPromoted} name="isPromoted" />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude?.toString() || ""}
                  placeholder="40.7128"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude?.toString() || ""}
                  placeholder="-74.0060"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image URL */}
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            type="url"
            value={formData.images[0] || ""}
            placeholder="/images/business.jpg"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Saving..." : initialData ? "Update Business" : "Add Business"}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
