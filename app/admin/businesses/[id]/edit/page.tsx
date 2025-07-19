"use client"

import { getBusinessById } from "@/lib/mock-data"
import BusinessForm from "@/components/business-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { updateBusinessAction } from "@/app/admin/actions"

export default async function AdminEditBusinessPage({ params }: { params: { id: string } }) {
  const business = await getBusinessById(params.id)

  if (!business) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Business: {business.name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessForm initialData={business} onSubmit={updateBusinessAction} />
        </CardContent>
      </Card>
    </div>
  )
}
