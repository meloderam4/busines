"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Star, Plus, Filter } from "lucide-react"
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

  const promotedBusinesses = filteredBusinesses.filter((b) => b.isPromoted)
  const regularBusinesses = filteredBusinesses.filter((b) => !b.isPromoted)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Business Finder</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <MapPin className="w-3 h-3 mr-1" />
                {userLocation ? "Location Active" : "Detecting Location..."}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/register">
                <Button variant="outline" size="sm" className="bg-transparent">
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

      {/* Search Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Local Businesses</h2>
          <p className="text-blue-100 mb-8">Discover the best services around you</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search business, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-left"
              />
            </div>
            <Button variant="secondary" size="lg" className="h-12">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {/* Promoted Businesses */}
            {promotedBusinesses.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Businesses</h3>
                  <Badge variant="secondary">Promoted</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {promotedBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Businesses */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Businesses Near You</h3>
              {regularBusinesses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No businesses found</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${business.isPromoted ? "ring-2 ring-yellow-400" : ""}`}>
      <div className="relative">
        <img
          src={business.image || "/placeholder.svg"}
          alt={business.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {business.isPromoted && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">Featured</Badge>
        )}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          <MapPin className="w-3 h-3 inline mr-1" />
          {business.distance} km
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-left">{business.name}</CardTitle>
            <Badge variant="outline" className="mt-1">
              {business.category}
            </Badge>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{business.rating}</span>
            <span className="text-xs text-gray-500">({business.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-3 text-left">{business.description}</p>
        <p className="text-gray-500 text-xs mb-3 text-left">{business.address}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {business.services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
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
          <Button size="sm" variant="default">
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
