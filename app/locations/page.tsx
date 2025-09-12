import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LocationFinder } from "@/components/location-finder"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Car } from "lucide-react"

export default function LocationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                Our Locations
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">Find Your Nearest Location</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                We serve all areas of Canberra with convenient pickup points and flexible scheduling. Find the location
                that works best for you.
              </p>
            </div>
          </div>
        </section>

        {/* Location Finder */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <LocationFinder />
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Service Areas</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide driving lessons across all major suburbs in the ACT.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { area: "Tuggeranong", suburbs: ["Chisholm", "Richardson", "Calwell", "Wanniassa"] },
                { area: "Woden Valley", suburbs: ["Woden", "Curtin", "Hughes", "Garran"] },
                { area: "Belconnen", suburbs: ["Belconnen", "Bruce", "Hawker", "Page"] },
                { area: "Inner Canberra", suburbs: ["Civic", "Braddon", "Turner", "Lyneham"] },
              ].map((region) => (
                <Card key={region.area} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{region.area}</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {region.suburbs.map((suburb) => (
                        <li key={suburb}>• {suburb}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Car className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Flexible Pickup</h3>
                  <p className="text-sm text-muted-foreground">
                    We can pick you up from your home, school, or any convenient location within our service areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Extended Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Available 7 days a week from 7:00 AM to 7:00 PM to fit your busy schedule.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Easy Booking</h3>
                  <p className="text-sm text-muted-foreground">
                    Book online or call us directly. We'll confirm your lesson and pickup details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
