import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getBusinesses } from "@/lib/db/businesses"
import Link from "next/link"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { deleteBusinessAction } from "@/app/admin/actions"

export default async function AdminBusinessesPage() {
  const businesses = await getBusinesses()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Businesses</h1>
        <Link href="/admin/businesses/new">
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Business
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Businesses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Promoted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>{business.category}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Badge variant={business.isPromoted ? "default" : "outline"}>
                      {business.isPromoted ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/businesses/${business.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={deleteBusinessAction}>
                        <input type="hidden" name="id" value={business.id} />
                        <Button variant="destructive" size="sm" type="submit">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
