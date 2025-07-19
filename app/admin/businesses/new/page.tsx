"use client"

import BusinessForm from "@/components/business-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addBusinessAction } from "@/app/admin/actions"

export default function AdminNewBusinessPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Add New Business</h1>
      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessForm onSubmit={addBusinessAction} />
        </CardContent>
      </Card>
    </div>
  )
}
