"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { mockBusinessesData } from "@/lib/mock-data"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("distance")

  const categories = [
    "All Categories",
    "Restaurant & Cafe",
    "Beauty & Salon",
    "Shopping & Retail",
    "Automotive Services",
    "Medical & Health",
    "Educational",
    "Sports",
    "Real Estate",
  ]

  // Filter and sort businesses based on current state
  const filteredAndSortedBusinesses = mockBusinessesData
    .filter(
      (business) =>
        (selectedCategory === "All Categories" || selectedCategory === "" || business.category === selectedCategory) &&
        (business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))),
    )
    .sort((a, b) => {
      if (sortBy === "distance") {
        return a.distance - b.distance
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      } else if (sortBy === "reviews") {
        return b.reviewCount - a.reviewCount
      }
      // Add more sorting logic if needed
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Business Finder
            </Link>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Section */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search business, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-12 text-right"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="text-right">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="text-right">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <Button className="btn-persian">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
            <span className="text-sm text-gray-500">{filteredAndSortedBusinesses.length} results found</span>
          </div>

          {filteredAndSortedBusinesses.length > 0 ? (
            filteredAndSortedBusinesses.map((business) => (
              <Card key={business.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-right">
                      <h3 className="font-semibold text-lg">{business.name}</h3>
                      <Badge variant="outline" className="mb-2">
                        {business.category}
                      </Badge>
                      <div className="flex items-center justify-end mb-2">
                        <span className="text-sm text-gray-500 ml-1">({business.reviewCount})</span>
                        <span className="text-sm font-medium ml-1">{business.rating}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex items-center justify-end text-sm text-gray-500">
                        <span>{business.distance} km</span>
                        <MapPin className="w-4 h-4 mr-1" />
                      </div>
                      <p className="text-sm text-gray-600 text-right">{business.address}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link href={`/business/${business.id}`}>
                        <Button size="sm" className="btn-persian">
                          View
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No businesses found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
