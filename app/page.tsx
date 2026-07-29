"use client"

import { useMemo, useState } from "react"
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CreditCard,
  Globe2,
  LayoutTemplate,
  Package,
  Palette,
  Rocket,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Wand2,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const storeTypes = ["پوشاک", "زیبایی", "خوراکی", "دیجیتال", "هنر دست‌ساز", "خدمات"]

const palettes = [
  {
    name: "مشکی مینیمال",
    accent: "bg-zinc-950",
    button: "bg-zinc-950 hover:bg-zinc-800",
    badge: "border-zinc-200 bg-zinc-50 text-zinc-800",
    surface: "from-zinc-100 to-white",
    text: "text-zinc-950",
  },
  {
    name: "سبز آرام",
    accent: "bg-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    surface: "from-emerald-50 to-white",
    text: "text-emerald-900",
  },
  {
    name: "آبی لوکس",
    accent: "bg-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    badge: "border-blue-200 bg-blue-50 text-blue-800",
    surface: "from-blue-50 to-white",
    text: "text-blue-950",
  },
]

const launchSteps = [
  "نام و دسته فروشگاه را وارد کن",
  "چند محصول اول را اضافه کن",
  "روش پرداخت و ارسال را انتخاب کن",
  "پیش‌نمایش را ببین و منتشر کن",
]

const featureCards = [
  {
    icon: LayoutTemplate,
    title: "قالب‌های مینیمال",
    description: "فروشگاه با صفحه محصول، سبد خرید، بنر معرفی و بخش اعتماد آماده می‌شود.",
  },
  {
    icon: CreditCard,
    title: "آماده پرداخت",
    description: "جایگاه اتصال پرداخت آنلاین، کارت‌به‌کارت و سفارش از واتساپ از ابتدا دیده شده است.",
  },
  {
    icon: Truck,
    title: "ارسال ساده",
    description: "گزینه‌های ارسال شهری، پستی یا تحویل حضوری بدون پیچیدگی قابل تنظیم هستند.",
  },
  {
    icon: ShieldCheck,
    title: "اعتمادسازی سریع",
    description: "نشان ضمانت، قوانین مرجوعی و اطلاعات تماس در قالب فروشگاه برجسته می‌شوند.",
  },
]

const plans = [
  {
    name: "شروع",
    price: "رایگان",
    description: "برای تست ایده و ساخت اولین ویترین",
    perks: ["۱ قالب آماده", "تا ۱۰ محصول", "سفارش از واتساپ"],
  },
  {
    name: "رشد",
    price: "۲۹۰ هزار تومان",
    description: "برای فروشگاه‌هایی که آماده فروش جدی هستند",
    perks: ["دامنه اختصاصی", "پرداخت آنلاین", "گزارش سفارش‌ها"],
    highlighted: true,
  },
  {
    name: "حرفه‌ای",
    price: "سفارشی",
    description: "برای برندهایی که چند کانال فروش می‌خواهند",
    perks: ["طراحی اختصاصی", "اتصال انبار", "پشتیبانی اولویت‌دار"],
  },
]

export default function HomePage() {
  const [storeName, setStoreName] = useState("گالری مینیمال")
  const [storeType, setStoreType] = useState(storeTypes[0])
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [products, setProducts] = useState("کیف چرمی دست‌دوز\nتی‌شرت سفید ساده\nشمع معطر وانیلی")
  const [delivery, setDelivery] = useState("ارسال پستی و پیک شهری")
  const [payment, setPayment] = useState("پرداخت آنلاین و کارت‌به‌کارت")
  const [whatsapp, setWhatsapp] = useState("0912 000 0000")

  const palette = palettes[paletteIndex]

  const productList = useMemo(
    () =>
      products
        .split("\n")
        .map((product) => product.trim())
        .filter(Boolean)
        .slice(0, 4),
    [products],
  )

  const completionScore = useMemo(() => {
    const fields = [storeName, storeType, products, delivery, payment, whatsapp]
    return Math.round((fields.filter((field) => field.trim().length > 0).length / fields.length) * 100)
  }, [delivery, payment, products, storeName, storeType, whatsapp])

  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/80 via-background to-background">
        <div className="absolute left-0 top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-10 top-32 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="space-y-8">
            <Badge className="w-fit gap-2 border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
              <Sparkles className="h-4 w-4" />
              فروشگاه اینترنتی مینیمال در چند دقیقه
            </Badge>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                فروشگاه‌ساز ساده برای آدم‌هایی که می‌خواهند سریع آنلاین بفروشند.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                کاربران وارد می‌شوند، نام برند و چند محصول را می‌نویسند، قالب مینیمال را انتخاب می‌کنند و یک ویترین آماده
                فروش با پرداخت، ارسال و راه ارتباطی می‌گیرند.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6">
                <a href="#builder">
                  شروع ساخت فروشگاه
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 bg-background/80 px-6">
                <a href="#preview">دیدن پیش‌نمایش زنده</a>
              </Button>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-3 text-center sm:text-right">
              {[
                ["۳ دقیقه", "تا اولین پیش‌نمایش"],
                ["بدون کدنویسی", "برای فروشنده‌ها"],
                ["آماده Vercel", "برای انتشار سریع"],
              ].map(([value, label]) => (
                <Card key={value} className="bg-card/80">
                  <CardContent className="p-4">
                    <div className="text-lg font-bold">{value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <StorePreview
            delivery={delivery}
            palette={palette}
            payment={payment}
            products={productList}
            storeName={storeName}
            storeType={storeType}
            whatsapp={whatsapp}
          />
        </div>
      </section>

      <section id="builder" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="outline" className="w-fit gap-2">
              <Wand2 className="h-4 w-4" />
              سازنده فروشگاه
            </Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">همین‌جا فروشگاه نمونه را بساز</h2>
            <p className="text-muted-foreground leading-7">
              این MVP به کاربر نشان می‌دهد ساخت فروشگاه چقدر کم‌اصطکاک است: چند ورودی کوتاه، انتخاب ظاهر، و پیش‌نمایشی
              که همزمان تغییر می‌کند.
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings2 className="h-5 w-5 text-primary" />
                  اطلاعات اولیه
                </CardTitle>
                <Badge variant="secondary">{completionScore}% آماده</Badge>
              </div>
              <Progress value={completionScore} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name">نام فروشگاه</Label>
                  <Input
                    id="store-name"
                    value={storeName}
                    onChange={(event) => setStoreName(event.target.value)}
                    placeholder="مثلاً: گالری مینیمال"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">شماره واتساپ/تماس</Label>
                  <Input
                    id="whatsapp"
                    value={whatsapp}
                    onChange={(event) => setWhatsapp(event.target.value)}
                    placeholder="0912 ..."
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>دسته فروشگاه</Label>
                <div className="flex flex-wrap gap-2">
                  {storeTypes.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={storeType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStoreType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>استایل بصری</Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {palettes.map((item, index) => (
                    <Button
                      key={item.name}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-auto justify-start gap-3 p-3",
                        paletteIndex === index && "border-primary bg-primary/5",
                      )}
                      onClick={() => setPaletteIndex(index)}
                    >
                      <span className={cn("h-5 w-5 rounded-full", item.accent)} />
                      <span>{item.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="products">محصولات اولیه، هر خط یک محصول</Label>
                <Textarea
                  id="products"
                  value={products}
                  onChange={(event) => setProducts(event.target.value)}
                  className="min-h-28"
                  placeholder="نام محصولات را خط به خط بنویس"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="delivery">روش ارسال</Label>
                  <Input id="delivery" value={delivery} onChange={(event) => setDelivery(event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment">روش پرداخت</Label>
                  <Input id="payment" value={payment} onChange={(event) => setPayment(event.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="preview" className="lg:sticky lg:top-24 lg:self-start">
          <StorePreview
            delivery={delivery}
            palette={palette}
            payment={payment}
            products={productList}
            storeName={storeName}
            storeType={storeType}
            whatsapp={whatsapp}
          />
        </div>
      </section>

      <section id="features" className="border-y bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit gap-2 bg-background">
                <Zap className="h-4 w-4" />
                امکانات محصول
              </Badge>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">از ویترین تا سفارش، بدون شلوغی.</h2>
              <p className="leading-7 text-muted-foreground">
                تمرکز روی تجربه‌ای است که فروشنده تازه‌کار هم بتواند با آن کار کند و مشتری هم سریع به خرید برسد.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featureCards.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title}>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="space-y-5 p-6 sm:p-8">
                  <Badge variant="outline" className="w-fit gap-2">
                    <Rocket className="h-4 w-4" />
                    مسیر انتشار
                  </Badge>
                  <h2 className="text-2xl font-black">فرآیند ساخت برای کاربر نهایی</h2>
                  <div className="space-y-4">
                    {launchSteps.map((step, index) => (
                      <div key={step} className="flex gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-7 text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-zinc-950 p-6 text-white sm:p-8">
                  <div className="mb-6 flex items-center gap-2 text-sm text-zinc-300">
                    <Globe2 className="h-4 w-4" />
                    deploy-ready
                  </div>
                  <pre className="overflow-hidden rounded-2xl bg-white/10 p-4 text-left text-xs leading-6 text-emerald-200" dir="ltr">
                    <code>{`storefront.build()
  .theme("minimal")
  .payments(["online", "card"])
  .deploy("vercel")`}</code>
                  </pre>
                  <p className="mt-6 text-sm leading-7 text-zinc-300">
                    ساختار صفحه برای انتشار سریع روی Vercel آماده است و می‌تواند در مرحله بعد به دیتابیس، احراز هویت و
                    پرداخت واقعی وصل شود.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                چیزهایی که فروشنده می‌بیند
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                "داشبورد سفارش‌ها",
                "ویرایش محصولات",
                "لینک فروشگاه",
                "وضعیت پرداخت",
                "تنظیم ارسال",
                "پیام مشتری",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border bg-card p-3 text-sm">
                  <Check className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="pricing" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl space-y-4">
            <Badge className="w-fit bg-white/10 text-white hover:bg-white/10">پلن‌های پیشنهادی</Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">قیمت‌گذاری ساده برای شروع سریع.</h2>
            <p className="leading-7 text-zinc-300">
              این بخش برای نسخه اولیه محصول آماده شده تا مسیر درآمدی فروشگاه‌ساز شفاف باشد.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={cn("border-white/10 bg-white/5 text-white", plan.highlighted && "bg-white text-zinc-950")}>
                <CardContent className="space-y-6 p-6">
                  <div>
                    <Badge variant={plan.highlighted ? "default" : "outline"} className={cn(!plan.highlighted && "border-white/20 text-white")}>
                      {plan.name}
                    </Badge>
                    <div className="mt-5 text-2xl font-black">{plan.price}</div>
                    <p className={cn("mt-2 text-sm leading-6", plan.highlighted ? "text-zinc-600" : "text-zinc-300")}>
                      {plan.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {plan.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500" />
                        {perk}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant={plan.highlighted ? "default" : "secondary"}>
                    انتخاب پلن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

type PaletteConfig = (typeof palettes)[number]

function StorePreview({
  delivery,
  palette,
  payment,
  products,
  storeName,
  storeType,
  whatsapp,
}: {
  delivery: string
  palette: PaletteConfig
  payment: string
  products: string[]
  storeName: string
  storeType: string
  whatsapp: string
}) {
  const visibleProducts = products.length > 0 ? products : ["محصول نمونه"]

  return (
    <Card className="overflow-hidden border-2 bg-card shadow-2xl shadow-primary/10">
      <CardContent className="p-0">
        <div className={cn("bg-gradient-to-br p-5 sm:p-6", palette.surface)}>
          <div className="rounded-[2rem] border bg-white p-4 shadow-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl text-white", palette.accent)}>
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <div className={cn("font-black", palette.text)}>{storeName || "نام فروشگاه"}</div>
                  <div className="text-xs text-zinc-500">{storeType || "دسته فروشگاه"}</div>
                </div>
              </div>
              <Badge variant="outline" className={palette.badge}>
                آنلاین
              </Badge>
            </div>

            <div className="rounded-3xl bg-zinc-950 p-5 text-white">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShoppingBag className="h-4 w-4" />
                کالکشن تازه
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight">خرید ساده از {storeName || "فروشگاه شما"}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">محصولات منتخب، سفارش سریع و تجربه‌ای مینیمال برای مشتری.</p>
              <Button size="sm" className={cn("mt-5", palette.button)}>
                مشاهده محصولات
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {visibleProducts.map((product, index) => (
                <div key={`${product}-${index}`} className="rounded-2xl border bg-zinc-50 p-3">
                  <div className={cn("mb-3 flex h-20 items-center justify-center rounded-xl text-white", index % 2 ? "bg-zinc-800" : palette.accent)}>
                    <Package className="h-6 w-6" />
                  </div>
                  <div className="line-clamp-1 text-sm font-bold text-zinc-950">{product}</div>
                  <div className="mt-1 text-xs text-zinc-500">آماده سفارش</div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3 rounded-3xl border bg-white p-4">
              <div className="flex items-start gap-3 text-sm">
                <Truck className="mt-0.5 h-4 w-4 text-zinc-500" />
                <div>
                  <div className="font-bold text-zinc-950">ارسال</div>
                  <div className="text-zinc-500">{delivery || "روش ارسال"}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CreditCard className="mt-0.5 h-4 w-4 text-zinc-500" />
                <div>
                  <div className="font-bold text-zinc-950">پرداخت</div>
                  <div className="text-zinc-500">{payment || "روش پرداخت"}</div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-100 p-3 text-sm">
                <span className="text-zinc-500">تماس سریع</span>
                <span className="font-bold text-zinc-950" dir="ltr">
                  {whatsapp || "0912 ..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
