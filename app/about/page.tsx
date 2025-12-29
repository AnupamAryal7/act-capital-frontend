import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Users, Award, Clock, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                About Us
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
                Canberra's Trusted Driving School
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                At ACT Capital Driving School, we're passionate about creating
                safe, confident drivers. With a great experience, we've helped
                thousands of students achieve their driving goals.
              </p>
              <div className="flex justify-center gap-x-[10px]">
                <Button
                  className="px-8 py-2 rounded-lg text-white font-medium transition-transform duration-200 ease-linear transform hover:scale-105
                  bg-[#0070f3]
                  shadow-[0_0_10px_rgba(0,118,255,0.6)]
                  hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                  hover:bg-[rgba(0,118,255,0.95)]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0070f3]/20
                  button-pulse"
                >
                  Quick Book
                </Button>
                <Button
                  className="px-8 py-2 rounded-lg text-white font-medium transition-transform duration-200 ease-linear transform hover:scale-105
                  bg-[#2da848]
                  shadow-[0_0_10px_rgba(45,168,72,0.25)]
                  hover:shadow-[0_0_25px_rgba(45,168,72,0.4),0_0_50px_rgba(45,168,72,0.25)]
                  hover:bg-[rgb(130,236,104)]
                  hover:text-black
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2da848]/20
                  button-pulse"
                >
                  View all Courses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                  Our Story
                </h1>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 text-xl font-poppins font-medium">
                  <p>
                    Founded in 2025, ACT Capital Driving School was created with
                    a clear vision to deliver driving education that prioritizes
                    quality, safety, and genuine care. Built on more than ten
                    years of hands-on instructional experience, the school began
                    as a focused, instructor-led initiative designed to give
                    learners the attention they truly need.
                  </p>

                  <p>
                    Led by a single, highly skilled instructor, ACT Capital
                    Driving School believes that patience and trust are the
                    foundation of confident driving. Every lesson is tailored to
                    the individual, allowing students to learn at their own pace
                    in a calm and supportive environment. This approach helps
                    reduce stress while building strong, practical driving
                    skills that last beyond the test day.
                  </p>

                  <p>
                    Serving learners across Australia, our mission goes beyond
                    helping students obtain a licence. We are committed to
                    shaping safe, responsible, and confident drivers through
                    structured training, consistent guidance, and proven
                    results. At ACT Capital Driving School, trust is earned
                    through safety, progress, and long-term success on the road.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/driving-school-founder-with-modern-car-and-student.jpg"
                  alt="ACT Capital Driving School founder with students"
                  className="w-full h-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "500+", label: "Students Taught" },
                { value: "95%", label: "First-Time Pass Rate" },
                { value: "10+", label: "Years Experience" },
                { value: "5", label: "Star Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Our Values
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                These core values guide everything we do at ACT Capital Driving
                School.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description:
                    "Safety is our top priority in every lesson and interaction.",
                },
                {
                  icon: Users,
                  title: "Student-Centered",
                  description:
                    "We adapt our teaching to each student's unique learning style.",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description:
                    "We strive for excellence in instruction and customer service.",
                },
                {
                  icon: Clock,
                  title: "Reliability",
                  description:
                    "Punctual, professional, and dependable service every time.",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                      <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join the hundreds of successful students who have learned to drive
              with ACT Capital Driving School.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/booking">Book Your First Lesson</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
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
  );
}
