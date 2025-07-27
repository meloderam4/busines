"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus } from "lucide-react"
import Link from "next/link"
import { mockUsersData, deleteUser } from "@/lib/mock-users"
import type { User as UserType } from "@/types/user"

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load users from mock data
    setTimeout(() => {
      setUsers(mockUsersData)
      setLoading(false)
    }, 500)
  }, [])

  const handleDeleteUser = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const success = await deleteUser(id)
      if (success) {
        setUsers(users.filter((user) => user.id !== id))
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Link href="/admin/users/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
                <p>
                  <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <Badge variant={user.isActive ? "default" : "destructive"} className="text-xs">
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/users/${user.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)} className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <Plus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No users found</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first user.</p>
          <Link href="/admin/users/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add First User
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
