"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Star, MapPin, Phone, Clock, Share2, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  avatar: string
}

interface BusinessDetails {
  id: string
  name: string
  category: string
  description: string
  address: string
  phone: string
  rating: number
  reviewCount: number
  images: string[]
  services: string[]
  workingHours: string
  reviews: Review[]
}

export default function BusinessDetailPage() {
  const params = useParams()
  const [business, setBusiness] = useState<BusinessDetails | null>(null)
  const [newReview, setNewReview] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [loading, setLoading] = useState(true)

  // Mock business data
  const mockBusiness: BusinessDetails = {
    id: "1",
    name: "کافه رستوران سنتی",
    category: "رستوران",
    description:
      "بهترین غذاهای سنتی ایرانی با کیفیت عالی و محیطی دنج و آرام. ما با بیش از ۲۰ سال تجربه در خدمت شما هستیم.",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه همکف",
    phone: "۰۲۱-۸۸۷۷۶۶۵۵",
    rating: 4.8,
    reviewCount: 156,
    workingHours: "روزانه ۱۰:۰۰ تا ۲۳:۰۰",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    services: ["غذای سنتی", "کافی شاپ", "تحویل درب منزل", "سفارش آنلاین", "پذیرایی مهمان"],
    reviews: [
      {
        id: "1",
        userName: "احمد محمدی",
        rating: 5,
        comment: "غذاها فوق‌العاده خوشمزه بود. محیط بسیار دنج و خدمات عالی. حتماً دوباره می‌آیم.",
        date: "۱۴۰۳/۰۸/۱۵",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        userName: "فاطمه احمدی",
        rating: 4,
        comment: "کیفیت غذا خوب بود اما زمان انتظار کمی طولانی بود. در کل راضی هستم.",
        date: "۱۴۰۳/۰۸/۱۰",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBusiness(mockBusiness)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleSubmitReview = () => {
    if (newReview.trim() && userRating > 0) {
      // Here you would submit the review to your backend
      console.log("Submitting review:", { rating: userRating, comment: newReview })
      setNewReview("")
      setUserRating(0)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">کسب‌وکار یافت نشد</h2>
          <Link href="/">
            <Button>بازگشت به صفحه اصلی</Button>
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
              بیزینس یاب
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                اشتراک‌گذاری
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
                    src={business.images[0] || "/placeholder.svg"}
                    alt={business.name}
                    className="w-full h-64 md:h-80 object-cover rounded-l-lg"
                  />
                  <div className="grid grid-cols-1 gap-2">
                    {business.images.slice(1, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${business.name} ${index + 2}`}
                        className="w-full h-[calc(50%-4px)] object-cover rounded-r-lg"
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
                    <CardTitle className="text-2xl text-right">{business.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {business.category}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold mr-1">{business.rating}</span>
                    <span className="text-gray-500">({business.reviewCount} نظر)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-right leading-relaxed">{business.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 ml-2" />
                    <span className="text-right">{business.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 ml-2" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 ml-2" />
                    <span>{business.workingHours}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-semibold mb-3 text-right">خدمات ارائه‌شده:</h4>
                  <div className="flex flex-wrap gap-2">
                    {business.services.map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">نظرات کاربران</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold mb-3 text-right">نظر خود را بنویسید:</h5>
                  <div className="flex items-center mb-3 justify-end">
                    <span className="text-sm text-gray-600 ml-2">امتیاز:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setUserRating(star)} className="ml-1">
                        <Star
                          className={`w-5 h-5 ${
                            star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="نظر خود را بنویسید..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="mb-3 text-right"
                  />
                  <Button onClick={handleSubmitReview} disabled={!newReview.trim() || userRating === 0}>
                    ثبت نظر
                  </Button>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {business.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="mr-3">
                            <p className="font-semibold text-right">{review.userName}</p>
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
                      <p className="text-gray-700 text-right">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">اقدامات سریع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  تماس با کسب‌وکار
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MapPin className="w-4 h-4 mr-2" />
                  مسیریابی
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  ارسال پیام
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">موقعیت روی نقشه</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">نقشه در اینجا نمایش داده می‌شود</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Businesses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">کسب‌وکارهای مشابه</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                    <img
                      src={`/placeholder.svg?height=50&width=50&query=restaurant+${item}`}
                      alt={`Business ${item}`}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 text-right">
                      <p className="font-medium">رستوران سنتی {item}</p>
                      <div className="flex items-center justify-end">
                        <span className="text-sm text-gray-500 ml-1">4.{item}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
