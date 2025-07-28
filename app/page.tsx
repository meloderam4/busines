"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Star, Phone, Globe, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllBusinesses } from "@/lib/db/businesses"
import type { BusinessDetails } from "@/types/business"

const categories = [
  "All",
  "Restaurant & Cafe",
  "Beauty & Salon",
  "Shopping & Retail",
  "Automotive Services",
  "Medical & Health",
  "Educational",
  "Sports",
  "Real Estate",
  "Transportation",
  "Other",
]

export default function HomePage() {
  const [businesses, setBusinesses] = useState<BusinessDetails[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessDetails[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        setLoading(true)
        const data = await getAllBusinesses()
        // Only show approved businesses on homepage
        const approvedBusinesses = data.filter((business) => business.status === "approved")
        setBusinesses(approvedBusinesses)
        setFilteredBusinesses(approvedBusinesses)
      } catch (error) {
        console.error("Error loading businesses:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBusinesses()
  }, [])

  useEffect(() => {
    let filtered = businesses

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((business) => business.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredBusinesses(filtered)
  }, [businesses, selectedCategory, searchQuery])

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  const handleViewDetails = (businessId: string) => {
    window.location.href = `/business/${businessId}`
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search businesses, services, or categories..."
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
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? "es" : ""} found
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={business.image || "/placeholder.svg"}
                  alt={business.name}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleViewDetails(business.id)}
                />
                {business.isPromoted && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">Promoted</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => handleViewDetails(business.id)}
                  >
                    {business.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {business.rating} ({business.reviewCount})
                    </span>
                  </div>
                </div>

                <Badge variant="secondary" className="mb-2">
                  {business.category}
                </Badge>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{business.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{business.phone}</span>
                  </div>
                  {business.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {business.website}
                      </a>
                    </div>
                  )}
                  {business.workingHours && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="truncate">{business.workingHours}</span>
                    </div>
                  )}
                </div>

                {business.services.length > 0 && (
                  <div className="mt-3">
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

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGetDirections(business.address)}
                    className="flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                  <Button size="sm" onClick={() => handleViewDetails(business.id)} className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBusinesses.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No businesses found</p>
            <p className="text-gray-400">Try adjusting your search criteria or browse all categories</p>
          </div>
        )}
      </div>
    </div>
  )
}
