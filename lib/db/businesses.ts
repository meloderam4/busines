import { createClient } from "@/lib/supabase/server"
import type { BusinessDetails } from "@/types/business"

export async function getBusinesses(filters?: {
  query?: string
  category?: string
  isPromoted?: boolean
  status?: string
}) {
  try {
    const supabase = await createClient()

    let query = supabase.from("businesses").select("*").order("created_at", { ascending: false })

    if (filters?.query) {
      query = query.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%`)
    }

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }

    if (filters?.isPromoted !== undefined) {
      query = query.eq("is_promoted", filters.isPromoted)
    }

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching businesses:", error)
      // Return empty array if table doesn't exist or other errors
      return []
    }

    return (
      data?.map((business) => ({
        id: business.id,
        name: business.name,
        category: business.category,
        description: business.description,
        address: business.address,
        phone: business.phone,
        email: business.email,
        website: business.website,
        workingHours: business.working_hours,
        services: business.services || [],
        images: business.images || [],
        latitude: business.latitude,
        longitude: business.longitude,
        isPromoted: business.is_promoted,
        status: business.status,
        image: business.image || "/placeholder.svg?height=400&width=600",
        rating: business.rating || 0,
        reviewCount: business.review_count || 0,
        distance: 0, // Calculate based on user location if needed
        reviews: [], // Load separately if needed
        createdAt: business.created_at,
        updatedAt: business.updated_at,
      })) || []
    )
  } catch (error) {
    console.error("Database connection error:", error)
    return []
  }
}

export async function getBusinessById(id: string): Promise<BusinessDetails | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("businesses").select("*").eq("id", id).single()

    if (error || !data) {
      console.error("Error fetching business:", error)
      return null
    }

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
      isPromoted: data.is_promoted,
      status: data.status,
      image: data.image || "/placeholder.svg?height=400&width=600",
      rating: data.rating || 0,
      reviewCount: data.review_count || 0,
      distance: 0,
      reviews: [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function addBusiness(
  businessData: Omit<
    BusinessDetails,
    "id" | "reviews" | "reviewCount" | "rating" | "distance" | "createdAt" | "updatedAt"
  >,
) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("businesses")
      .insert({
        name: businessData.name,
        category: businessData.category,
        description: businessData.description,
        address: businessData.address,
        phone: businessData.phone,
        email: businessData.email,
        website: businessData.website,
        working_hours: businessData.workingHours,
        services: businessData.services,
        images: businessData.images,
        latitude: businessData.latitude,
        longitude: businessData.longitude,
        is_promoted: businessData.isPromoted,
        status: businessData.status,
        image: businessData.image,
        rating: 0,
        review_count: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding business:", error)
      throw new Error("Failed to add business")
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    throw new Error("Failed to add business")
  }
}

export async function updateBusiness(businessData: BusinessDetails) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("businesses")
      .update({
        name: businessData.name,
        category: businessData.category,
        description: businessData.description,
        address: businessData.address,
        phone: businessData.phone,
        email: businessData.email,
        website: businessData.website,
        working_hours: businessData.workingHours,
        services: businessData.services,
        images: businessData.images,
        latitude: businessData.latitude,
        longitude: businessData.longitude,
        is_promoted: businessData.isPromoted,
        status: businessData.status,
        image: businessData.image,
        rating: businessData.rating,
        review_count: businessData.reviewCount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", businessData.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating business:", error)
      throw new Error("Failed to update business")
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    throw new Error("Failed to update business")
  }
}

export async function deleteBusiness(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("businesses").delete().eq("id", id)

    if (error) {
      console.error("Error deleting business:", error)
      throw new Error("Failed to delete business")
    }

    return true
  } catch (error) {
    console.error("Database connection error:", error)
    throw new Error("Failed to delete business")
  }
}
