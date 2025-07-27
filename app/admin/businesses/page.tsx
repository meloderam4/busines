import { getAllBusinesses } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminBusinessesPage() {
  const businesses = getAllBusinesses()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Businesses</h1>
        <Link href="/admin/businesses/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Business
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {businesses.map((business) => (
          <Card key={business.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{business.name}</CardTitle>
                  <p className="text-gray-600 mt-1">{business.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(business.status)}>{business.status}</Badge>
                  {business.isPromoted && <Badge variant="secondary">Promoted</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Address:</strong> {business.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Phone:</strong> {business.phone}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Email:</strong> {business.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Rating:</strong> {business.rating}/5 ({business.reviewCount} reviews)
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Working Hours:</strong> {business.workingHours}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Services:</strong>
                </p>
                <div className="flex flex-wrap gap-1">
                  {business.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Link href={`/admin/businesses/${business.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
