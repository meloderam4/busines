"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { BusinessDetails } from "@/types/business"

interface BusinessFormProps {
  initialData?: BusinessDetails
  onSubmit: (formData: FormData) => Promise<void>
}

const categories = [
  "Restaurant & Cafe",
  "Shopping & Retail",
  "Automotive Services",
  "Health & Beauty",
  "Professional Services",
  "Education",
  "Entertainment",
  "Real Estate",
  "Technology",
  "Other",
]

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export default function BusinessForm({ initialData, onSubmit }: BusinessFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(initialData?.category || "")
  const [selectedStatus, setSelectedStatus] = useState(initialData?.status || "pending")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    // Add hidden fields for select values
    formData.set("category", selectedCategory)
    formData.set("status", selectedStatus)

    if (initialData?.id) {
      formData.set("id", initialData.id)
      formData.set("rating", initialData.rating.toString())
      formData.set("reviewCount", initialData.reviewCount.toString())
      formData.set("distance", initialData.distance.toString())
    }

    await onSubmit(formData)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Business Name *</Label>
          <Input id="name" name="name" defaultValue={initialData?.name} required placeholder="Enter business name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
            <SelectTrigger>
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description}
            placeholder="Describe your business"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            name="address"
            defaultValue={initialData?.address}
            required
            placeholder="Enter business address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={initialData?.phone}
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={initialData?.email}
            placeholder="Enter email address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            defaultValue={initialData?.website}
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workingHours">Working Hours</Label>
          <Input
            id="workingHours"
            name="workingHours"
            defaultValue={initialData?.workingHours}
            placeholder="Mon-Fri: 9AM-6PM"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="services">Services (comma-separated)</Label>
          <Input
            id="services"
            name="services"
            defaultValue={initialData?.services?.join(", ")}
            placeholder="Service 1, Service 2, Service 3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            defaultValue={initialData?.latitude || ""}
            placeholder="43.6532"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            defaultValue={initialData?.longitude || ""}
            placeholder="-79.3832"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            type="url"
            defaultValue={initialData?.image}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
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
          <Checkbox id="isPromoted" name="isPromoted" defaultChecked={initialData?.isPromoted} />
          <Label htmlFor="isPromoted">Promoted Business</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update Business" : "Add Business"}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
