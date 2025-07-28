"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BusinessForm from "@/components/business-form"
import { addBusinessAction } from "@/app/admin/actions"

export default function NewBusinessPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Add New Business</h1>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessForm onSubmit={addBusinessAction} />
        </CardContent>
      </Card>
    </div>
  )
}
