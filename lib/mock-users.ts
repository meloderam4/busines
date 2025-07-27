export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "user" | "moderator"
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    role: "user",
    isActive: true,
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-21T15:30:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    role: "moderator",
    isActive: false,
    createdAt: "2024-01-17T12:00:00Z",
    updatedAt: "2024-01-22T16:30:00Z",
  },
]

export async function getAllUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockUsers
}

export async function getUserById(id: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockUsers.find((user) => user.id === id) || null
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const newUser: User = {
    ...userData,
    id: (mockUsers.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)
  return newUser
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = mockUsers.findIndex((user) => user.id === id)
  if (index === -1) return null

  mockUsers[index] = {
    ...mockUsers[index],
    ...userData,
    updatedAt: new Date().toISOString(),
  }

  return mockUsers[index]
}

export async function deleteUser(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = mockUsers.findIndex((user) => user.id === id)
  if (index === -1) return false

  mockUsers.splice(index, 1)
  return true
}
