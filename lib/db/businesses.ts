import { createClient } from "@/lib/supabase/client"
import type { BusinessDetails } from "@/types/business"

// Function to validate UUID format
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export async function getAllBusinesses(): Promise<BusinessDetails[]> {
  try {
    const supabase = createClient()
    console.log("Fetching businesses from database...")

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Fetched businesses:", data?.length || 0)

    if (!data || data.length === 0) {
      console.log("No businesses found in database")
      return []
    }

    return data.map(transformBusinessFromDB)
  } catch (error) {
    console.error("Error in getAllBusinesses:", error)
    // Return fallback data if database fails
    return getFallbackBusinesses()
  }
}

export async function getBusinessById(id: string): Promise<BusinessDetails | null> {
  try {
    // Validate UUID format before making database call
    if (!isValidUUID(id)) {
      console.error("Invalid UUID format:", id)
      throw new Error("Invalid business ID format")
    }

    const supabase = createClient()
    console.log("Fetching business by ID:", id)

    const { data, error } = await supabase.from("businesses").select("*").eq("id", id).single()

    if (error) {
      console.error("Supabase error:", error)
      if (error.code === "PGRST116") {
        // No rows returned
        return null
      }
      throw error
    }

    return transformBusinessFromDB(data)
  } catch (error) {
    console.error("Error in getBusinessById:", error)
    throw error
  }
}

export async function getBusinessesByCategory(category: string): Promise<BusinessDetails[]> {
  try {
    const supabase = createClient()

    if (category === "All") {
      return getAllBusinesses()
    }

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("category", category)
      .eq("status", "approved")
      .order("rating", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return []
    }

    return data.map(transformBusinessFromDB)
  } catch (error) {
    console.error("Error in getBusinessesByCategory:", error)
    return []
  }
}

export async function searchBusinesses(query: string): Promise<BusinessDetails[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .eq("status", "approved")
      .order("rating", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return []
    }

    return data.map(transformBusinessFromDB)
  } catch (error) {
    console.error("Error in searchBusinesses:", error)
    return []
  }
}

export async function addBusiness(
  businessData: Omit<BusinessDetails, "id" | "reviews" | "reviewCount" | "rating" | "distance" | "images">,
): Promise<BusinessDetails> {
  const supabase = createClient()

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

export async function updateBusiness(businessData: BusinessDetails): Promise<BusinessDetails> {
  const supabase = createClient()

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

// Fallback data in case database is not available
function getFallbackBusinesses(): BusinessDetails[] {
  return [
    {
      id: "fallback-1",
      name: "Paradise Market",
      category: "Restaurant & Cafe",
      description: "Fresh groceries and daily essentials with competitive prices",
      address: "123 Main Street, Toronto, ON",
      phone: "+1 (416) 555-0123",
      email: "info@paradisemarket.com",
      website: "https://paradisemarket.com",
      workingHours: "Mon-Sat: 9AM-9PM, Sun: 10AM-7PM",
      services: ["Grocery", "Fresh Produce", "Persian Spices", "Halal Meat"],
      images: [],
      latitude: 43.6532,
      longitude: -79.3832,
      isPromoted: true,
      status: "approved",
      image: "/images/paradise-market.png",
      rating: 4.5,
      reviewCount: 127,
      distance: 0,
      reviews: [],
    },
    {
      id: "fallback-2",
      name: "Toranj Restaurant",
      category: "Restaurant & Cafe",
      description: "Fine Persian dining experience with traditional and modern dishes",
      address: "456 Queen Street, Toronto, ON",
      phone: "+1 (416) 555-0456",
      email: "reservations@toranjrestaurant.com",
      website: "https://toranjrestaurant.com",
      workingHours: "Daily: 5PM-11PM",
      services: ["Fine Dining", "Persian Cuisine", "Catering", "Private Events"],
      images: [],
      latitude: 43.6426,
      longitude: -79.3871,
      isPromoted: true,
      status: "approved",
      image: "/images/toranj-restaurant.png",
      rating: 4.8,
      reviewCount: 203,
      distance: 0,
      reviews: [],
    },
    {
      id: "fallback-3",
      name: "Farah Beauty Salon",
      category: "Health & Beauty",
      description: "Professional beauty services with Persian hospitality",
      address: "789 Yonge Street, Toronto, ON",
      phone: "+1 (416) 555-0789",
      email: "appointments@farahbeauty.com",
      website: "https://farahbeauty.com",
      workingHours: "Tue-Sat: 10AM-7PM",
      services: ["Hair Styling", "Makeup", "Eyebrow Threading", "Facial Treatments"],
      images: [],
      latitude: 43.6629,
      longitude: -79.3957,
      isPromoted: false,
      status: "approved",
      image: "/images/farah-restaurant.png",
      rating: 4.3,
      reviewCount: 89,
      distance: 0,
      reviews: [],
    },
    {
      id: "fallback-4",
      name: "Iraj Auto Repair",
      category: "Automotive Services",
      description: "Trusted automotive repair and maintenance services",
      address: "321 Dundas Street, Toronto, ON",
      phone: "+1 (416) 555-0321",
      email: "service@irajauto.com",
      website: "https://irajauto.com",
      workingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
      services: ["Oil Change", "Brake Repair", "Engine Diagnostics", "Tire Service"],
      images: [],
      latitude: 43.6505,
      longitude: -79.3493,
      isPromoted: false,
      status: "approved",
      image: "/images/iraj-auto-repair.png",
      rating: 4.6,
      reviewCount: 156,
      distance: 0,
      reviews: [],
    },
  ]
}
