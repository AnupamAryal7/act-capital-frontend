import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Award, Clock, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                About Us
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                Canberra's Premier Driving School Since 2014
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                At ACT Capital Driving School, we're passionate about creating safe, confident drivers. With over a
                decade of experience, we've helped thousands of students achieve their driving goals.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2014 by experienced driving instructor John Mitchell, ACT Capital Driving School began
                    with a simple mission: to provide the highest quality driving education in Canberra.
                  </p>
                  <p>
                    What started as a one-person operation has grown into Canberra's most trusted driving school, with a
                    team of certified instructors and a fleet of modern, safe vehicles.
                  </p>
                  <p>
                    We believe that learning to drive should be an empowering experience, not a stressful one. That's
                    why we focus on building confidence alongside skills, ensuring our students become not just licensed
                    drivers, but safe and responsible ones.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/driving-school-founder-with-modern-car-and-student.jpg"
                  alt="ACT Capital Driving School founder with students"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">First-Time Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5</div>
                <div className="text-muted-foreground">Star Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These core values guide everything we do at ACT Capital Driving School.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Safety First</h3>
                  <p className="text-muted-foreground text-sm">
                    Safety is our top priority in every lesson and interaction.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Student-Centered</h3>
                  <p className="text-muted-foreground text-sm">
                    We adapt our teaching to each student's unique learning style.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Excellence</h3>
                  <p className="text-muted-foreground text-sm">
                    We strive for excellence in instruction and customer service.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Reliability</h3>
                  <p className="text-muted-foreground text-sm">
                    Punctual, professional, and dependable service every time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join the hundreds of successful students who have learned to drive with ACT Capital Driving School.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/booking">Book Your First Lesson</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
