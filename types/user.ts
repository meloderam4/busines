// This file defines the interface for User objects.

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  userType: "regular" | "business_owner" | "admin"
  status: "active" | "inactive" | "pending"
  createdAt: string
}
