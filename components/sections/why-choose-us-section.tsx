import { Card, CardContent } from "@/components/ui/card"
import { Users, Car, Clock, Trophy, Shield, MapPin } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Professional Instructors",
    description: "Fully licensed and experienced instructors with proven track records in driver education.",
  },
  {
    icon: Car,
    title: "Modern Vehicles",
    description: "Learn in safe, well-maintained vehicles equipped with dual controls and latest safety features.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book lessons at times that suit you, including evenings and weekends.",
  },
  {
    icon: Trophy,
    title: "High Pass Rates",
    description: "95% of our students pass their driving test on the first attempt with our proven methods.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Complete insurance coverage for your peace of mind during every lesson.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description: "Expert knowledge of Canberra roads and test routes to give you the best preparation.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose ACT Capital Driving School?</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            We're committed to providing the highest quality driving education in Canberra. Here's what sets us apart
            from other driving schools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
