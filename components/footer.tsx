import { Github, Instagram, Mail, MessageCircle, ShieldCheck, Sparkles, Store, Zap } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  {
    title: "محصول",
    links: [
      { href: "/#builder", label: "سازنده فروشگاه" },
      { href: "/#features", label: "امکانات" },
      { href: "/#pricing", label: "قیمت‌گذاری" },
    ],
  },
  {
    title: "برای فروشنده‌ها",
    links: [
      { href: "/register", label: "ساخت حساب" },
      { href: "/login", label: "ورود" },
      { href: "/business/register", label: "ثبت کسب‌وکار" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { href: "mailto:hello@storeyar.app", label: "hello@storeyar.app" },
      { href: "#", label: "راهنمای شروع" },
      { href: "#", label: "قوانین استفاده" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            <Link href="/" className="flex w-fit items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Store className="h-5 w-5" />
              </span>
              <span className="text-2xl font-black">فروشگاه‌یار</span>
            </Link>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              فروشگاه‌ساز مینیمال برای ساخت ویترین آنلاین، گرفتن سفارش، معرفی محصول و انتشار سریع روی Vercel.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Zap, label: "راه‌اندازی سریع" },
                { icon: ShieldCheck, label: "اعتمادسازی آماده" },
                { icon: Sparkles, label: "طراحی مینیمال" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs">
                    <Icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="font-bold">{group.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">© 2026 فروشگاه‌یار. همه حقوق محفوظ است.</div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
              <Link href="mailto:hello@storeyar.app" aria-label="ایمیل">
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href="#" aria-label="اینستاگرام">
                <Instagram className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href="#" aria-label="گفتگو">
                <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href="#" aria-label="گیت‌هاب">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
