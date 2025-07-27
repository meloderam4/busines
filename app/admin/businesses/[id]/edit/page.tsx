"use client"

import { notFound } from "next/navigation"
import { getBusinessById } from "@/lib/mock-data"
import BusinessForm from "@/components/business-form"
import { updateBusinessAction } from "@/app/admin/actions"

interface EditBusinessPageProps {
  params: {
    id: string
  }
}

export default async function EditBusinessPage({ params }: EditBusinessPageProps) {
  const business = await getBusinessById(params.id)

  if (!business) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Business</h1>
        <BusinessForm initialData={business} onSubmit={updateBusinessAction} />
      </div>
    </div>
  )
}
