import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Star,
  Shield,
  CreditCard,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-400 font-vazir">بیزینس یاب</h3>
            </div>
            <p className="text-gray-300 text-sm text-right text-persian leading-relaxed">
              پلتفرم جامع ثبت و جست‌وجوی کسب‌وکارهای محلی با قابلیت مکان‌یاب. ما به کسب‌وکارها کمک می‌کنیم تا مشتریان بیشتری
              پیدا کنند.
            </p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-gray-300">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-vazir">بیش از ۱۰,۰۰۰ کسب‌وکار فعال</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-gray-300">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="font-vazir">تایید شده و قابل اعتماد</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-right">
            <h4 className="text-lg font-semibold font-vazir">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  جست‌وجوی کسب‌وکار
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block"
                >
                  دسته‌بندی‌ها
                </Link>
              </li>
              <li>
                <Link
                  href="/business/register"
                  className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block"
                >
                  ثبت کسب‌وکار
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  بسته‌های ویژه
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-app"
                  className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block"
                >
                  اپلیکیشن موبایل
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  وبلاگ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4 text-center sm:text-right">
            <h4 className="text-lg font-semibold font-vazir">پشتیبانی و قوانین</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  راهنما و پشتیبانی
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-gray-300 hover:text-blue-400 transition-colors font-vazir block">
                  گزارش مشکل
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4 text-center sm:text-right">
            <h4 className="text-lg font-semibold font-vazir">عضویت در خبرنامه</h4>
            <p className="text-gray-300 text-sm font-vazir">از آخرین اخبار و پیشنهادات ویژه باخبر شوید</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-right input-persian"
              />
              <Button className="btn-persian bg-blue-600 hover:bg-blue-700 w-full">عضویت در خبرنامه</Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span className="font-vazir">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="font-vazir">info@businessyab.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="font-vazir">پشتیبانی ۲۴/۷</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-gray-700" />

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center p-3 sm:p-4 bg-gray-800 rounded-lg">
            <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400 mx-auto mb-2" />
            <h5 className="font-semibold font-vazir mb-1 text-sm sm:text-base">مکان‌یابی دقیق</h5>
            <p className="text-xs sm:text-sm text-gray-300 font-vazir">پیدا کردن کسب‌وکارهای اطراف با GPS</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-gray-800 rounded-lg">
            <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-green-400 mx-auto mb-2" />
            <h5 className="font-semibold font-vazir mb-1 text-sm sm:text-base">تایید شده</h5>
            <p className="text-xs sm:text-sm text-gray-300 font-vazir">تمام کسب‌وکارها بررسی و تایید شده</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-gray-800 rounded-lg">
            <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400 mx-auto mb-2" />
            <h5 className="font-semibold font-vazir mb-1 text-sm sm:text-base">پرداخت امن</h5>
            <p className="text-xs sm:text-sm text-gray-300 font-vazir">پرداخت آنلاین با بالاترین امنیت</p>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-gray-700" />

        {/* Social Media & Bottom Info */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-sm text-gray-300 font-vazir">ما را دنبال کنید:</span>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm text-gray-300 font-vazir">© ۱۴۰۳ بیزینس یاب. تمام حقوق محفوظ است.</span>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center">
          <h4 className="text-lg sm:text-xl font-bold font-vazir mb-2">اپلیکیشن موبایل را دانلود کنید</h4>
          <p className="text-blue-100 mb-4 font-vazir text-sm sm:text-base">دسترسی آسان‌تر به کسب‌وکارهای محلی</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="secondary" className="btn-persian w-full sm:w-auto">
              <img src="/placeholder.svg?height=20&width=20" alt="Google Play" className="w-5 h-5 mr-2" />
              Google Play
            </Button>
            <Button variant="secondary" className="btn-persian w-full sm:w-auto">
              <img src="/placeholder.svg?height=20&width=20" alt="App Store" className="w-5 h-5 mr-2" />
              App Store
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
            <div className="text-xs text-gray-400 font-vazir">نماد اعتماد الکترونیکی</div>
            <div className="text-xs text-gray-400 font-vazir">ساماندهی شده</div>
            <div className="text-xs text-gray-400 font-vazir">SSL محافظت شده</div>
            <div className="text-xs text-gray-400 font-vazir">پرداخت امن</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
