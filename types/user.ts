export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  userType: "regular" | "business_owner" | "admin"
  status: "active" | "inactive" | "pending"
  createdAt: string
  nationalId?: string | null
  phone?: string | null
}
