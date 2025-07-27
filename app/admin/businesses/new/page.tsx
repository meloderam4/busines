"use client"

import BusinessForm from "@/components/business-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBusinessAction } from "@/app/admin/actions"

export default function NewBusinessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Business</h1>
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <BusinessForm onSubmit={createBusinessAction} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
