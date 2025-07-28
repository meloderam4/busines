"use server"

import { redirect } from "next/navigation"
import { addBusinessServer, updateBusinessServer, deleteBusinessServer } from "@/lib/db/server-businesses"
import type { BusinessDetails } from "@/types/business"

export async function addBusinessAction(formData: FormData) {
  try {
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
      latitude: Number.parseFloat(formData.get("latitude") as string) || 0,
      longitude: Number.parseFloat(formData.get("longitude") as string) || 0,
      isPromoted: formData.get("isPromoted") === "true",
      status: (formData.get("status") as string) || "pending",
      image: (formData.get("image") as string) || "/placeholder.svg?height=400&width=600",
    }

    console.log("Adding business:", businessData)

    const result = await addBusinessServer(businessData)
    console.log("Business added successfully:", result)
  } catch (error) {
    console.error("Error in addBusinessAction:", error)
    throw error
  }

  redirect("/admin/businesses")
}

export async function updateBusinessAction(formData: FormData) {
  try {
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
      images: [],
      latitude: Number.parseFloat(formData.get("latitude") as string) || 0,
      longitude: Number.parseFloat(formData.get("longitude") as string) || 0,
      isPromoted: formData.get("isPromoted") === "true",
      status: (formData.get("status") as string) || "pending",
      image: (formData.get("image") as string) || "/placeholder.svg?height=400&width=600",
      rating: Number.parseFloat(formData.get("rating") as string) || 0,
      reviewCount: Number.parseInt(formData.get("reviewCount") as string) || 0,
      distance: Number.parseFloat(formData.get("distance") as string) || 0,
      reviews: [],
    }

    console.log("Updating business:", businessData)

    const result = await updateBusinessServer(businessData)
    console.log("Business updated successfully:", result)
  } catch (error) {
    console.error("Error in updateBusinessAction:", error)
    throw error
  }

  redirect("/admin/businesses")
}

export async function deleteBusinessAction(id: string) {
  try {
    console.log("Deleting business:", id)

    const result = await deleteBusinessServer(id)

    if (!result) {
      throw new Error("Failed to delete business")
    }

    console.log("Business deleted successfully")
  } catch (error) {
    console.error("Error in deleteBusinessAction:", error)
    throw error
  }

  redirect("/admin/businesses")
}
