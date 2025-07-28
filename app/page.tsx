"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Phone, Star, Navigation, Eye } from "lucide-react"
import Link from "next/link"
import { getAllBusinesses } from "@/lib/db/businesses"
import type { BusinessDetails } from "@/types/business"

export default function HomePage() {
  const [businesses, setBusinesses] = useState<BusinessDetails[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessDetails[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "restaurant", label: "Restaurants" },
    { value: "grocery", label: "Grocery Stores" },
    { value: "automotive", label: "Automotive" },
    { value: "healthcare", label: "Healthcare" },
    { value: "beauty", label: "Beauty & Spa" },
    { value: "retail", label: "Retail" },
    { value: "services", label: "Services" },
  ]

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

    if (searchTerm) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((business) => business.category === selectedCategory)
    }

    setFilteredBusinesses(filtered)
  }, [searchTerm, selectedCategory, businesses])

  const handleGetDirections = (business: BusinessDetails) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`
    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">{error}</div>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Local Businesses</h1>
          <p className="text-xl text-gray-600 mb-8">Find the best restaurants, shops, and services in your area</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search businesses, services, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? "es" : ""} found
          </p>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No businesses found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Link href={`/business/${business.id}`}>
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  {business.isPromoted && <Badge className="absolute top-2 right-2 bg-yellow-500">Promoted</Badge>}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{business.name}</h3>
                    <div className="flex items-center text-sm text-yellow-600">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {business.rating}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{business.description}</p>

                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {business.address}
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Phone className="w-4 h-4 mr-1" />
                    {business.phone}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGetDirections(business)}
                      className="flex-1"
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                    <Link href={`/business/${business.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
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
