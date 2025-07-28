import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { getAllBusinessesServer } from "@/lib/db/server-businesses"
import { deleteBusinessAction } from "@/app/admin/actions"

export default async function BusinessesPage() {
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
        {businesses.map((business) => (
          <Card key={business.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {business.name}
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
                    {business.isPromoted && <Badge variant="outline">Promoted</Badge>}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{business.category}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/businesses/${business.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <form action={deleteBusinessAction}>
                    <input type="hidden" name="id" value={business.id} />
                    <Button variant="outline" size="sm" type="submit">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{business.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm">{business.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm">{business.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-sm">
                    {business.rating}/5 ({business.reviewCount} reviews)
                  </p>
                </div>
              </div>
              {business.services.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Services</p>
                  <div className="flex flex-wrap gap-1">
                    {business.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {businesses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">No businesses found</p>
              <Link href="/admin/businesses/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Business
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
