"use client"

import { getUserById } from "@/lib/db/users"
import UserForm from "@/components/user-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { updateUserAction } from "@/app/admin/users/actions"

export default async function AdminEditUserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Edit User: {user.firstName} {user.lastName}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm initialData={user} onSubmit={updateUserAction} />
        </CardContent>
      </Card>
    </div>
  )
}
