"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getAllBusinesses } from "@/lib/db/businesses"
import type { BusinessDetails } from "@/types/business"
import { Search, MapPin, Phone, Star, Navigation } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", name: "All", icon: "🏪" },
  { id: "restaurant", name: "Restaurants", icon: "🍽️" },
  { id: "grocery", name: "Grocery", icon: "🛒" },
  { id: "automotive", name: "Automotive", icon: "🚗" },
  { id: "healthcare", name: "Healthcare", icon: "🏥" },
  { id: "beauty", name: "Beauty", icon: "💄" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "education", name: "Education", icon: "📚" },
]

export default function HomePage() {
  const [businesses, setBusinesses] = useState<BusinessDetails[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessDetails[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAllBusinesses()
        setBusinesses(data)
        setFilteredBusinesses(data)
      } catch (error) {
        console.error("Error loading businesses:", error)
        setError("Failed to load businesses")
      } finally {
        setLoading(false)
      }
    }

    loadBusinesses()
  }, [])

  useEffect(() => {
    let filtered = businesses

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((business) => business.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredBusinesses(filtered)
  }, [businesses, selectedCategory, searchQuery])

  const handleGetDirections = (business: BusinessDetails) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`
    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">{error}</div>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Local Businesses</h1>
          <p className="text-xl text-gray-600 mb-8">Find the best local services and businesses in your area</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search businesses, services, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {selectedCategory === "all"
              ? "All Businesses"
              : `${categories.find((c) => c.id === selectedCategory)?.name} Businesses`}
            <span className="text-gray-500 text-lg ml-2">({filteredBusinesses.length})</span>
          </h2>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No businesses found matching your criteria</div>
            <Button
              onClick={() => {
                setSelectedCategory("all")
                setSearchQuery("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={business.image || "/placeholder.svg"}
                    alt={business.name}
                    fill
                    className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => window.open(`/business/${business.id}`, "_blank")}
                  />
                  {business.isPromoted && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">Promoted</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => window.open(`/business/${business.id}`, "_blank")}
                    >
                      {business.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {business.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{business.rating}</span>
                    <span className="text-sm text-gray-500">({business.reviewCount} reviews)</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{business.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{business.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{business.phone}</span>
                    </div>
                  </div>

                  {business.services && business.services.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {business.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {business.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{business.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGetDirections(business)}
                      className="flex-1"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                    <Link href={`/business/${business.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
