import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { getAllBusinessesServer } from "@/lib/db/server-businesses"

export default async function AdminBusinessesPage() {
  const businesses = await getAllBusinessesServer()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Businesses</h1>
        <Link href="/admin/businesses/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Business
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {businesses.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 mb-4">No businesses found.</p>
              <Link href="/admin/businesses/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Business
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          businesses.map((business) => (
            <Card key={business.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {business.name}
                      {business.isPromoted && <Badge variant="secondary">Featured</Badge>}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{business.category}</p>
                  </div>
                  <Badge
                    variant={
                      business.status === "approved"
                        ? "default"
                        : business.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {business.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{business.description}</p>
                    <p className="text-sm">
                      <strong>Address:</strong> {business.address}
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> {business.phone}
                    </p>
                    {business.email && (
                      <p className="text-sm">
                        <strong>Email:</strong> {business.email}
                      </p>
                    )}
                    {business.website && (
                      <p className="text-sm">
                        <strong>Website:</strong>{" "}
                        <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                          {business.website}
                        </a>
                      </p>
                    )}
                  </div>
                  <div>
                    {business.workingHours && (
                      <p className="text-sm mb-2">
                        <strong>Hours:</strong> {business.workingHours}
                      </p>
                    )}
                    <p className="text-sm mb-2">
                      <strong>Rating:</strong> {business.rating}/5 ({business.reviewCount} reviews)
                    </p>
                    {business.services && business.services.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium mb-1">Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {business.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/business/${business.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </Link>
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
          ))
        )}
      </div>
    </div>
  )
}
