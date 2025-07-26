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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
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
        {/* Search & Filter Section */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search businesses, services, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 text-lg text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12 text-foreground">
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
              <SelectTrigger className="h-12 text-foreground">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-12 text-lg">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-foreground">Search Results</h2>
            <span className="text-sm text-muted-foreground">{filteredAndSortedBusinesses.length} results found</span>
          </div>

          {filteredAndSortedBusinesses.length > 0 ? (
            filteredAndSortedBusinesses.map((business) => (
              <Card key={business.id} className="hover:shadow-md transition-shadow duration-200 border border-border">
                <CardContent className="p-4 flex items-center gap-4">
                  <img
                    src={business.image || "/placeholder.svg?height=80&width=80&query=business+search+result"}
                    alt={business.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 grid gap-1">
                    <h3 className="font-semibold text-lg text-foreground">{business.name}</h3>
                    <Badge variant="secondary" className="w-fit text-muted-foreground">
                      {business.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{business.rating}</span>
                      <span>({business.reviewCount} reviews)</span>
                      <MapPin className="w-4 h-4 ml-auto" />
                      <span>{business.distance} km</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{business.address}</p>
                  </div>
                  <div className="flex flex-col space-y-2 flex-shrink-0">
                    <Link href={`/business/${business.id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No businesses found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
