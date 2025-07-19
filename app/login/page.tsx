"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the login logic
    console.log("Login data:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600 mb-8 block">
            بیزینس یاب
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">ورود به حساب کاربری</h2>
          <p className="mt-2 text-gray-600">به حساب کاربری خود وارد شوید</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-right block mb-2">
                  ایمیل *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="example@email.com"
                  className="text-right"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-right block mb-2">
                  رمز عبور *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="text-right pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  فراموشی رمز عبور؟
                </Link>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    مرا به خاطر بسپار
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full">
                ورود
              </Button>

              <Separator className="my-4" />

              <div className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent" type="button">
                  ورود با گوگل
                </Button>
                <Button variant="outline" className="w-full bg-transparent" type="button">
                  ورود با اپل
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  حساب کاربری ندارید؟{" "}
                  <Link href="/register" className="text-blue-600 hover:underline font-medium">
                    ثبت‌نام کنید
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm text-green-800 text-center">🔒 اطلاعات شما با بالاترین سطح امنیت محافظت می‌شود</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
