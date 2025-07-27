import { notFound } from "next/navigation"
import { getUserById } from "@/lib/mock-users"
import UserForm from "@/components/user-form"

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const user = await getUserById(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit User</h1>
        <UserForm user={user} />
      </div>
    </div>
  )
}
