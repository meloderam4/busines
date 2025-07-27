"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBusiness, updateBusiness, deleteBusiness } from "@/lib/mock-data"
import type { BusinessDetails } from "@/types/business"

export async function addBusinessAction(formData: FormData) {
  console.log("Adding business with form data:", Object.fromEntries(formData.entries())) // Debug log

  const latitudeStr = formData.get("latitude") as string
  const longitudeStr = formData.get("longitude") as string

  const latitude = latitudeStr ? Number.parseFloat(latitudeStr) : undefined
  const longitude = longitudeStr ? Number.parseFloat(longitudeStr) : undefined

  const servicesStr = formData.get("services") as string
  const services = servicesStr ? JSON.parse(servicesStr) : []

  const data: Omit<BusinessDetails, "id" | "reviews" | "reviewCount" | "rating" | "distance" | "images"> = {
    name: formData.get("businessName") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || "",
    website: (formData.get("website") as string) || "",
    workingHours: (formData.get("workingHours") as string) || "",
    services: services,
    latitude: isNaN(latitude as number) ? undefined : latitude,
    longitude: isNaN(longitude as number) ? undefined : longitude,
    isPromoted: formData.get("isPromoted") === "true",
    status: (formData.get("status") as BusinessDetails["status"]) || "pending",
    image: "/placeholder.svg?height=400&width=600",
  }

  console.log("Processed business data:", data) // Debug log

  const newBusiness = await addBusiness(data)
  console.log("Business added successfully:", newBusiness) // Debug log

  // Revalidate paths to update the UI
  revalidatePath("/admin/businesses")
  revalidatePath("/admin")
  revalidatePath("/")

  // Redirect to the businesses list
  redirect("/admin/businesses")
}

export async function updateBusinessAction(formData: FormData) {
  console.log("Updating business with form data:", Object.fromEntries(formData.entries())) // Debug log

  const latitudeStr = formData.get("latitude") as string
  const longitudeStr = formData.get("longitude") as string

  const latitude = latitudeStr ? Number.parseFloat(latitudeStr) : undefined
  const longitude = longitudeStr ? Number.parseFloat(longitudeStr) : undefined

  const servicesStr = formData.get("services") as string
  const services = servicesStr ? JSON.parse(servicesStr) : []

  const imagesStr = formData.get("images") as string
  const images = imagesStr ? JSON.parse(imagesStr) : []

  const reviewsStr = formData.get("reviews") as string
  const reviews = reviewsStr ? JSON.parse(reviewsStr) : []

  const data: BusinessDetails = {
    id: formData.get("id") as string,
    name: formData.get("businessName") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || "",
    website: (formData.get("website") as string) || "",
    workingHours: (formData.get("workingHours") as string) || "",
    services: services,
    latitude: isNaN(latitude as number) ? undefined : latitude,
    longitude: isNaN(longitude as number) ? undefined : longitude,
    isPromoted: formData.get("isPromoted") === "true",
    status: (formData.get("status") as BusinessDetails["status"]) || "pending",
    image: formData.get("image") as string,
    images: images,
    rating: Number.parseFloat(formData.get("rating") as string) || 0,
    reviewCount: Number.parseInt(formData.get("reviewCount") as string) || 0,
    distance: Number.parseFloat(formData.get("distance") as string) || 0,
    reviews: reviews,
  }

  console.log("Processed update data:", data) // Debug log

  const updatedBusiness = await updateBusiness(data)
  console.log("Business updated successfully:", updatedBusiness) // Debug log

  // Revalidate paths to update the UI
  revalidatePath("/admin/businesses")
  revalidatePath(`/admin/businesses/${data.id}/edit`)
  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath(`/business/${data.id}`)

  // Redirect to the businesses list
  redirect("/admin/businesses")
}

export async function deleteBusinessAction(formData: FormData) {
  const id = formData.get("id") as string
  console.log("Deleting business with id:", id) // Debug log

  const success = await deleteBusiness(id)
  console.log("Business deletion result:", success) // Debug log

  // Revalidate paths to update the UI
  revalidatePath("/admin/businesses")
  revalidatePath("/admin")
  revalidatePath("/")
}
