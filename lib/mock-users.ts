import type { User } from "@/types/user"

export let mockUsersData: User[] = [
  {
    id: "user1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    userType: "regular",
    status: "active",
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "user2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    userType: "business_owner",
    status: "active",
    createdAt: "2023-02-20T11:30:00Z",
  },
  {
    id: "user3",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    userType: "admin",
    status: "active",
    createdAt: "2023-03-01T09:00:00Z",
  },
  {
    id: "user4",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.j@example.com",
    userType: "regular",
    status: "pending",
    createdAt: "2024-07-20T14:00:00Z",
  },
  {
    id: "user5",
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.w@example.com",
    userType: "business_owner",
    status: "inactive",
    createdAt: "2024-06-10T16:45:00Z",
  },
]

// --- CRUD Operations for Mock User Data ---

export async function getUsers(): Promise<User[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockUsersData
}

export async function getUserById(id: string): Promise<User | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockUsersData.find((u) => u.id === id)
}

export async function addUser(newUser: Omit<User, "id" | "createdAt">): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const userWithDefaults: User = {
    id: `user${mockUsersData.length + 1}`, // Simple ID generation
    createdAt: new Date().toISOString(),
    ...newUser,
  }
  mockUsersData.push(userWithDefaults)
  return userWithDefaults
}

export async function updateUser(updatedUser: User): Promise<User | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const index = mockUsersData.findIndex((u) => u.id === updatedUser.id)
  if (index !== -1) {
    mockUsersData[index] = updatedUser
    return updatedUser
  }
  return null
}

export async function deleteUser(id: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  const initialLength = mockUsersData.length
  mockUsersData = mockUsersData.filter((u) => u.id !== id)
  return mockUsersData.length < initialLength
}
