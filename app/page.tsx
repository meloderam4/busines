"use client"

import { useState, useEffect } from "react"
import { getAllBusinesses, getBusinessesByCategory, searchBusinesses } from "@/lib/db/businesses"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Phone, Clock, Navigation, Eye, Search, Filter } from "lucide-react"
import Link from "next/link"
import type { BusinessDetails } from "@/types/business"

export default function HomePage() {
  const [businesses, setBusinesses] = useState<BusinessDetails[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessDetails[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  const categories = [
    "All",
    "Restaurant & Cafe",
    "Shopping & Retail",
    "Automotive Services",
    "Health & Beauty",
    "Professional Services",
  ]

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const data = await getAllBusinesses()
        const approvedBusinesses = data.filter((business) => business.status === "approved")
        setBusinesses(approvedBusinesses)
        setFilteredBusinesses(approvedBusinesses)
      } catch (error) {
        console.error("Error loading businesses:", error)
        setBusinesses([])
        setFilteredBusinesses([])
      } finally {
        setLoading(false)
      }
    }

    loadBusinesses()
  }, [])

  useEffect(() => {
    const filterBusinesses = async () => {
      let filtered = businesses

      if (selectedCategory !== "All") {
        filtered = await getBusinessesByCategory(selectedCategory)
      }

      if (searchQuery.trim()) {
        filtered = await searchBusinesses(searchQuery)
      }

      setFilteredBusinesses(filtered)
    }

    filterBusinesses()
  }, [searchQuery, selectedCategory, businesses])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleDirections = (business: BusinessDetails) => {
    if (business.latitude && business.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`
      window.open(url, "_blank")
    } else {
      alert("Location information is not available for this business.")
    }
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Persian Hub</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the best Persian businesses in your area</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search businesses, services, or locations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg rounded-full border-0 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-gray-600">
            {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? "es" : ""} found
          </p>
        </div>
      </div>

      {/* Business Grid */}
      <div className="container mx-auto px-4 pb-16">
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No businesses found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <Card key={business.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Clickable Image */}
                <Link href={`/business/${business.id}`} className="block relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={business.image || "/placeholder.svg?height=240&width=400"}
                      alt={business.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    {business.isPromoted && (
                      <Badge className="absolute top-3 right-3 bg-yellow-500 text-white shadow-lg">Featured</Badge>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Eye className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </Link>

                <CardContent className="p-5">
                  {/* Business Info */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Link href={`/business/${business.id}`} className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer">
                          {business.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-700">{business.rating}</span>
                      </div>
                    </div>

                    <Badge variant="outline" className="mb-3 text-xs">
                      {business.category}
                    </Badge>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{business.description}</p>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{business.address}</span>
                      </div>
                      {business.phone && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{business.phone}</span>
                        </div>
                      )}
                      {business.workingHours && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{business.workingHours}</span>
                        </div>
                      )}
                    </div>

                    {/* Reviews Count */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{business.reviewCount} reviews</span>
                      <span>{business.distance} km away</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                      onClick={() => handleDirections(business)}
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                    <Link href={`/business/${business.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </Link>
                  </div>

                  {/* Call Button (if phone available) */}
                  {business.phone && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleCall(business.phone!)}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
