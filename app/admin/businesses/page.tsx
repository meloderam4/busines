import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllBusinessesServer } from "@/lib/db/server-businesses"
import { deleteBusinessAction } from "@/app/admin/actions"
import Link from "next/link"
import { Trash2, Edit, Plus, Eye } from "lucide-react"

export default async function BusinessesPage() {
  const businesses = await getAllBusinessesServer()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Businesses</h1>
        <Link href="/admin/businesses/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Business
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {businesses.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No businesses found. Add your first business!</p>
              <Link href="/admin/businesses/new">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Business
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
                      {business.isPromoted && <Badge variant="secondary">Promoted</Badge>}
                      <Badge variant={business.status === "approved" ? "default" : "secondary"}>
                        {business.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {business.category} • {business.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/business/${business.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/businesses/${business.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={deleteBusinessAction.bind(null, business.id)}>
                      <Button variant="outline" size="sm" type="submit">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm">{business.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Contact</p>
                    <p className="text-sm">Phone: {business.phone}</p>
                    <p className="text-sm">Email: {business.email}</p>
                    {business.website && <p className="text-sm">Website: {business.website}</p>}
                  </div>
                </div>
                {business.services && business.services.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Services</p>
                    <div className="flex flex-wrap gap-1">
                      {business.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Rating: {business.rating}/5</span>
                  <span>Reviews: {business.reviewCount}</span>
                  <span>Created: {new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
