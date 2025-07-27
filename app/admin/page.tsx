import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Star, Clock, TrendingUp, ShieldCheck, XCircle, MoreHorizontal } from "lucide-react"
import { getBusinesses } from "@/lib/db/businesses"
import { getUsers } from "@/lib/db/users"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { updateBusinessStatusAction } from "@/app/admin/actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const businesses = await getBusinesses()
  const users = await getUsers()

  const totalUsers = users.length
  const activeBusinesses = businesses.filter((b) => b.status === "approved").length
  const totalReviews = businesses.reduce((sum, b) => sum + b.reviewCount, 0)
  const monthlyRevenue = 24680 // Mock data for now

  const pendingBusinesses = businesses.filter((b) => b.status === "pending")
  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src="/placeholder.svg?height=32&width=32" alt="Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-900">Persian Hub</h1>
          </div>
          <span className="text-gray-600 text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-blue-300 text-blue-700 bg-blue-50">
            <ShieldCheck className="w-4 h-4 mr-1" />
            Admin Access
          </Badge>
          <Button variant="ghost" size="sm">
            Close
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-sm rounded-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            <Users className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12.5%</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm rounded-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Businesses</CardTitle>
            <Building2 className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-900">{activeBusinesses.toLocaleString()}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+8.2%</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm rounded-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
            <Star className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-900">{totalReviews.toLocaleString()}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+15.3%</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm rounded-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
            <Clock className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-gray-900">${monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+22.1%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-gray-200 rounded-lg p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r-dashboard data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base font-medium"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="businesses"
            className="data-[state=active]:bg-gradient-to-r-dashboard data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base font-medium"
            asChild
          >
            <Link href="/admin/businesses">Businesses</Link>
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-gradient-to-r-dashboard data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base font-medium"
            asChild
          >
            <Link href="/admin/users">Users</Link>
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-gradient-to-r-dashboard data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-base font-medium"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Business Approvals */}
          <Card className="bg-white shadow-sm rounded-lg p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 text-left">Pending Business Approvals</CardTitle>
              <p className="text-sm text-gray-600 text-left">Businesses waiting for verification</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingBusinesses.length > 0 ? (
                pendingBusinesses.map((business) => (
                  <div key={business.id} className="flex items-center justify-between p-4 bg-dashboard-gray rounded-lg">
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-900">{business.name}</h4>
                      <p className="text-sm text-gray-600">
                        {business.category} • {business.address.split(",")[1]?.trim() || business.address}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted:{" "}
                        {new Date(business.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <form action={updateBusinessStatusAction}>
                        <input type="hidden" name="id" value={business.id} />
                        <input type="hidden" name="status" value="approved" />
                        <Button type="submit" className="bg-dashboard-green text-white hover:bg-dashboard-green/90">
                          <ShieldCheck className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </form>
                      <form action={updateBusinessStatusAction}>
                        <input type="hidden" name="id" value={business.id} />
                        <input type="hidden" name="status" value="rejected" />
                        <Button type="submit" className="bg-dashboard-red text-white hover:bg-dashboard-red/90">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No pending business approvals.</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="bg-white shadow-sm rounded-lg p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 text-left">Recent Users</CardTitle>
              <p className="text-sm text-gray-600 text-left">Newly registered users</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-dashboard-gray rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar_url || "/placeholder.svg?height=40&width=40&query=user+avatar"} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">{user.firstName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Joined:{" "}
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          user.status === "active"
                            ? "bg-dashboard-green text-white"
                            : user.status === "pending"
                              ? "bg-dashboard-yellow text-white"
                              : "bg-dashboard-red text-white"
                        }
                      >
                        {user.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No recent users.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
