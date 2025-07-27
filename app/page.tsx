"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { mockBusinessesData } from "@/lib/mock-data"
import type { Business } from "@/types/business"

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied or error:", error)
          // Fallback to a default location if access is denied
          setUserLocation({ lat: 35.7, lng: 51.4 }) // Example: Tehran
        },
      )
    } else {
      console.log("Geolocation is not supported by this browser.")
      // Fallback to a default location if not supported
      setUserLocation({ lat: 35.7, lng: 51.4 }) // Example: Tehran
    }

    // Load businesses from mock data
    setTimeout(() => {
      setBusinesses(mockBusinessesData)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // For a minimalist design, we'll show all businesses together,
  // and rely on search/filter for discovery.
  // const promotedBusinesses = filteredBusinesses.filter((b) => b.isPromoted)
  // const regularBusinesses = filteredBusinesses.filter((b) => !b.isPromoted)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Business Finder</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <MapPin className="w-3 h-3 mr-1" />
                {userLocation ? "Location Active" : "Detecting Location..."}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/register">
                <Button variant="outline" size="sm">
                  Login / Register
                </Button>
              </Link>
              <Link href="/business/register">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Prominent Search Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Discover Local Businesses</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Find the best services and products near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-card rounded-lg shadow-xl p-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search businesses, services, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
              />
            </div>
            <Button size="lg" className="h-14 text-lg px-8">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content - Business Listings */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading businesses...</p>
          </div>
        ) : (
          <section>
            <h3 className="text-2xl font-bold text-foreground mb-6">All Businesses</h3>
            {filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No businesses found matching your criteria.</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-border rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={business.image || "/placeholder.svg?height=200&width=300&query=business+listing"}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        {business.isPromoted && (
          <Badge className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 font-semibold">Featured</Badge>
        )}
        <div className="absolute bottom-3 left-3 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{business.distance} km</span>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground text-left">{business.name}</CardTitle>
            <Badge variant="secondary" className="mt-1 text-muted-foreground">
              {business.category}
            </Badge>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1 text-foreground">{business.rating}</span>
            <span className="text-xs text-muted-foreground">({business.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm mb-3 text-left line-clamp-2">{business.description}</p>
        <p className="text-muted-foreground text-xs mb-3 text-left flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {business.address}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {business.services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="outline" className="text-xs text-muted-foreground border-border">
              {service}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href={`/business/${business.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
          <Button size="sm" variant="secondary">
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
