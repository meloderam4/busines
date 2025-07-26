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
    <footer className="bg-card text-foreground mt-12 border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">Business Finder</h3>
            </div>
            <p className="text-muted-foreground text-sm text-left leading-relaxed">
              A comprehensive platform for registering and searching local businesses with location-based features. We
              help businesses find more customers.
            </p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Over 10,000 active businesses</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Verified and trusted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors block">
                  Search Businesses
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors block">
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/business/register"
                  className="text-muted-foreground hover:text-primary transition-colors block"
                >
                  Register Business
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-muted-foreground hover:text-primary transition-colors block">
                  Premium Packages
                </Link>
              </li>
              <li>
                <Link href="/mobile-app" className="text-muted-foreground hover:text-primary transition-colors block">
                  Mobile App
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-lg font-semibold">Support & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors block">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-muted-foreground hover:text-primary transition-colors block">
                  Report an Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-muted-foreground text-sm">Stay updated with our latest news and special offers</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary border-border text-foreground placeholder-muted-foreground text-left"
              />
              <Button className="w-full">Subscribe</Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@businessfinder.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-border" />

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center p-3 sm:p-4 bg-secondary rounded-lg">
            <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-2" />
            <h5 className="font-semibold mb-1 text-sm sm:text-base">Accurate Location</h5>
            <p className="text-xs sm:text-sm text-muted-foreground">Find nearby businesses with GPS</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-secondary rounded-lg">
            <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-green-500 mx-auto mb-2" />
            <h5 className="font-semibold mb-1 text-sm sm:text-base">Verified Businesses</h5>
            <p className="text-xs sm:text-sm text-muted-foreground">All businesses are reviewed and verified</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-secondary rounded-lg">
            <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500 mx-auto mb-2" />
            <h5 className="font-semibold mb-1 text-sm sm:text-base">Secure Payment</h5>
            <p className="text-xs sm:text-sm text-muted-foreground">Online payment with highest security</p>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-border" />

        {/* Social Media & Bottom Info */}
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex space-x-3">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm text-muted-foreground">
              © 2024 Business Finder. All rights reserved.
            </span>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-primary text-primary-foreground rounded-lg text-center">
          <h4 className="text-lg sm:text-xl font-bold mb-2">Download the Mobile App</h4>
          <p className="opacity-90 mb-4 text-sm sm:text-base">Easier access to local businesses</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="secondary" className="w-full sm:w-auto text-foreground">
              <img src="/placeholder.svg?height=20&width=20" alt="Google Play" className="w-5 h-5 mr-2" />
              Google Play
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto text-foreground">
              <img src="/placeholder.svg?height=20&width=20" alt="App Store" className="w-5 h-5 mr-2" />
              App Store
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-secondary py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
            <div className="text-xs text-muted-foreground">E-Trust Symbol</div>
            <div className="text-xs text-muted-foreground">Organized</div>
            <div className="text-xs text-muted-foreground">SSL Protected</div>
            <div className="text-xs text-muted-foreground">Secure Payment</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
