"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Star, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllBusinesses, searchBusinesses, getBusinessesByCategory } from "@/lib/mock-data"
import type { BusinessDetails } from "@/types/business"
import Link from "next/link"

export default function HomePage() {
  const [businesses, setBusinesses] = useState<BusinessDetails[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBusinesses(getAllBusinesses())
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filteredBusinesses = getAllBusinesses()

    // Apply category filter
    if (selectedCategory !== "All") {
      filteredBusinesses = getBusinessesByCategory(selectedCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filteredBusinesses = searchBusinesses(searchQuery)
      if (selectedCategory !== "All") {
        filteredBusinesses = filteredBusinesses.filter((b) => b.category === selectedCategory)
      }
    }

    setBusinesses(filteredBusinesses)
  }, [searchQuery, selectedCategory])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading businesses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Local Businesses</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Discover amazing businesses in your community</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search businesses, services, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
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
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Businesses"}
            <span className="text-gray-500 font-normal ml-2">({businesses.length} found)</span>
          </h2>
        </div>

        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or browse all categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Link key={business.id} href={`/business/${business.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {business.isPromoted && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">Promoted</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{business.name}</h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700">{business.rating}</span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="mb-2">
                      {business.category}
                    </Badge>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>

                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="line-clamp-1">{business.address}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{business.reviewCount} reviews</span>
                      <span>{business.distance} km away</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
