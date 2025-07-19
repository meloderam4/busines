"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Star, MapPin, Phone, Clock, Share2, Heart, MessageCircle, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { mockBusinessesData } from "@/lib/mock-data"
import type { BusinessDetails } from "@/types/business"
import GoogleMapEmbed from "@/components/google-map-embed" // Import the new map component

export default function BusinessDetailPage() {
  const params = useParams()
  const [business, setBusiness] = useState<BusinessDetails | null>(null)
  const [newReview, setNewReview] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch business details by ID
    setLoading(true)
    setTimeout(() => {
      const foundBusiness = mockBusinessesData.find((b) => b.id === params.id)
      setBusiness(foundBusiness || null)
      setLoading(false)
    }, 800) // Increased delay for better skeleton visibility
  }, [params.id])

  const handleSubmitReview = () => {
    if (newReview.trim() && userRating > 0) {
      // Here you would submit the review to your backend
      console.log("Submitting review:", { rating: userRating, comment: newReview })
      setNewReview("")
      setUserRating(0)
      // Optionally, update mock data or re-fetch to show new review
    }
  }

  const handleDirections = () => {
    if (business?.latitude && business?.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`
      window.open(url, "_blank")
    } else {
      alert("Business location is not available.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Skeleton className="h-8 w-48" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery Skeleton */}
              <Card>
                <CardContent className="p-0">
                  <Skeleton className="w-full h-64 md:h-80 rounded-lg" />
                </CardContent>
              </Card>
              {/* Business Info Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
              {/* Reviews Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-32" />
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            </div>
            {/* Sidebar Skeletons */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-48 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Not Found</h2>
          <Link href="/">
            <Button>Back to Homepage</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Business Finder
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <img
                    src={business.images[0] || "/placeholder.svg?height=600&width=800&query=business+main+image"}
                    alt={business.name}
                    className="w-full h-64 md:h-80 object-cover rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none rounded-tr-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {business.images.slice(1, 5).map((image, index) => (
                      <img
                        key={index}
                        src={image || `/placeholder.svg?height=300&width=400&query=business+sub+image+${index + 1}`}
                        alt={`${business.name} ${index + 2}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-left">{business.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {business.category}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold ml-1">{business.rating}</span>
                    <span className="text-gray-500">({business.reviewCount} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-left leading-relaxed">{business.description}</p>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">Contact Information</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-left">{business.address}</span>
                      </div>
                      {business.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-5 h-5 mr-2" />
                          <a href={`tel:${business.phone}`} className="hover:underline">
                            {business.phone}
                          </a>
                        </div>
                      )}
                      {business.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-5 h-5 mr-2" />
                          <a href={`mailto:${business.email}`} className="hover:underline">
                            {business.email}
                          </a>
                        </div>
                      )}
                      {business.website && (
                        <div className="flex items-center text-gray-600">
                          <Globe className="w-5 h-5 mr-2" />
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {business.website}
                          </a>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  {business.workingHours && (
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">Working Hours</AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-2" />
                          <span>{business.workingHours}</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {business.services && business.services.length > 0 && (
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">Services Offered</AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="flex flex-wrap gap-2">
                          {business.services.map((service, index) => (
                            <Badge key={index} variant="secondary">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-left">User Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold mb-3 text-left">Write a Review:</h5>
                  <div className="flex items-center mb-3 justify-start">
                    <span className="text-sm text-gray-600 mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setUserRating(star)} className="mr-1">
                        <Star
                          className={`w-5 h-5 ${
                            star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Write your review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="mb-3 text-left"
                  />
                  <Button onClick={handleSubmitReview} disabled={!newReview.trim() || userRating === 0}>
                    Submit Review
                  </Button>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {business.reviews.length > 0 ? (
                    business.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={review.avatar || "/placeholder.svg?height=40&width=40&query=user+avatar"}
                              />
                              <AvatarFallback>{review.userName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <p className="font-semibold text-left">{review.userName}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-left">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {business.phone && (
                  <Button className="w-full" asChild>
                    <a href={`tel:${business.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Business
                    </a>
                  </Button>
                )}
                {business.latitude && business.longitude && (
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleDirections}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                )}
                {business.email && (
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href={`mailto:${business.email}`}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Map Embed */}
            {business.latitude && business.longitude && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Location on Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <GoogleMapEmbed
                    latitude={business.latitude}
                    longitude={business.longitude}
                    businessName={business.name}
                  />
                </CardContent>
              </Card>
            )}

            {/* Similar Businesses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Similar Businesses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockBusinessesData
                  .filter((b) => b.category === business.category && b.id !== business.id)
                  .slice(0, 3)
                  .map((item) => (
                    <Link href={`/business/${item.id}`} key={item.id} className="block">
                      <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors">
                        <img
                          src={item.image || `/placeholder.svg?height=50&width=50&query=restaurant+${item.id}`}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 text-left">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center justify-start">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-500 ml-1">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
