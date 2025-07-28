"use server"

import { redirect } from "next/navigation"
import { addBusinessServer, updateBusinessServer, deleteBusinessServer } from "@/lib/db/server-businesses"
import type { BusinessDetails } from "@/types/business"

export async function addBusinessAction(formData: FormData) {
  console.log("Adding business with form data:", Object.fromEntries(formData))

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
      latitude: formData.get("latitude") ? Number.parseFloat(formData.get("latitude") as string) : undefined,
      longitude: formData.get("longitude") ? Number.parseFloat(formData.get("longitude") as string) : undefined,
      isPromoted: formData.get("isPromoted") === "true",
      status: (formData.get("status") as string) || "pending",
      image: (formData.get("image") as string) || "/placeholder.svg?height=400&width=600",
    }

    console.log("Processed business data:", businessData)

    const result = await addBusinessServer(businessData)
    console.log("Business added successfully:", result)
  } catch (error) {
    console.error("Error in addBusinessAction:", error)
    throw error
  }

  redirect("/admin/businesses")
}

export async function updateBusinessAction(formData: FormData) {
  console.log("Updating business with form data:", Object.fromEntries(formData))

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
      latitude: formData.get("latitude") ? Number.parseFloat(formData.get("latitude") as string) : undefined,
      longitude: formData.get("longitude") ? Number.parseFloat(formData.get("longitude") as string) : undefined,
      isPromoted: formData.get("isPromoted") === "true",
      status: (formData.get("status") as string) || "pending",
      image: (formData.get("image") as string) || "/placeholder.svg?height=400&width=600",
      rating: Number.parseFloat(formData.get("rating") as string) || 0,
      reviewCount: Number.parseInt(formData.get("reviewCount") as string) || 0,
      distance: Number.parseFloat(formData.get("distance") as string) || 0,
      reviews: [],
    }

    console.log("Processed business data:", businessData)

    const result = await updateBusinessServer(businessData)
    console.log("Business updated successfully:", result)
  } catch (error) {
    console.error("Error in updateBusinessAction:", error)
    throw error
  }

  redirect("/admin/businesses")
}

export async function deleteBusinessAction(id: string) {
  console.log("Deleting business with id:", id)

  try {
    const result = await deleteBusinessServer(id)
    console.log("Business deleted successfully:", result)
  } catch (error) {
    console.error("Error in deleteBusinessAction:", error)
    throw error
  }

  redirect("/admin/businesses")
}
