import type { BusinessDetails, Review } from "@/types/business"

// Define a common set of mock reviews for demonstration
const commonReviews: Review[] = [
  {
    id: "rev1",
    userName: "Ahmad Mohammadi",
    rating: 5,
    comment:
      "The food was incredibly delicious. Very cozy atmosphere and excellent service. I will definitely come again.",
    date: "2024/11/05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "rev2",
    userName: "Fatemeh Ahmadi",
    rating: 4,
    comment: "The food quality was good, but the waiting time was a bit long. Overall, I'm satisfied.",
    date: "2024/11/01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "rev3",
    userName: "Ali Hosseini",
    rating: 5,
    comment: "Excellent service and very polite staff. It was a great experience.",
    date: "2024/10/17",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Use a mutable array for mock data to simulate database operations
export let mockBusinessesData: BusinessDetails[] = [
  {
    id: "4",
    name: "Paradise Market",
    category: "Shopping & Retail",
    description: "Fresh and organic produce market. Expect the best quality from us.",
    address: "Shop 1/365 Logan Rd, Stones Corner QLD 4120, Australia",
    phone: "0431181021",
    rating: 4.7,
    reviewCount: 120,
    distance: 150.0,
    image: "/images/paradise-market.png",
    isPromoted: true,
    services: ["Fresh Produce", "Fruits & Vegetables", "Organic Products", "Groceries"],
    images: [
      "/images/paradise-market.png",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    workingHours: "Mon-Sat: 7:30-20:00 Sun: 8:00-19:00",
    reviews: commonReviews,
    latitude: -27.499644,
    longitude: 153.044794,
    status: "approved",
  },
  {
    id: "5",
    name: "Toranj Restaurant",
    category: "Restaurant & Cafe",
    description: "Authentic Iranian cuisine with an unparalleled taste and a pleasant ambiance.",
    address: "693 Brunswick St, New Farm QLD 4005, Australia",
    phone: "0734969158",
    rating: 4.9,
    reviewCount: 210,
    distance: 145.0,
    image: "/images/toranj-restaurant.png",
    isPromoted: false,
    services: ["Iranian Food", "Kebab", "Stew", "Tea & Dessert"],
    images: [
      "/images/toranj-restaurant.png",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    workingHours: "Daily 12:00 to 22:00",
    reviews: commonReviews,
    latitude: -27.4642967,
    longitude: 153.0394663,
    status: "approved",
  },
  {
    id: "6",
    name: "Farah Restaurant",
    category: "Restaurant & Cafe",
    description: "A unique experience of Middle Eastern cuisine with exceptional quality.",
    address: "391 Wickham Ter, Spring Hill QLD 4000, Australia",
    phone: "0731725300",
    rating: 4.5,
    reviewCount: 95,
    distance: 148.0,
    image: "/images/farah-restaurant.png",
    isPromoted: true,
    services: ["Middle Eastern Food", "Fast Food", "Salad", "Beverages"],
    images: [
      "/images/farah-restaurant.png",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    workingHours: "Daily 11:00 to 21:00",
    reviews: commonReviews,
    latitude: -27.4632558,
    longitude: 153.0185756,
    status: "approved",
  },
  {
    id: "7",
    name: "Iraj Auto Repair (RWC)",
    category: "Automotive Services",
    description: "Specialized car repairs and RWC certification at the best prices.",
    address: "680 Beaudesert Rd, Rocklea QLD 4106, QLD 4104, Australia",
    phone: "0412544121",
    rating: 4.2,
    reviewCount: 60,
    distance: 160.0,
    image: "/images/iraj-auto-repair.png",
    isPromoted: false,
    services: ["Engine Repair", "Oil Change", "RWC Inspection", "Brake Repair"],
    images: [
      "/images/iraj-auto-repair.png",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    workingHours: "Monday to Friday 8:00 to 17:00",
    reviews: commonReviews,
    latitude: -27.5553195,
    longitude: 153.0186751,
    status: "approved",
  },
]

// --- CRUD Operations for Mock Data ---

export async function getBusinesses(): Promise<BusinessDetails[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBusinessesData
}

export async function getAllBusinesses(): Promise<BusinessDetails[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBusinessesData
}

export async function getBusinessById(id: string): Promise<BusinessDetails | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBusinessesData.find((b) => b.id === id)
}

export async function getBusinessesByCategory(category: string): Promise<BusinessDetails[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  if (category === "All") return mockBusinessesData
  return mockBusinessesData.filter((business) => business.category === category)
}

export async function searchBusinesses(query: string): Promise<BusinessDetails[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const lowercaseQuery = query.toLowerCase()
  return mockBusinessesData.filter(
    (business) =>
      business.name.toLowerCase().includes(lowercaseQuery) ||
      business.description.toLowerCase().includes(lowercaseQuery) ||
      business.category.toLowerCase().includes(lowercaseQuery) ||
      business.services.some((service) => service.toLowerCase().includes(lowercaseQuery)),
  )
}

export async function addBusiness(
  newBusiness: Omit<BusinessDetails, "id" | "reviews" | "reviewCount" | "rating" | "distance">,
): Promise<BusinessDetails> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const businessWithDefaults: BusinessDetails = {
    id: (mockBusinessesData.length + 1).toString(),
    rating: 0,
    reviewCount: 0,
    distance: 0,
    reviews: [],
    ...newBusiness,
    isPromoted: newBusiness.isPromoted || false,
    status: newBusiness.status || "pending",
  }
  mockBusinessesData.push(businessWithDefaults)
  return businessWithDefaults
}

export async function updateBusiness(updatedBusiness: BusinessDetails): Promise<BusinessDetails | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const index = mockBusinessesData.findIndex((b) => b.id === updatedBusiness.id)
  if (index !== -1) {
    mockBusinessesData[index] = updatedBusiness
    return updatedBusiness
  }
  return null
}

export async function deleteBusiness(id: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const initialLength = mockBusinessesData.length
  mockBusinessesData = mockBusinessesData.filter((b) => b.id !== id)
  return mockBusinessesData.length < initialLength
}
