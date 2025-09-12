import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign } from "lucide-react"

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
    features: ["Theory & Practical", "Road Rules", "Basic Maneuvers"],
  },
  {
    id: 2,
    title: "Refresher Course",
    description: "Haven't driven in a while? Our refresher course will help you regain confidence behind the wheel.",
    duration: "5 lessons",
    price: "$350",
    image: "/adult-refresher-driving-lesson-in-modern-car.jpg",
    popular: false,
    features: ["Confidence Building", "Updated Road Rules", "Practical Assessment"],
  },
  {
    id: 3,
    title: "Test Preparation",
    description: "Intensive preparation for your driving test. Practice test routes and perfect your driving skills.",
    duration: "3 lessons",
    price: "$220",
    image: "/driving-test-preparation-with-instructor.jpg",
    popular: true,
    features: ["Test Routes", "Mock Tests", "Last-minute Tips"],
  },
]

export function PopularCoursesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Popular Driving Courses</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Choose from our range of driving courses designed to meet your specific needs and experience level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
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
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/courses/${course.id}`}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
