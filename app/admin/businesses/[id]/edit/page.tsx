"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BusinessForm } from "@/components/business-form"
import { updateBusinessAction } from "@/app/admin/actions"
import { getBusinessByIdServer } from "@/lib/db/server-businesses"
import { notFound } from "next/navigation"

interface EditBusinessPageProps {
  params: {
    id: string
  }
}

export default async function EditBusinessPage({ params }: EditBusinessPageProps) {
  const business = await getBusinessByIdServer(params.id)

  if (!business) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Edit Business</h1>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessForm business={business} onSubmit={updateBusinessAction} />
        </CardContent>
      </Card>
    </div>
  )
}
