"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Star, Phone, Globe, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { getAllBusinesses } from "@/lib/db/businesses"
import type { BusinessDetails } from "@/types/business"

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

export default function HomePage() {
  const [businesses, setBusinesses] = useState<BusinessDetails[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessDetails[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((business) => business.category === selectedCategory)
    }

    setFilteredBusinesses(filtered)
  }, [businesses, searchTerm, selectedCategory])

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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Local Businesses</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find the best restaurants, services, and shops in your neighborhood
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 focus:ring-0 text-gray-900"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 border-0 focus:ring-0 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Businesses</h2>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBusinesses.map((business) => (
                <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <Link href={`/business/${business.id}`}>
                      <Image
                        src={business.image || "/placeholder.svg"}
                        alt={business.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </Link>
                    {business.isPromoted && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/business/${business.id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors cursor-pointer">
                          {business.name}
                        </h3>
                      </Link>
                      <Badge variant="outline" className="capitalize">
                        {business.category}
                      </Badge>
                    </div>

                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{business.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({business.reviewCount} reviews)</span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {business.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-4 h-4 mr-2" />
                        {business.phone}
                      </div>
                      {business.workingHours && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          {business.workingHours}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleGetDirections(business)}
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                      <Link href={`/business/${business.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          <Globe className="w-4 h-4 mr-1" />
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
      </section>
    </div>
  )
}
