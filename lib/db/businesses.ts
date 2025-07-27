import { createClient } from "@/lib/supabase/server"
import type { BusinessDetails } from "@/types/business"

export async function getAllBusinesses(): Promise<BusinessDetails[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("businesses").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching businesses:", error)
    return []
  }

  return data.map(transformBusinessData) || []
}

export async function getBusinessById(id: string): Promise<BusinessDetails | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("businesses").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching business:", error)
    return null
  }

  return data ? transformBusinessData(data) : null
}

export async function getBusinessesByCategory(category: string): Promise<BusinessDetails[]> {
  const supabase = createClient()

  let query = supabase.from("businesses").select("*").eq("status", "approved").order("created_at", { ascending: false })

  if (category !== "All") {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching businesses by category:", error)
    return []
  }

  return data.map(transformBusinessData) || []
}

export async function searchBusinesses(query: string): Promise<BusinessDetails[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "approved")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching businesses:", error)
    return []
  }

  return data.map(transformBusinessData) || []
}

export async function addBusiness(
  businessData: Omit<BusinessDetails, "id" | "reviews" | "reviewCount" | "rating" | "distance">,
): Promise<BusinessDetails> {
  const supabase = createClient()

  const insertData = {
    name: businessData.name,
    category: businessData.category,
    description: businessData.description,
    address: businessData.address,
    phone: businessData.phone,
    email: businessData.email || null,
    website: businessData.website || null,
    working_hours: businessData.workingHours || null,
    services: businessData.services || [],
    images: businessData.images || [],
    latitude: businessData.latitude || null,
    longitude: businessData.longitude || null,
    is_promoted: businessData.isPromoted || false,
    status: businessData.status || "pending",
    image: businessData.image || "/placeholder.svg?height=400&width=600",
    rating: 0,
    review_count: 0,
    distance: 0,
  }

  const { data, error } = await supabase.from("businesses").insert(insertData).select().single()

  if (error) {
    console.error("Error adding business:", error)
    throw new Error(`Failed to add business: ${error.message}`)
  }

  return transformBusinessData(data)
}

export async function updateBusiness(businessData: BusinessDetails): Promise<BusinessDetails> {
  const supabase = createClient()

  const updateData = {
    name: businessData.name,
    category: businessData.category,
    description: businessData.description,
    address: businessData.address,
    phone: businessData.phone,
    email: businessData.email || null,
    website: businessData.website || null,
    working_hours: businessData.workingHours || null,
    services: businessData.services || [],
    images: businessData.images || [],
    latitude: businessData.latitude || null,
    longitude: businessData.longitude || null,
    is_promoted: businessData.isPromoted || false,
    status: businessData.status,
    image: businessData.image,
    rating: businessData.rating,
    review_count: businessData.reviewCount,
    distance: businessData.distance,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from("businesses")
    .update(updateData)
    .eq("id", businessData.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating business:", error)
    throw new Error(`Failed to update business: ${error.message}`)
  }

  return transformBusinessData(data)
}

export async function deleteBusiness(id: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase.from("businesses").delete().eq("id", id)

  if (error) {
    console.error("Error deleting business:", error)
    return false
  }

  return true
}

// Transform database row to BusinessDetails interface
function transformBusinessData(data: any): BusinessDetails {
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    description: data.description,
    address: data.address,
    phone: data.phone,
    email: data.email,
    website: data.website,
    workingHours: data.working_hours,
    services: data.services || [],
    images: data.images || [],
    latitude: data.latitude,
    longitude: data.longitude,
    isPromoted: data.is_promoted || false,
    status: data.status,
    image: data.image,
    rating: data.rating || 0,
    reviewCount: data.review_count || 0,
    distance: data.distance || 0,
    reviews: [], // Reviews will be loaded separately if needed
  }
}
