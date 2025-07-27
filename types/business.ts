// This file defines the interfaces for Business and Review objects.
// It's good practice to keep type definitions separate for clarity and reusability.

export interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  avatar: string
}

export interface Business {
  id: string
  name: string
  category: string
  description: string
  address: string
  rating: number
  reviewCount: number
  distance: number
  image: string
  isPromoted: boolean
  services: string[]
  phone?: string
  website?: string
  workingHours?: string
  latitude?: number
  longitude?: number
  status: "pending" | "approved" | "rejected" // Added status field
}

export interface BusinessDetails extends Business {
  images: string[]
  reviews: Review[]
}
