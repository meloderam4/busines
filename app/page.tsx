"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Star, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Business {
  id: string
  name: string
  category: string
  description: string
  address: string
  rating: number
  reviewCount: number
  distance: number
  image: string
  isPromoted: boolean
  services: string[]
}

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  const mockBusinesses: Business[] = [
    {
      id: "1",
      name: "کافه رستوران سنتی",
      category: "رستوران",
      description: "بهترین غذاهای سنتی ایرانی با کیفیت عالی",
      address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
      rating: 4.8,
      reviewCount: 156,
      distance: 0.5,
      image: "/placeholder.svg?height=200&width=300",
      isPromoted: true,
      services: ["غذای سنتی", "کافی شاپ", "تحویل درب منزل"],
    },
    {
      id: "2",
      name: "آرایشگاه مردانه مدرن",
      category: "زیبایی",
      description: "خدمات آرایشگری مردانه با تجهیزات مدرن",
      address: "تهران، میدان تجریش، کوچه نوری",
      rating: 4.6,
      reviewCount: 89,
      distance: 1.2,
      image: "/placeholder.svg?height=200&width=300",
      isPromoted: false,
      services: ["اصلاح", "کوتاهی مو", "ماساژ صورت"],
    },
    {
      id: "3",
      name: "فروشگاه لوازم خانگی",
      category: "خرید",
      description: "انواع لوازم خانگی با قیمت مناسب",
      address: "تهران، بازار بزرگ، راسته لوازم خانگی",
      rating: 4.3,
      reviewCount: 234,
      distance: 2.1,
      image: "/placeholder.svg?height=200&width=300",
      isPromoted: true,
      services: ["لوازم خانگی", "تعمیرات", "گارانتی"],
    },
  ]

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
          console.log("Location access denied")
        },
      )
    }

    // Load businesses
    setTimeout(() => {
      setBusinesses(mockBusinesses)
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
              <h1 className="text-2xl font-bold text-blue-600 font-vazir">بیزینس یاب</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex font-vazir">
                <MapPin className="w-3 h-3 mr-1" />
                {userLocation ? "موقعیت فعال" : "در حال تشخیص موقعیت..."}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/register">
                <Button variant="outline" size="sm" className="btn-persian bg-transparent">
                  ورود / ثبت‌نام
                </Button>
              </Link>
              <Link href="/business/register">
                <Button size="sm" className="btn-persian">
                  <Plus className="w-4 h-4 mr-1" />
                  ثبت کسب‌وکار
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 font-vazir persian-text">کسب‌وکارهای محلی را پیدا کنید</h2>
          <p className="text-blue-100 mb-8 font-vazir text-persian">بهترین خدمات در اطراف شما را کشف کنید</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="جست‌وجو کسب‌وکار، خدمات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12 text-right input-persian"
              />
            </div>
            <Button variant="secondary" size="lg" className="h-12 btn-persian">
              <Filter className="w-4 h-4 mr-2" />
              فیلتر
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
          </div>
        ) : (
          <>
            {/* Promoted Businesses */}
            {promotedBusinesses.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 card-title-persian">کسب‌وکارهای ویژه</h3>
                  <Badge variant="secondary">تبلیغاتی</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {promotedBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} isPromoted />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Businesses */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 card-title-persian">کسب‌وکارهای اطراف شما</h3>
              {regularBusinesses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">کسب‌وکاری یافت نشد</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function BusinessCard({ business, isPromoted = false }: { business: Business; isPromoted?: boolean }) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${isPromoted ? "ring-2 ring-yellow-400" : ""}`}>
      <div className="relative">
        <img
          src={business.image || "/placeholder.svg"}
          alt={business.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {isPromoted && <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 font-vazir">ویژه</Badge>}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-vazir">
          <MapPin className="w-3 h-3 inline mr-1" />
          {business.distance} کیلومتر
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-right card-title-persian">{business.name}</CardTitle>
            <Badge variant="outline" className="mt-1 font-vazir">
              {business.category}
            </Badge>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium mr-1 font-vazir">{business.rating}</span>
            <span className="text-xs text-gray-500 font-vazir">({business.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-3 text-right text-persian">{business.description}</p>
        <p className="text-gray-500 text-xs mb-3 text-right font-vazir">{business.address}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {business.services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs font-vazir">
              {service}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href={`/business/${business.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent btn-persian">
              مشاهده جزئیات
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
