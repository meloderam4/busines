import UserForm from "@/components/user-form"

export default function NewUserPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New User</h1>
        <UserForm />
      </div>
    </div>
  )
}
