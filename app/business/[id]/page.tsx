"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getBusinessById } from "@/lib/db/businesses"
import type { BusinessDetails } from "@/types/business"
import { MapPin, Phone, Globe, Clock, Star, Navigation, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function BusinessPage() {
  const params = useParams()
  const [business, setBusiness] = useState<BusinessDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        setLoading(true)
        setError(null)

        const id = params.id as string
        console.log("Loading business with ID:", id)

        const data = await getBusinessById(id)
        console.log("Loaded business:", data)

        if (!data) {
          setError("Business not found")
          return
        }

        setBusiness(data)
      } catch (error) {
        console.error("Error loading business:", error)
        setError(`Failed to load business: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadBusiness()
    }
  }, [params.id])

  const handleGetDirections = () => {
    if (!business) return

    if (business.latitude && business.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`
      window.open(url, "_blank")
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`
      window.open(url, "_blank")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || "Business not found"}</AlertDescription>
            </Alert>
            <Link href="/">
              <Button>← Back to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to businesses
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{business.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">{business.category}</Badge>
                  {business.isPromoted && <Badge className="bg-yellow-500">Featured</Badge>}
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{business.rating}</span>
                    <span className="text-gray-500">({business.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <Card>
                <CardContent className="p-0">
                  <img
                    src={business.image || "/placeholder.svg?height=400&width=800"}
                    alt={business.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{business.description}</p>
                </CardContent>
              </Card>

              {/* Services */}
              {business.services && business.services.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {business.services.map((service, index) => (
                        <Badge key={index} variant="outline">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{business.address}</span>
                  </div>

                  {business.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                        {business.phone}
                      </a>
                    </div>
                  )}

                  {business.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  {business.workingHours && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{business.workingHours}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <Button className="w-full" onClick={handleGetDirections}>
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>

                  {business.phone && (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => (window.location.href = `tel:${business.phone}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  )}

                  {business.website && (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => window.open(business.website, "_blank")}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
