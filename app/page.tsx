import { Suspense } from "react"
import { Search, MapPin, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getBusinesses } from "@/lib/db/businesses"
import DatabaseSetupNotice from "@/components/database-setup-notice"
import type { Business } from "@/types/business"

async function BusinessesContent() {
  const businesses = await getBusinesses({ status: "approved" })

  // If no businesses and likely database not set up, show setup notice
  if (businesses.length === 0) {
    // Try to determine if it's a database setup issue vs just no data
    try {
      // This will help us distinguish between "no data" and "no table"
      await getBusinesses()
    } catch (error) {
      return <DatabaseSetupNotice />
    }
  }

  const promotedBusinesses = businesses.filter((b) => b.isPromoted).slice(0, 6)
  const regularBusinesses = businesses.filter((b) => !b.isPromoted).slice(0, 6)

  return (
    <>
      {/* Promoted Businesses */}
      {promotedBusinesses.length > 0 && (
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Featured Businesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotedBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </section>
      )}

      {/* Regular Businesses */}
      <section>
        <h3 className="text-2xl font-bold text-foreground mb-6">All Businesses</h3>
        {regularBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No businesses found.</p>
            <Link href="/business/register">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add First Business
              </Button>
            </Link>
          </div>
        )}
      </section>
    </>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Business Finder</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <MapPin className="w-3 h-3 mr-1" />
                Location Active
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/register">
                <Button variant="outline" size="sm">
                  Login / Register
                </Button>
              </Link>
              <Link href="/business/register">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Prominent Search Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Discover Local Businesses</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Find the best services and products near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-card rounded-lg shadow-xl p-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search businesses, services, categories..."
                className="pl-12 pr-4 h-14 text-lg border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
              />
            </div>
            <Link href="/search">
              <Button size="lg" className="h-14 text-lg px-8">
                Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content - Business Listings */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Suspense fallback={<div className="text-center py-12">Loading businesses...</div>}>
          <BusinessesContent />
        </Suspense>
      </main>
    </div>
  )
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-border rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={business.image || "/placeholder.svg?height=200&width=300&query=business+listing"}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        {business.isPromoted && (
          <Badge className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 font-semibold">Featured</Badge>
        )}
        <div className="absolute bottom-3 left-3 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{business.distance || 0} km</span>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground text-left">{business.name}</CardTitle>
            <Badge variant="secondary" className="mt-1 text-muted-foreground">
              {business.category}
            </Badge>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1 text-foreground">{business.rating}</span>
            <span className="text-xs text-muted-foreground">({business.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm mb-3 text-left line-clamp-2">{business.description}</p>
        <p className="text-muted-foreground text-xs mb-3 text-left flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {business.address}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {business.services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="outline" className="text-xs text-muted-foreground border-border">
              {service}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href={`/business/${business.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
          <Button size="sm" variant="secondary">
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
