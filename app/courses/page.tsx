import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Clock, DollarSign, Users, CheckCircle } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Beginner Driver Course",
    description:
      "Perfect for first-time drivers. Learn the fundamentals of safe driving with our comprehensive beginner program.",
    duration: "10 lessons",
    price: "$650",
    image: "/beginner-driver-learning-in-car-with-instructor.jpg",
    popular: true,
    features: [
      "Theory and practical lessons",
      "Road rules and regulations",
      "Basic maneuvers and parking",
      "Highway driving preparation",
      "Pre-test assessment",
    ],
    suitable: "Ages 16+ with learner's permit",
  },
  {
    id: 2,
    title: "Refresher Course",
    description: "Haven't driven in a while? Our refresher course will help you regain confidence behind the wheel.",
    duration: "5 lessons",
    price: "$350",
    image: "/adult-refresher-driving-lesson-in-modern-car.jpg",
    popular: false,
    features: [
      "Confidence building exercises",
      "Updated road rules review",
      "Practical skills assessment",
      "City and suburban driving",
      "Parking practice",
    ],
    suitable: "Licensed drivers returning to driving",
  },
  {
    id: 3,
    title: "Test Preparation",
    description: "Intensive preparation for your driving test. Practice test routes and perfect your driving skills.",
    duration: "3 lessons",
    price: "$220",
    image: "/driving-test-preparation-with-instructor.jpg",
    popular: true,
    features: [
      "Official test route practice",
      "Mock driving tests",
      "Last-minute tips and techniques",
      "Anxiety management strategies",
      "Test day preparation",
    ],
    suitable: "Learners ready for their driving test",
  },
  {
    id: 4,
    title: "Defensive Driving",
    description: "Advanced course focusing on defensive driving techniques and hazard awareness.",
    duration: "6 lessons",
    price: "$420",
    image: "/defensive-driving-course-with-instructor.jpg",
    popular: false,
    features: [
      "Hazard perception training",
      "Emergency braking techniques",
      "Weather condition driving",
      "Night driving skills",
      "Advanced road positioning",
    ],
    suitable: "Licensed drivers seeking advanced skills",
  },
  {
    id: 5,
    title: "Highway Driving Course",
    description: "Specialized training for highway and freeway driving confidence.",
    duration: "4 lessons",
    price: "$280",
    image: "/highway-driving-lesson-on-freeway.jpg",
    popular: false,
    features: [
      "Merging and lane changing",
      "High-speed driving techniques",
      "Highway navigation",
      "Traffic flow management",
      "Exit and entry strategies",
    ],
    suitable: "Drivers comfortable with city driving",
  },
  {
    id: 6,
    title: "Senior Driver Course",
    description: "Tailored lessons for mature drivers looking to update their skills.",
    duration: "5 lessons",
    price: "$350",
    image: "/senior-driver-lesson-with-patient-instructor.jpg",
    popular: false,
    features: [
      "Modern vehicle technology",
      "Updated road rules",
      "Confidence building",
      "Physical adaptation techniques",
      "Safe driving assessment",
    ],
    suitable: "Drivers 65+ years old",
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                Our Courses
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">Driving Courses for Every Need</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                From complete beginners to experienced drivers looking to refresh their skills, we have the perfect
                course for you.
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {course.popular && <Badge className="absolute top-4 left-4 bg-secondary">Most Popular</Badge>}
                  </div>

                  <CardHeader className="space-y-2">
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-muted-foreground text-sm">{course.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-lg">{course.price}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">What's Included:</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {course.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-secondary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{course.suitable}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 space-y-2">
                    <Button className="w-full" asChild>
                      <Link href="/booking">Book This Course</Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`/courses/${course.id}`}>Learn More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">Not Sure Which Course is Right for You?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced instructors can help you choose the perfect course based on your current skills and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="tel:+61234567890">Call Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
