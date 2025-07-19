"use client"

import { useState } from "react"
import { User, Settings, Heart, MapPin, Phone, Mail, Edit, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ProfilePage() {
  const [user] = useState({
    name: "Ahmad Mohammadi",
    email: "ahmad@example.com",
    phone: "+98-9123456789",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "2024/07/31",
    reviewsCount: 12,
    favoritesCount: 8,
    businessesCount: 2,
  })

  const recentActivity = [
    {
      id: "1",
      type: "review",
      title: "New review for Traditional Cafe & Restaurant",
      date: "2024/11/05",
      rating: 5,
    },
    {
      id: "2",
      type: "favorite",
      title: "Modern Men's Barbershop added to favorites",
      date: "2024/11/01",
    },
  ]

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
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <div className="flex items-center justify-start space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {user.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {user.phone}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Member since: {user.joinDate}</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{user.reviewsCount}</div>
              <p className="text-gray-600">Reviews Posted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">{user.favoritesCount}</div>
              <p className="text-gray-600">Favorites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{user.businessesCount}</div>
              <p className="text-gray-600">Businesses Registered</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    {activity.type === "review" && activity.rating && (
                      <Badge variant="secondary">{activity.rating} ⭐</Badge>
                    )}
                    {activity.type === "favorite" && <Heart className="w-4 h-4 text-red-500" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/favorites">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <Heart className="w-4 h-4" />
                  <span>Favorites</span>
                </Button>
              </Link>
              <Link href="/business/register">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <MapPin className="w-4 h-4" />
                  <span>Register New Business</span>
                </Button>
              </Link>
              <Link href="/my-reviews">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <User className="w-4 h-4" />
                  <span>My Reviews</span>
                </Button>
              </Link>

              <Separator className="my-4" />

              <Button
                variant="outline"
                className="w-full justify-between text-red-600 hover:text-red-700 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
