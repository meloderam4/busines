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
import { Switch } from "@/components/ui/switch"
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

export default function BusinessForm({ initialData, onSubmit }: BusinessFormProps) {
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<
    Omit<BusinessDetails, "id" | "reviews" | "reviewCount" | "rating" | "distance">
  >({
    businessName: initialData?.name || "",
    category: initialData?.category || "",
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
    isPromoted: initialData?.isPromoted || false,
    status: initialData?.status || "pending",
  })
  const [newService, setNewService] = useState("")

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
        componentRestrictions: { country: "au" }, // Restrict to Australia for better results
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)

    // Append services and images as JSON strings
    data.set("services", JSON.stringify(formData.services))
    data.set("images", JSON.stringify(formData.images))
    data.set("latitude", formData.latitude?.toString() || "")
    data.set("longitude", formData.longitude?.toString() || "")
    data.set("isPromoted", formData.isPromoted.toString())
    data.set("status", formData.status)

    // For existing business, also include original rating, reviewCount, reviews, distance
    if (initialData) {
      data.set("id", initialData.id)
      data.set("rating", initialData.rating.toString())
      data.set("reviewCount", initialData.reviewCount.toString())
      data.set("distance", initialData.distance.toString())
      data.set("reviews", JSON.stringify(initialData.reviews))
      data.set("image", initialData.image) // Keep existing image
    }

    await onSubmit(data)
  }

  return (
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
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              name="category"
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
            <input type="hidden" name="latitude" value={formData.latitude || ""} />
            <input type="hidden" name="longitude" value={formData.longitude || ""} />
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
                <button type="button" onClick={() => handleRemoveService(service)} className="ml-1 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <input type="hidden" name="services" value={JSON.stringify(formData.services)} />
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
          {/* Display existing images if any */}
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
          <input type="hidden" name="images" value={JSON.stringify(formData.images)} />
        </CardContent>
      </Card>

      {/* Admin-specific fields (only for edit/new business in admin panel) */}
      {initialData && ( // Only show these fields if initialData is provided (i.e., in admin edit mode)
        <Card>
          <CardHeader>
            <CardTitle className="text-left">Admin Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status" className="text-left block mb-2">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value as BusinessDetails["status"] }))
                }
                name="status"
              >
                <SelectTrigger className="text-left">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isPromoted" className="text-left">
                Promote Business
              </Label>
              <Switch
                id="isPromoted"
                checked={formData.isPromoted}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPromoted: checked }))}
                name="isPromoted"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Button type="submit" size="lg" className="w-full">
        {initialData ? "Update Business" : "Register Business"}
      </Button>
    </form>
  )
}
