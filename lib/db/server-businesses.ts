import { createClient } from "@/lib/supabase/server"
import type { BusinessDetails } from "@/types/business"

export async function getAllBusinessesServer(): Promise<BusinessDetails[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("businesses").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching businesses:", error)
    return []
  }

  return data.map(transformBusinessFromDB)
}

export async function getBusinessByIdServer(id: string): Promise<BusinessDetails | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("businesses").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching business:", error)
    return null
  }

  return transformBusinessFromDB(data)
}

export async function addBusinessServer(
  businessData: Omit<BusinessDetails, "id" | "reviews" | "reviewCount" | "rating" | "distance" | "images">,
): Promise<BusinessDetails> {
  const supabase = await createClient()

  const dbData = {
    name: businessData.name,
    category: businessData.category,
    description: businessData.description,
    address: businessData.address,
    phone: businessData.phone,
    email: businessData.email || "",
    website: businessData.website || "",
    working_hours: businessData.workingHours || "",
    services: businessData.services || [],
    latitude: businessData.latitude,
    longitude: businessData.longitude,
    is_promoted: businessData.isPromoted || false,
    status: businessData.status || "pending",
    image: businessData.image || "/placeholder.svg?height=400&width=600",
    rating: 0,
    review_count: 0,
    distance: 0,
  }

  const { data, error } = await supabase.from("businesses").insert([dbData]).select().single()

  if (error) {
    console.error("Error adding business:", error)
    throw new Error(`Failed to add business: ${error.message}`)
  }

  return transformBusinessFromDB(data)
}

export async function updateBusinessServer(businessData: BusinessDetails): Promise<BusinessDetails> {
  const supabase = await createClient()

  const dbData = {
    name: businessData.name,
    category: businessData.category,
    description: businessData.description,
    address: businessData.address,
    phone: businessData.phone,
    email: businessData.email || "",
    website: businessData.website || "",
    working_hours: businessData.workingHours || "",
    services: businessData.services || [],
    latitude: businessData.latitude,
    longitude: businessData.longitude,
    is_promoted: businessData.isPromoted || false,
    status: businessData.status || "pending",
    image: businessData.image,
    rating: businessData.rating || 0,
    review_count: businessData.reviewCount || 0,
    distance: businessData.distance || 0,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("businesses").update(dbData).eq("id", businessData.id).select().single()

  if (error) {
    console.error("Error updating business:", error)
    throw new Error(`Failed to update business: ${error.message}`)
  }

  return transformBusinessFromDB(data)
}

export async function deleteBusinessServer(id: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase.from("businesses").delete().eq("id", id)

  if (error) {
    console.error("Error deleting business:", error)
    return false
  }

  return true
}

// Transform database row to BusinessDetails interface
function transformBusinessFromDB(data: any): BusinessDetails {
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    description: data.description,
    address: data.address,
    phone: data.phone,
    email: data.email || "",
    website: data.website || "",
    workingHours: data.working_hours || "",
    services: data.services || [],
    images: data.images || [],
    latitude: data.latitude,
    longitude: data.longitude,
    isPromoted: data.is_promoted || false,
    status: data.status || "pending",
    image: data.image || "/placeholder.svg?height=400&width=600",
    rating: data.rating || 0,
    reviewCount: data.review_count || 0,
    distance: data.distance || 0,
    reviews: [], // Reviews will be loaded separately when needed
  }
}
