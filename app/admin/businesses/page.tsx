import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { getAllBusinessesServer } from "@/lib/db/server-businesses"

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
        {businesses.length === 0 ? (
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
        ) : (
          businesses.map((business) => (
            <Card key={business.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {business.name}
                      {business.isPromoted && <Badge variant="secondary">Promoted</Badge>}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {business.category} • {business.address}
                    </p>
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
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <p>Phone: {business.phone}</p>
                    <p>
                      Rating: {business.rating}/5 ({business.reviewCount} reviews)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/business/${business.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/businesses/${business.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
