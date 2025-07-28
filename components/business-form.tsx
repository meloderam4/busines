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

const categories = [
  { value: "restaurant", label: "Restaurant" },
  { value: "grocery", label: "Grocery Store" },
  { value: "automotive", label: "Automotive" },
  { value: "healthcare", label: "Healthcare" },
  { value: "beauty", label: "Beauty & Spa" },
  { value: "fitness", label: "Fitness" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "services", label: "Services" },
]

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export default function BusinessForm({ initialData, onSubmit }: BusinessFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [category, setCategory] = useState(initialData?.category || "")
  const [status, setStatus] = useState(initialData?.status || "pending")
  const [isPromoted, setIsPromoted] = useState(initialData?.isPromoted || false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = new FormData(e.currentTarget)

    // Add the select field values to formData
    form.set("category", category)
    form.set("status", status)
    form.set("isPromoted", isPromoted.toString())

    if (initialData?.id) {
      form.append("id", initialData.id)
      form.append("rating", initialData.rating?.toString() || "0")
      form.append("reviewCount", initialData.reviewCount?.toString() || "0")
      form.append("distance", initialData.distance?.toString() || "0")
    }

    await onSubmit(form)
    setIsSubmitting(false)
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
                name="name"
                defaultValue={initialData?.name}
                required
                placeholder="Enter business name"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={initialData?.description}
                placeholder="Describe your business"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                name="address"
                defaultValue={initialData?.address}
                required
                placeholder="Enter full address"
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" defaultValue={initialData?.phone} placeholder="+1-555-0123" />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={initialData?.email}
                placeholder="contact@business.com"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                defaultValue={initialData?.website}
                placeholder="https://www.business.com"
              />
            </div>

            <div>
              <Label htmlFor="workingHours">Working Hours</Label>
              <Textarea
                id="workingHours"
                name="workingHours"
                defaultValue={initialData?.workingHours}
                placeholder="Mon-Fri: 9:00 AM - 6:00 PM"
                rows={2}
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
                name="services"
                defaultValue={initialData?.services?.join(", ")}
                placeholder="Service 1, Service 2, Service 3"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  defaultValue={initialData?.latitude}
                  placeholder="40.7128"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  defaultValue={initialData?.longitude}
                  placeholder="-74.0060"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                defaultValue={initialData?.image}
                placeholder="https://example.com/image.jpg"
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
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
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
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="isPromoted" checked={isPromoted} onCheckedChange={setIsPromoted} />
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
