"use client";
import React from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Users, Award, Clock, Shield, Star } from "lucide-react";
import CountUp from "@/components/CountUp";

export default function AboutPage() {
  const [showAll, setShowAll] = React.useState(false);

  const values = [
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
      description: "Punctual, professional, and dependable service every time.",
    },
  ];

  const displayedValues = showAll ? values : values.slice(0, 2);

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
              <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  Our Story
                </h1>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 text-base lg:text-xl font-poppins font-medium">
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
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 mb-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  <CountUp
                    from={0}
                    to={24}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-2">
                  Students Taught
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  <CountUp
                    from={0}
                    to={98}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  %
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-2">
                  First Time Pass Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  <CountUp
                    from={0}
                    to={2}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-2">
                  Years Experience
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button className="px-6 py-2">
                <Link href="/testimonials">What People Say About Us</Link>
              </Button>
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
              <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                These core values guide everything we do at ACT Capital Driving
                School.
              </p>
            </div>

            {/* Mobile View with Show More */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 gap-6">
                {displayedValues.map((value, index) => (
                  <div
                    key={index}
                    className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                        <value.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {value.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* View More Button */}
              {!showAll && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowAll(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
                  >
                    View More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Desktop View - Original Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
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
      </main>
      <Footer />
    </div>
  );
}
