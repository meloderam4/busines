"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Upload, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function BusinessRegisterPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    workingHours: "",
    services: [] as string[],
    images: [] as string[],
  })
  const [newService, setNewService] = useState("")
  const [isPremium, setIsPremium] = useState(false)

  const categories = [
    "رستوران و کافه",
    "زیبایی و آرایشگاه",
    "خرید و فروشگاه",
    "خدمات خودرو",
    "پزشکی و درمانی",
    "آموزشی",
    "ورزشی",
    "املاک",
    "حمل و نقل",
    "سایر",
  ]

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }))
      setNewService("")
    }
  }

  const handleRemoveService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit the form data to your backend
    console.log("Submitting business registration:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              بیزینس یاب
            </Link>
            <Link href="/">
              <Button variant="outline">بازگشت به صفحه اصلی</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ثبت کسب‌وکار جدید</h1>
          <p className="text-gray-600">کسب‌وکار خود را ثبت کنید و مشتریان بیشتری پیدا کنید</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-right">اطلاعات پایه</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName" className="text-right block mb-2">
                      نام کسب‌وکار *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                      placeholder="نام کسب‌وکار خود را وارد کنید"
                      className="text-right"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-right block mb-2">
                      دسته‌بندی *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-right block mb-2">
                      توضیحات *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="توضیحات کاملی از کسب‌وکار خود ارائه دهید"
                      className="text-right min-h-[100px]"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-right">اطلاعات تماس</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-right block mb-2">
                      آدرس کامل *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="آدرس کامل کسب‌وکار خود را وارد کنید"
                      className="text-right"
                      required
                    />
                    <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      انتخاب روی نقشه
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-right block mb-2">
                        شماره تلفن *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
                        className="text-right"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-right block mb-2">
                        ایمیل
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="info@business.com"
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website" className="text-right block mb-2">
                        وب‌سایت
                      </Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                        placeholder="https://www.business.com"
                        className="text-right"
                      />
                    </div>

                    <div>
                      <Label htmlFor="workingHours" className="text-right block mb-2">
                        ساعات کاری
                      </Label>
                      <Input
                        id="workingHours"
                        value={formData.workingHours}
                        onChange={(e) => setFormData((prev) => ({ ...prev, workingHours: e.target.value }))}
                        placeholder="شنبه تا پنج‌شنبه ۹-۱۸"
                        className="text-right"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-right">خدمات ارائه‌شده</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      placeholder="خدمت جدید را وارد کنید"
                      className="text-right"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddService())}
                    />
                    <Button type="button" onClick={handleAddService}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {service}
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-right">تصاویر کسب‌وکار</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">تصاویر کسب‌وکار خود را آپلود کنید</p>
                    <p className="text-sm text-gray-500 mb-4">حداکثر ۵ تصویر، هر کدام حداکثر ۵ مگابایت</p>
                    <Button type="button" variant="outline">
                      انتخاب فایل
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                ثبت کسب‌وکار
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Premium Package */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-right text-yellow-800">بسته ویژه</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="premium" checked={isPremium} onCheckedChange={setIsPremium} />
                  <Label htmlFor="premium" className="text-sm">
                    فعال‌سازی بسته ویژه (۵۰,۰۰۰ تومان/ماه)
                  </Label>
                </div>

                <div className="space-y-2 text-sm text-yellow-800">
                  <p>✓ نمایش در صفحه اول</p>
                  <p>✓ نشان ویژه</p>
                  <p>✓ آمار بازدید</p>
                  <p>✓ پشتیبانی اولویت‌دار</p>
                </div>

                {isPremium && (
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    پرداخت آنلاین
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">راهنما</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p className="text-right">• تمام فیلدهای ستاره‌دار اجباری هستند</p>
                <p className="text-right">• تصاویر با کیفیت بالا آپلود کنید</p>
                <p className="text-right">• توضیحات کامل و جذاب بنویسید</p>
                <p className="text-right">• اطلاعات تماس را دقیق وارد کنید</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
