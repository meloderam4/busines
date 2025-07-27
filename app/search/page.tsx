"use client"

import { useState, useEffect } from "react"
import { getAllBusinesses } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Phone, Clock, Search, Filter } from "lucide-react"
import Link from "next/link"
import type { BusinessDetails } from "@/types/business"

export default function SearchPage() {
  const [businesses, setBusinesses] = useState<BusinessDetails[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessDetails[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  const categories = [
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
    const loadBusinesses = async () => {
      try {
        const allBusinesses = await getAllBusinesses()
        const approvedBusinesses = allBusinesses.filter((business) => business.status === "approved")
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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((business) => business.category === selectedCategory)
    }

    setFilteredBusinesses(filtered)
  }, [searchTerm, selectedCategory, businesses])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading businesses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Businesses</h1>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search businesses, services, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
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

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? "es" : ""} found
          </p>
        </div>

        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
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
                  <img
                    src={business.image || "/placeholder.svg"}
                    alt={business.name}
                    className="w-full h-48 object-cover"
                  />
                  {business.isPromoted && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">Featured</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{business.rating}</span>
                    </div>
                  </div>

                  <Badge variant="outline" className="mb-2">
                    {business.category}
                  </Badge>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>

                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">{business.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{business.phone}</span>
                    </div>
                    {business.workingHours && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{business.workingHours}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/business/${business.id}`}>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
