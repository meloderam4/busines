import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { getAllBusinessesServer, deleteBusinessServer } from "@/lib/db/server-businesses"

export default async function BusinessesPage() {
  const businesses = await getAllBusinessesServer()

  const handleDelete = async (id: string) => {
    "use server"
    await deleteBusinessServer(id)
  }

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
            <CardContent className="flex flex-col items-center justify-center py-12">
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
                  <div className="space-y-1">
                    <p className="text-sm">{business.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>★ {business.rating}</span>
                      <span>({business.reviewCount} reviews)</span>
                      <span>{business.phone}</span>
                    </div>
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
                    <form action={handleDelete.bind(null, business.id)}>
                      <Button variant="outline" size="sm" type="submit">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
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
