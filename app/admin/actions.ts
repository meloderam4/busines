"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBusiness, updateBusiness, deleteBusiness } from "@/lib/mock-data"
import type { BusinessDetails } from "@/types/business"

export async function addBusinessAction(formData: FormData) {
  const latitudeStr = formData.get("latitude") as string
  const longitudeStr = formData.get("longitude") as string

  const latitude = latitudeStr ? Number.parseFloat(latitudeStr) : undefined
  const longitude = longitudeStr ? Number.parseFloat(longitudeStr) : undefined

  const data: Omit<BusinessDetails, "id" | "reviews" | "reviewCount" | "rating" | "distance" | "images"> = {
    name: formData.get("businessName") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    website: formData.get("website") as string,
    workingHours: formData.get("workingHours") as string,
    services: JSON.parse(formData.get("services") as string),
    latitude: isNaN(latitude as number) ? undefined : latitude, // Handle NaN
    longitude: isNaN(longitude as number) ? undefined : longitude, // Handle NaN
    isPromoted: formData.get("isPromoted") === "true",
    status: formData.get("status") as BusinessDetails["status"],
    image: "/placeholder.svg?height=400&width=600", // Default placeholder for now
  }

  await addBusiness(data)
  revalidatePath("/admin/businesses")
  revalidatePath("/") // Revalidate homepage to show new businesses
  redirect("/admin/businesses")
}

export async function updateBusinessAction(formData: FormData) {
  const latitudeStr = formData.get("latitude") as string
  const longitudeStr = formData.get("longitude") as string

  const latitude = latitudeStr ? Number.parseFloat(latitudeStr) : undefined
  const longitude = longitudeStr ? Number.parseFloat(longitudeStr) : undefined

  const data: BusinessDetails = {
    id: formData.get("id") as string,
    name: formData.get("businessName") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    website: formData.get("website") as string,
    workingHours: formData.get("workingHours") as string,
    services: JSON.parse(formData.get("services") as string),
    latitude: isNaN(latitude as number) ? undefined : latitude, // Handle NaN
    longitude: isNaN(longitude as number) ? undefined : longitude, // Handle NaN
    isPromoted: formData.get("isPromoted") === "true",
    status: formData.get("status") as BusinessDetails["status"],
    image: formData.get("image") as string, // Use existing image or update
    images: JSON.parse(formData.get("images") as string), // Use existing images or update
    rating: Number.parseFloat(formData.get("rating") as string),
    reviewCount: Number.parseInt(formData.get("reviewCount") as string),
    distance: Number.parseFloat(formData.get("distance") as string),
    reviews: JSON.parse(formData.get("reviews") as string),
  }

  await updateBusiness(data)
  revalidatePath("/admin/businesses")
  revalidatePath(`/admin/businesses/${data.id}/edit`)
  revalidatePath("/") // Revalidate homepage to show updated businesses
  revalidatePath(`/business/${data.id}`) // Revalidate business detail page
  redirect("/admin/businesses")
}

export async function deleteBusinessAction(formData: FormData) {
  const id = formData.get("id") as string
  await deleteBusiness(id)
  revalidatePath("/admin/businesses")
  revalidatePath("/") // Revalidate homepage
}
