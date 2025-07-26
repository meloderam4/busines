"use client"

import UserForm from "@/components/user-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addUserAction } from "@/app/admin/users/actions"

export default function AdminNewUserPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm onSubmit={addUserAction} />
        </CardContent>
      </Card>
    </div>
  )
}
