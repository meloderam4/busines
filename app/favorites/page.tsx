"use client"

import { useState } from "react"
import { Heart, Star, MapPin, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: "Traditional Cafe & Restaurant",
      category: "Restaurant",
      rating: 4.8,
      reviewCount: 156,
      distance: 0.5,
      address: "Tehran, Valiasr Street",
      image: "/placeholder.svg?height=100&width=100",
      addedDate: "2024/11/05",
    },
    {
      id: "2",
      name: "Modern Men's Barbershop",
      category: "Beauty",
      rating: 4.6,
      reviewCount: 89,
      distance: 1.2,
      address: "Tehran, Tajrish Square",
      image: "/placeholder.svg?height=100&width=100",
      addedDate: "2024/11/01",
    },
  ])

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Business Finder
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span>Favorites</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Favorite Businesses</h1>
          <p className="text-gray-600">{favorites.length} businesses in your favorites list</p>
        </div>

        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((business) => (
              <Card key={business.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">{business.name}</h3>
                      <Badge variant="outline" className="mb-2">
                        {business.category}
                      </Badge>
                      <div className="flex items-center justify-start mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{business.rating}</span>
                        <span className="text-xs text-gray-500">({business.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-start text-sm text-gray-500 mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{business.distance} km</span>
                      </div>
                      <p className="text-sm text-gray-600 text-left">{business.address}</p>
                      <p className="text-xs text-gray-400 text-left mt-1">Added on: {business.addedDate}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link href={`/business/${business.id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent text-red-500 hover:text-red-700"
                        onClick={() => removeFavorite(business.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Businesses in Favorites</h3>
            <p className="text-gray-600 mb-6">Add your favorite businesses</p>
            <Link href="/search">
              <Button>Search Businesses</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
