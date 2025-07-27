"use client"

import { notFound } from "next/navigation"
import { getBusinessById } from "@/lib/mock-data"
import BusinessForm from "@/components/business-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateBusinessAction } from "@/app/admin/actions"

interface EditBusinessPageProps {
  params: {
    id: string
  }
}

export default function EditBusinessPage({ params }: EditBusinessPageProps) {
  const business = getBusinessById(params.id)

  if (!business) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Business: {business.name}</h1>
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <BusinessForm initialData={business} onSubmit={updateBusinessAction} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
