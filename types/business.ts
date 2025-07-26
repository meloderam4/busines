export type BusinessStatus = "pending" | "approved" | "rejected"

export interface BusinessDetails {
  id: string
  name: string
  category: string
  description: string
  address: string
  phone: string
  email?: string | null
  website?: string | null
  workingHours?: string | null
  services: string[] // JSONB in DB
  images: string[] // JSONB in DB
  latitude?: number | null
  longitude?: number | null
  isPromoted: boolean
  status: BusinessStatus
  image: string // Main image URL
  rating: number
  reviewCount: number
  distance?: number // This is a calculated field, not stored in DB
  reviews: any[] // Placeholder for now, will be detailed later
  createdAt: string // From DB
  updatedAt?: string
}

export interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  avatar: string
}

export interface Business extends Omit<BusinessDetails, "reviews"> {
  // Business is the same as BusinessDetails but without reviews array
}
