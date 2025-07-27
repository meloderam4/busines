"use client"

import BusinessForm from "@/components/business-form"
import { addBusinessAction } from "@/app/admin/actions"

export default function NewBusinessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Business</h1>
        <BusinessForm onSubmit={addBusinessAction} />
      </div>
    </div>
  )
}
