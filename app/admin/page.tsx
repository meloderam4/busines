import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Star, Clock } from "lucide-react"
import { getBusinesses } from "@/lib/mock-data"
import { getUsers } from "@/lib/mock-users" // Import getUsers

export default async function AdminDashboardPage() {
  const businesses = await getBusinesses()
  const users = await getUsers() // Fetch users
  const totalBusinesses = businesses.length
  const pendingBusinesses = businesses.filter((b) => b.status === "pending").length
  const approvedBusinesses = businesses.filter((b) => b.status === "approved").length
  const totalReviews = businesses.reduce((sum, b) => sum + b.reviewCount, 0)
  const totalUsers = users.length // Get total users

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBusinesses}</div>
            <p className="text-xs text-gray-500">+{approvedBusinesses} approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBusinesses}</div>
            <p className="text-xs text-gray-500">New businesses awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-gray-500">Across all businesses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-gray-500">+180 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* You can add more sections here, e.g., recent activities, charts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No recent activity to display.</p>
        </CardContent>
      </Card>
    </div>
  )
}
