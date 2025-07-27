import { getAllBusinesses } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Star, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const businesses = getAllBusinesses()
  const totalBusinesses = businesses.length
  const approvedBusinesses = businesses.filter((b) => b.status === "approved").length
  const pendingBusinesses = businesses.filter((b) => b.status === "pending").length
  const promotedBusinesses = businesses.filter((b) => b.isPromoted).length
  const averageRating = businesses.reduce((sum, b) => sum + b.rating, 0) / businesses.length

  const stats = [
    {
      title: "Total Businesses",
      value: totalBusinesses,
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Approved",
      value: approvedBusinesses,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Pending Review",
      value: pendingBusinesses,
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Businesses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Businesses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businesses.slice(0, 5).map((business) => (
              <div key={business.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={business.image || "/placeholder.svg"}
                    alt={business.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{business.name}</h3>
                    <p className="text-sm text-gray-600">{business.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={
                      business.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : business.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {business.status}
                  </Badge>
                  {business.isPromoted && <Badge variant="secondary">Promoted</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
