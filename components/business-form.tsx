"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BusinessDetails } from "@/types/business"

interface BusinessFormProps {
  initialData?: BusinessDetails
  onSubmit: (formData: FormData) => Promise<void>
}

export default function BusinessForm({ initialData, onSubmit }: BusinessFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    website: initialData?.website || "",
    workingHours: initialData?.workingHours || "",
    services: initialData?.services?.join(", ") || "",
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    isPromoted: initialData?.isPromoted || false,
    status: initialData?.status || "pending",
    image: initialData?.image || "/placeholder.svg?height=400&width=600",
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = new FormData()

    // Add all form fields
    if (initialData?.id) {
      form.append("id", initialData.id)
    }
    form.append("name", formData.name)
    form.append("category", formData.category)
    form.append("description", formData.description)
    form.append("address", formData.address)
    form.append("phone", formData.phone)
    form.append("email", formData.email)
    form.append("website", formData.website)
    form.append("workingHours", formData.workingHours)
    form.append("services", formData.services)
    form.append("latitude", formData.latitude.toString())
    form.append("longitude", formData.longitude.toString())
    form.append("isPromoted", formData.isPromoted.toString())
    form.append("status", formData.status)
    form.append("image", formData.image)

    // Add existing data for updates
    if (initialData) {
      form.append("rating", (initialData.rating || 0).toString())
      form.append("reviewCount", (initialData.reviewCount || 0).toString())
      form.append("distance", (initialData.distance || 0).toString())
    }

    await onSubmit(form)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input
                id="workingHours"
                value={formData.workingHours}
                onChange={(e) => handleInputChange("workingHours", e.target.value)}
                placeholder="e.g., Mon-Fri 9:00 AM - 6:00 PM"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Services & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="services">Services (comma-separated)</Label>
              <Textarea
                id="services"
                value={formData.services}
                onChange={(e) => handleInputChange("services", e.target.value)}
                placeholder="e.g., Delivery, Takeout, Dine-in"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange("latitude", Number.parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange("longitude", Number.parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="/placeholder.svg?height=400&width=600"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPromoted"
                checked={formData.isPromoted}
                onCheckedChange={(checked) => handleInputChange("isPromoted", checked)}
              />
              <Label htmlFor="isPromoted">Promoted Business</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update Business" : "Add Business"}
        </Button>
      </div>
    </form>
  )
}
