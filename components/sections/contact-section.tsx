import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Start Your Driving Journey?</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Get in touch with us today to book your first lesson or ask any questions about our courses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Call Us</h3>
                    <p className="text-muted-foreground">+61 2 3456 7890</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <p className="text-muted-foreground">info@actcapitaldriving.com.au</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Visit Us</h3>
                    <p className="text-muted-foreground">Lort Place, Chisholm, ACT</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Hours</h3>
                    <p className="text-muted-foreground">Mon-Sun: 7AM-7PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/booking">Book Your Lesson Now</Link>
              </Button>
              <p className="text-sm text-muted-foreground">Or call us directly for immediate assistance</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img
                src="/map-of-lort-place-chisholm-act-australia-with-loca.jpg"
                alt="Map showing ACT Capital Driving School location in Lort Place, Chisholm, ACT"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="bg-card/95 backdrop-blur-sm border shadow-lg">
                <CardContent className="p-4 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">ACT Capital Driving School</div>
                  <div className="text-sm text-muted-foreground">Lort Place, Chisholm, ACT</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
