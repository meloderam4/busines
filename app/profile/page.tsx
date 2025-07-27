"use client"

import { useState, useEffect } from "react"
import { User, Heart, Phone, Mail, Edit, Building2, Plus, Eye, Star, Settings, Calendar, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import LogoutButton from "@/components/logout-button"
import { getAllBusinesses } from "@/lib/mock-data"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  avatar_url?: string
  user_type?: "regular" | "business_owner"
  created_at: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get current user
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()

        if (!currentUser) {
          router.push("/login")
          return
        }

        setUser(currentUser)

        // Try to get profile from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name, phone, avatar_url, user_type, created_at")
          .eq("id", currentUser.id)
          .single()

        if (profileData && !profileError) {
          setProfile({
            id: currentUser.id,
            email: currentUser.email || "",
            ...profileData,
            created_at: profileData.created_at || currentUser.created_at,
          })
        } else {
          // Fallback to user metadata if profile doesn't exist
          setProfile({
            id: currentUser.id,
            email: currentUser.email || "",
            first_name: currentUser.user_metadata?.first_name || "",
            last_name: currentUser.user_metadata?.last_name || "",
            phone: currentUser.user_metadata?.phone || "",
            avatar_url: currentUser.user_metadata?.avatar_url || "",
            user_type: currentUser.user_metadata?.user_type || "regular",
            created_at: currentUser.created_at,
          })
        }

        // Load businesses
        const allBusinesses = await getAllBusinesses()
        setBusinesses(allBusinesses.slice(0, 3)) // Show first 3 as user's businesses for demo
      } catch (error) {
        console.error("Error loading user data:", error)
        // Set fallback data
        setProfile({
          id: "demo-user",
          email: "user@example.com",
          first_name: "Demo",
          last_name: "User",
          phone: "+61 400 000 000",
          user_type: "business_owner",
          created_at: new Date().toISOString(),
        })
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">Please try again later or contact support.</p>
          <Link href="/">
            <Button>Back to Homepage</Button>
          </Link>
        </div>
      </div>
    )
  }

  const userName = `${profile.first_name || "User"} ${profile.last_name || ""}`.trim()
  const userEmail = profile.email || "N/A"
  const userPhone = profile.phone || "N/A"
  const userAvatar = profile.avatar_url || "/placeholder.svg?height=100&width=100"
  const joinDate = new Date(profile.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const userTypeBadge = profile.user_type === "business_owner" ? "Business Owner" : "Regular User"

  // Mock data for stats
  const reviewsCount = 12
  const favoritesCount = 8
  const businessesCount = profile.user_type === "business_owner" ? businesses.length : 0

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
    {
      id: "3",
      type: "business",
      title: "Business registration submitted for review",
      date: "2024/10/28",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userAvatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
                <Badge variant="secondary" className="mt-2">
                  {userTypeBadge}
                </Badge>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-2 text-sm text-gray-600 space-y-1 md:space-y-0">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {userEmail}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {userPhone}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Member since {joinDate}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{reviewsCount}</div>
              <p className="text-gray-600">Reviews Posted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">{favoritesCount}</div>
              <p className="text-gray-600">Favorites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{businessesCount}</div>
              <p className="text-gray-600">Businesses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <p className="text-gray-600">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="businesses">My Businesses</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-left flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        {activity.type === "review" && activity.rating && (
                          <Badge variant="secondary">{activity.rating} ⭐</Badge>
                        )}
                        {activity.type === "favorite" && <Heart className="w-4 h-4 text-red-500" />}
                        {activity.type === "business" && <Building2 className="w-4 h-4 text-blue-500" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/favorites">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Heart className="w-4 h-4 mr-2" />
                      View Favorites ({favoritesCount})
                    </Button>
                  </Link>

                  {profile.user_type === "business_owner" && (
                    <>
                      <Link href="/business/register">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Plus className="w-4 h-4 mr-2" />
                          Register New Business
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Business Dashboard
                      </Button>
                    </>
                  )}

                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Star className="w-4 h-4 mr-2" />
                    My Reviews ({reviewsCount})
                  </Button>

                  <Separator className="my-4" />

                  <LogoutButton />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Businesses Tab */}
          <TabsContent value="businesses" className="space-y-6">
            {profile.user_type === "business_owner" ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Businesses</h2>
                  <Link href="/business/register">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Business
                    </Button>
                  </Link>
                </div>

                {businesses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {businesses.map((business) => (
                      <Card key={business.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={business.image || "/placeholder.svg"}
                              alt={business.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 text-left">
                              <h3 className="font-semibold text-lg">{business.name}</h3>
                              <Badge
                                variant={
                                  business.status === "approved"
                                    ? "default"
                                    : business.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="mb-2"
                              >
                                {business.status}
                              </Badge>
                              <p className="text-sm text-gray-600 mb-2">{business.category}</p>
                              <div className="flex items-center text-sm text-gray-500 mb-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>
                                  {business.rating} ({business.reviewCount} reviews)
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">{business.address}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Link href={`/business/${business.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Link href={`/admin/businesses/${business.id}/edit`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Businesses Yet</h3>
                      <p className="text-gray-600 mb-6">Start by registering your first business</p>
                      <Link href="/business/register">
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Register Your First Business
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Owner Account Required</h3>
                  <p className="text-gray-600 mb-6">
                    Upgrade to a Business Owner account to register and manage businesses
                  </p>
                  <Button variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Upgrade Account
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-left">Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity
                    .concat([
                      {
                        id: "4",
                        type: "review",
                        title: "Reviewed Paradise Market",
                        date: "2024/10/25",
                        rating: 4,
                      },
                      {
                        id: "5",
                        type: "favorite",
                        title: "Added Toranj Restaurant to favorites",
                        date: "2024/10/20",
                      },
                    ])
                    .map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <div className="flex-1 text-left">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        {activity.type === "review" && activity.rating && (
                          <Badge variant="secondary">{activity.rating} ⭐</Badge>
                        )}
                        {activity.type === "favorite" && <Heart className="w-5 h-5 text-red-500" />}
                        {activity.type === "business" && <Building2 className="w-5 h-5 text-blue-500" />}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-left flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <User className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-left">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Account Type</p>
                    <p className="font-medium">{userTypeBadge}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium">{joinDate}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Email Status</p>
                    <Badge variant="default">Verified</Badge>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Account Status</p>
                    <Badge variant="default">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
