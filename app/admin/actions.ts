"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBusiness, updateBusiness, deleteBusiness, getBusinessById } from "@/lib/db/businesses"
import type { BusinessDetails } from "@/types/business"

export async function addBusinessAction(formData: FormData) {
  try {
    const latitudeStr = formData.get("latitude") as string
    const longitudeStr = formData.get("longitude") as string

    const latitude = latitudeStr ? Number.parseFloat(latitudeStr) : null
    const longitude = longitudeStr ? Number.parseFloat(longitudeStr) : null

    const data: Omit<
      BusinessDetails,
      "id" | "reviews" | "reviewCount" | "rating" | "distance" | "createdAt" | "updatedAt"
    > = {
      name: formData.get("businessName") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || null,
      website: (formData.get("website") as string) || null,
      workingHours: (formData.get("workingHours") as string) || null,
      services: JSON.parse((formData.get("services") as string) || "[]"),
      images: JSON.parse((formData.get("images") as string) || "[]"),
      latitude: isNaN(latitude as number) ? null : latitude,
      longitude: isNaN(longitude as number) ? null : longitude,
      isPromoted: formData.get("isPromoted") === "true",
      status: (formData.get("status") as BusinessDetails["status"]) || "pending",
      image: "/placeholder.svg?height=400&width=600",
    }

    await addBusiness(data)
    revalidatePath("/admin/businesses")
    revalidatePath("/")
    revalidatePath("/admin") // Revalidate admin dashboard
  } catch (error) {
    console.error("Error adding business:", error)
    throw error
  }

  redirect("/admin/businesses")
}

export async function updateBusinessAction(formData: FormData) {
  try {
    const latitudeStr = formData.get("latitude") as string
    const longitudeStr = formData.get("longitude") as string

    const latitude = latitudeStr ? Number.parseFloat(latitudeStr) : null
    const longitude = longitudeStr ? Number.parseFloat(longitudeStr) : null

    const data: BusinessDetails = {
      id: formData.get("id") as string,
      name: formData.get("businessName") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || null,
      website: (formData.get("website") as string) || null,
      workingHours: (formData.get("workingHours") as string) || null,
      services: JSON.parse((formData.get("services") as string) || "[]"),
      images: JSON.parse((formData.get("images") as string) || "[]"),
      latitude: isNaN(latitude as number) ? null : latitude,
      longitude: isNaN(longitude as number) ? null : longitude,
      isPromoted: formData.get("isPromoted") === "true",
      status: formData.get("status") as BusinessDetails["status"],
      image: formData.get("image") as string,
      rating: Number.parseFloat(formData.get("rating") as string),
      reviewCount: Number.parseInt(formData.get("reviewCount") as string),
      distance: Number.parseFloat((formData.get("distance") as string) || "0"),
      reviews: JSON.parse((formData.get("reviews") as string) || "[]"),
      createdAt: formData.get("createdAt") as string,
    }

    await updateBusiness(data)
    revalidatePath("/admin/businesses")
    revalidatePath(`/admin/businesses/${data.id}/edit`)
    revalidatePath("/")
    revalidatePath(`/business/${data.id}`)
    revalidatePath("/admin") // Revalidate admin dashboard
  } catch (error) {
    console.error("Error updating business:", error)
    throw error
  }

  redirect("/admin/businesses")
}

export async function deleteBusinessAction(formData: FormData) {
  try {
    const id = formData.get("id") as string
    await deleteBusiness(id)
    revalidatePath("/admin/businesses")
    revalidatePath("/")
    revalidatePath("/admin") // Revalidate admin dashboard
  } catch (error) {
    console.error("Error deleting business:", error)
    throw error
  }
}

export async function updateBusinessStatusAction(formData: FormData) {
  const id = formData.get("id") as string
  const status = formData.get("status") as BusinessDetails["status"]

  try {
    const business = await getBusinessById(id)
    if (!business) {
      throw new Error("Business not found")
    }

    const updatedBusiness = {
      ...business,
      status: status,
    }
    await updateBusiness(updatedBusiness)
    revalidatePath("/admin") // Revalidate the admin dashboard to show updated status
    revalidatePath("/admin/businesses") // Revalidate the businesses list
    revalidatePath("/") // Revalidate homepage if status affects visibility
  } catch (error) {
    console.error(`Error updating business status to ${status}:`, error)
    throw error
  }
}
