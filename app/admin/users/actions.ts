"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addUser, updateUser, deleteUser } from "@/lib/db/users"
import type { User } from "@/types/user"

export async function addUserAction(formData: FormData) {
  try {
    const data: Omit<User, "id" | "createdAt"> = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      userType: formData.get("userType") as User["userType"],
      status: formData.get("status") as User["status"],
      nationalId: (formData.get("nationalId") as string) || null,
      phone: (formData.get("phone") as string) || null,
    }

    await addUser(data)
    revalidatePath("/admin/users")
  } catch (error) {
    console.error("Error adding user:", error)
    throw error
  }

  redirect("/admin/users")
}

export async function updateUserAction(formData: FormData) {
  try {
    const data: User = {
      id: formData.get("id") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      userType: formData.get("userType") as User["userType"],
      status: formData.get("status") as User["status"],
      nationalId: (formData.get("nationalId") as string) || null,
      phone: (formData.get("phone") as string) || null,
      createdAt: formData.get("createdAt") as string,
    }

    await updateUser(data)
    revalidatePath("/admin/users")
    revalidatePath(`/admin/users/${data.id}/edit`)
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }

  redirect("/admin/users")
}

export async function deleteUserAction(formData: FormData) {
  try {
    const id = formData.get("id") as string
    await deleteUser(id)
    revalidatePath("/admin/users")
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}
