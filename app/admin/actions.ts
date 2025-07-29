"use server"

import { redirect } from "next/navigation"
import { addBusinessServer, updateBusinessServer, deleteBusinessServer } from "@/lib/db/server-businesses"
import type { BusinessDetails } from "@/types/business"

export async function addBusinessAction(formData: FormData) {
  console.log("Adding business via server action...")

  const businessData = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    website: formData.get("website") as string,
    workingHours: formData.get("workingHours") as string,
    services: formData.get("services") ? (formData.get("services") as string).split(",").map((s) => s.trim()) : [],
    latitude: formData.get("latitude") ? Number.parseFloat(formData.get("latitude") as string) : null,
    longitude: formData.get("longitude") ? Number.parseFloat(formData.get("longitude") as string) : null,
    isPromoted: formData.get("isPromoted") === "on",
    status: (formData.get("status") as string) || "pending",
    image: (formData.get("image") as string) || "/placeholder.svg?height=400&width=600",
  }

  try {
    const result = await addBusinessServer(businessData)
    console.log("Business added successfully:", result.name)
    redirect("/admin/businesses")
  } catch (error) {
    console.error("Error in addBusinessAction:", error)
    throw error
  }
}

export async function updateBusinessAction(formData: FormData) {
  console.log("Updating business via server action...")

  const businessData: BusinessDetails = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    website: formData.get("website") as string,
    workingHours: formData.get("workingHours") as string,
    services: formData.get("services") ? (formData.get("services") as string).split(",").map((s) => s.trim()) : [],
    latitude: formData.get("latitude") ? Number.parseFloat(formData.get("latitude") as string) : null,
    longitude: formData.get("longitude") ? Number.parseFloat(formData.get("longitude") as string) : null,
    isPromoted: formData.get("isPromoted") === "on",
    status: (formData.get("status") as string) || "pending",
    image: (formData.get("image") as string) || "/placeholder.svg?height=400&width=600",
    rating: Number.parseFloat(formData.get("rating") as string) || 0,
    reviewCount: Number.parseInt(formData.get("reviewCount") as string) || 0,
    distance: Number.parseFloat(formData.get("distance") as string) || 0,
    images: [],
    reviews: [],
  }

  try {
    const result = await updateBusinessServer(businessData)
    console.log("Business updated successfully:", result.name)
    redirect("/admin/businesses")
  } catch (error) {
    console.error("Error in updateBusinessAction:", error)
    throw error
  }
}

export async function deleteBusinessAction(id: string) {
  console.log("Deleting business via server action:", id)

  try {
    const success = await deleteBusinessServer(id)
    if (success) {
      console.log("Business deleted successfully")
    } else {
      console.error("Failed to delete business")
    }
    redirect("/admin/businesses")
  } catch (error) {
    console.error("Error in deleteBusinessAction:", error)
    throw error
  }
}
