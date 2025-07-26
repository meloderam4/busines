import { createClient } from "@/lib/supabase/server"
import type { User } from "@/types/user"

export async function getUsers(): Promise<User[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching users:", error)
      return []
    }

    return (
      data?.map((profile) => ({
        id: profile.id,
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.email || "",
        userType: profile.user_type || "regular",
        status: profile.status || "active",
        createdAt: profile.created_at,
        nationalId: profile.national_id,
        phone: profile.phone,
      })) || []
    )
  } catch (error) {
    console.error("Database connection error:", error)
    return []
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

    if (error || !data) {
      console.error("Error fetching user:", error)
      return null
    }

    return {
      id: data.id,
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      email: data.email || "",
      userType: data.user_type || "regular",
      status: data.status || "active",
      createdAt: data.created_at,
      nationalId: data.national_id,
      phone: data.phone,
    }
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function addUser(userData: Omit<User, "id" | "createdAt">) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        user_type: userData.userType,
        status: userData.status,
        national_id: userData.nationalId,
        phone: userData.phone,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding user:", error)
      throw new Error("Failed to add user")
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    throw new Error("Failed to add user")
  }
}

export async function updateUser(userData: User) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("profiles")
      .update({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        user_type: userData.userType,
        status: userData.status,
        national_id: userData.nationalId,
        phone: userData.phone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userData.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating user:", error)
      throw new Error("Failed to update user")
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    throw new Error("Failed to update user")
  }
}

export async function deleteUser(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("profiles").delete().eq("id", id)

    if (error) {
      console.error("Error deleting user:", error)
      throw new Error("Failed to delete user")
    }

    return true
  } catch (error) {
    console.error("Database connection error:", error)
    throw new Error("Failed to delete user")
  }
}
