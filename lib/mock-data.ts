import type { BusinessDetails } from "@/types/business"

export const mockBusinesses: BusinessDetails[] = [
  {
    id: "1",
    name: "Paradise Market",
    category: "Shopping & Retail",
    description: "Fresh groceries and daily essentials with a wide variety of international products.",
    address: "123 Main Street, Sydney NSW 2000",
    phone: "+61 2 9876 5432",
    email: "info@paradisemarket.com.au",
    website: "https://paradisemarket.com.au",
    workingHours: "Mon-Sun 7 AM - 10 PM",
    services: ["Fresh Produce", "International Foods", "Home Delivery", "Online Shopping"],
    images: ["/images/paradise-market.png"],
    image: "/images/paradise-market.png",
    rating: 4.5,
    reviewCount: 128,
    distance: 0.8,
    latitude: -33.8688,
    longitude: 151.2093,
    isPromoted: true,
    status: "approved",
    reviews: [
      {
        id: "1",
        userName: "Sarah Johnson",
        rating: 5,
        comment: "Great selection of fresh produce and friendly staff!",
        date: "2024-01-15",
      },
    ],
  },
  {
    id: "2",
    name: "Toranj Restaurant",
    category: "Restaurant & Cafe",
    description: "Authentic Persian cuisine with traditional flavors and modern presentation.",
    address: "456 George Street, Sydney NSW 2000",
    phone: "+61 2 9123 4567",
    email: "contact@toranjrestaurant.com.au",
    website: "https://toranjrestaurant.com.au",
    workingHours: "Tue-Sun 5 PM - 11 PM",
    services: ["Dine-in", "Takeaway", "Catering", "Private Events"],
    images: ["/images/toranj-restaurant.png"],
    image: "/images/toranj-restaurant.png",
    rating: 4.7,
    reviewCount: 89,
    distance: 1.2,
    latitude: -33.865,
    longitude: 151.2094,
    isPromoted: false,
    status: "approved",
    reviews: [
      {
        id: "2",
        userName: "Mike Chen",
        rating: 5,
        comment: "Amazing Persian food! The kebabs are incredible.",
        date: "2024-01-10",
      },
    ],
  },
  {
    id: "3",
    name: "Farah Restaurant",
    category: "Restaurant & Cafe",
    description: "Family-owned restaurant serving delicious Middle Eastern cuisine.",
    address: "789 Pitt Street, Sydney NSW 2000",
    phone: "+61 2 9234 5678",
    email: "info@farahrestaurant.com.au",
    website: "https://farahrestaurant.com.au",
    workingHours: "Mon-Sat 11 AM - 10 PM",
    services: ["Dine-in", "Takeaway", "Delivery", "Halal Food"],
    images: ["/images/farah-restaurant.png"],
    image: "/images/farah-restaurant.png",
    rating: 4.3,
    reviewCount: 156,
    distance: 2.1,
    latitude: -33.87,
    longitude: 151.207,
    isPromoted: true,
    status: "approved",
    reviews: [
      {
        id: "3",
        userName: "Emma Wilson",
        rating: 4,
        comment: "Great food and atmosphere. Highly recommended!",
        date: "2024-01-08",
      },
    ],
  },
  {
    id: "4",
    name: "Iraj Auto Repair",
    category: "Automotive Services",
    description: "Professional auto repair services with experienced mechanics and quality parts.",
    address: "321 Liverpool Street, Sydney NSW 2000",
    phone: "+61 2 9345 6789",
    email: "service@irajautorepair.com.au",
    website: "https://irajautorepair.com.au",
    workingHours: "Mon-Fri 8 AM - 6 PM, Sat 8 AM - 4 PM",
    services: ["Engine Repair", "Brake Service", "Oil Change", "Tire Replacement"],
    images: ["/images/iraj-auto-repair.png"],
    image: "/images/iraj-auto-repair.png",
    rating: 4.6,
    reviewCount: 73,
    distance: 1.8,
    latitude: -33.872,
    longitude: 151.2065,
    isPromoted: false,
    status: "approved",
    reviews: [
      {
        id: "4",
        userName: "David Brown",
        rating: 5,
        comment: "Honest and reliable service. Fixed my car quickly!",
        date: "2024-01-05",
      },
    ],
  },
]

export function getAllBusinesses(): BusinessDetails[] {
  return mockBusinesses
}

export function getBusinessById(id: string): BusinessDetails | null {
  return mockBusinesses.find((business) => business.id === id) || null
}

export function getBusinessesByCategory(category: string): BusinessDetails[] {
  if (category === "All") return mockBusinesses
  return mockBusinesses.filter((business) => business.category === category)
}

export function searchBusinesses(query: string): BusinessDetails[] {
  const lowercaseQuery = query.toLowerCase()
  return mockBusinesses.filter(
    (business) =>
      business.name.toLowerCase().includes(lowercaseQuery) ||
      business.description.toLowerCase().includes(lowercaseQuery) ||
      business.category.toLowerCase().includes(lowercaseQuery) ||
      business.services.some((service) => service.toLowerCase().includes(lowercaseQuery)),
  )
}
