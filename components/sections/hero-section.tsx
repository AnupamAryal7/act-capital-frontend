"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import SplitText from "../SplitText";
import CountUp from "../CountUp";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background to-muted/20  z-10">
      {/* This is for mobile view */}
      <div className="md:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8 px-4 sm:px-6 lg:px-6">
              <div className="space-y-4">
                <h1 className="font-poppins text-4xl  font-bold text-balance leading-tight">
                  Welcome to{" "}
                  <span className="text-primary font-extrabold">
                    ACT Capital
                  </span>{" "}
                  Driving School
                </h1>
                <p className="font-inter font-semibold text-xl text-pretty max-w-2xl text-gray-600">
                  Learn to drive with us and build the skills you need to get
                  licensed. We offer excellent driving lessons, supportive
                  instructors, and flexible scheduling to fit your lifestyle.
                </p>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted -mt-3.5">
                <img
                  src="/professional-driving-instructor-teaching-student-i.jpg"
                  alt="Professional driving instructor teaching a student in a modern car"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="
                  w-50 sm:w-auto mx-auto px-8 py-2 rounded-lg text-white font-medium transition-transform duration-200 ease-linear transform hover:scale-105
                  bg-[#0070f3]
                  shadow-[0_0_10px_rgba(0,118,255,0.6)]
                  hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                  hover:bg-[rgba(0,118,255,0.95)]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0070f3]/20
                  button-pulse
                "
                  asChild
                >
                  <Link href="/quick_bookings">Quick Book</Link>
                </Button>
                <Button
                  size="lg"
                  className="
                  w-50 sm:w-auto mx-auto sm:mx-0 px-8 py-2 rounded-lg text-white font-medium transition-transform duration-200 ease-linear transform hover:scale-105
                  bg-[#2da848]
                   shadow-[0_0_10px_rgba(45,168,72,0.25)]
                  hover:shadow-[0_0_25px_rgba(45,168,72,0.4),0_0_50px_rgba(45,168,72,0.25)]
                  hover:bg-[rgb(130,236,104)]
                  hover:text-black
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2da848]/20
                  button-pulse
                "
                  asChild
                >
                  <Link href="/courses">View Our Courses</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 -mt-5 gap-8 pt-6 mb-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
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
                  <div className="text-sm text-muted-foreground">
                    Students Taught
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
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
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
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
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This is for desktop view */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8 px-4 sm:px-6 lg:px-6">
              <div className="space-y-4">
                <h1 className="font-poppins text-4xl lg:text-7xl font-bold text-balance leading-tight">
                  Your Journey to{" "}
                  <span className="text-primary">Confident Driving</span> Starts
                  Here
                </h1>
                <p className="font-inter font-semibold text-xl text-pretty max-w-2xl text-gray-600">
                  Learn to drive with ACT Capital's experienced instructors,
                  modern vehicles, and flexible scheduling. Join thousands of
                  successful students in Canberra.
                </p>
              </div>
              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex font-inter items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">
                    Professional Instructors
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">Modern Vehicles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">
                    Flexible Scheduling
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">High Pass Rates</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="
                  w-full sm:w-auto mx-auto sm:mx-0 px-8 py-2 rounded-lg text-white font-medium transition-transform duration-200 ease-linear transform hover:scale-105
                  bg-[#0070f3]
                  shadow-[0_0_10px_rgba(0,118,255,0.6)]
                  hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                  hover:bg-[rgba(0,118,255,0.95)]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0070f3]/20
                  button-pulse
                "
                  asChild
                >
                  <Link href="/quick_bookings">Quick Book</Link>
                </Button>
                <Button
                  size="lg"
                  className="
                  w-full sm:w-auto mx-auto sm:mx-0 px-8 py-2 rounded-lg text-white font-medium transition-transform duration-200 ease-linear transform hover:scale-105
                  bg-[#2da848]
                   shadow-[0_0_10px_rgba(45,168,72,0.25)]
                  hover:shadow-[0_0_25px_rgba(45,168,72,0.4),0_0_50px_rgba(45,168,72,0.25)]
                  hover:bg-[rgb(130,236,104)]
                  hover:text-black
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2da848]/20
                  button-pulse
                "
                  asChild
                >
                  <Link href="/courses">View Our Courses</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-6 mb-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
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
                  <div className="text-sm text-muted-foreground">
                    Students Taught
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
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
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
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
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image and Quick Booking */}
            <div className="space-y-8 px-4 sm:px-6 lg:px-8">
              {/* Main Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src="/hero-section-image.png"
                    alt="Professional driving instructor teaching a student in a modern car"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">Licensed & Insured</div>
                      <div className="text-sm text-muted-foreground">
                        Fully qualified instructors
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
