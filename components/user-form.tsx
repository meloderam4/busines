"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/types/user"

interface UserFormProps {
  initialData?: User
  onSubmit: (formData: FormData) => Promise<void>
}

export default function UserForm({ initialData, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    userType: initialData?.userType || ("regular" as User["userType"]),
    status: initialData?.status || ("active" as User["status"]),
    nationalId: initialData?.nationalId || "",
    phone: initialData?.phone || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)

    // Add hidden fields for existing user
    if (initialData) {
      data.set("id", initialData.id)
      data.set("createdAt", initialData.createdAt)
    }

    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-left block mb-2">
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter first name"
                className="text-left"
                required
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-left block mb-2">
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                placeholder="Enter last name"
                className="text-left"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-left block mb-2">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              className="text-left"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userType" className="text-left block mb-2">
                User Type *
              </Label>
              <Select
                value={formData.userType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, userType: value as User["userType"] }))}
                name="userType"
              >
                <SelectTrigger className="text-left">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular User</SelectItem>
                  <SelectItem value="business_owner">Business Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status" className="text-left block mb-2">
                Status *
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as User["status"] }))}
                name="status"
              >
                <SelectTrigger className="text-left">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nationalId" className="text-left block mb-2">
                National ID
              </Label>
              <Input
                id="nationalId"
                name="nationalId"
                value={formData.nationalId}
                onChange={(e) => setFormData((prev) => ({ ...prev, nationalId: e.target.value }))}
                placeholder="Enter national ID"
                className="text-left"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-left block mb-2">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
                className="text-left"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        {initialData ? "Update User" : "Add User"}
      </Button>
    </form>
  )
}
