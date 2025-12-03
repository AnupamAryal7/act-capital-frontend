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
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20 py-20 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
          <SplitText
            text="Welcome To ACT Capital Driving School!!!"
            className="text-primary text-7xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Your Journey to{" "}
                <span className="text-primary">Confident Driving</span> Starts
                Here
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Learn to drive with ACT Capital's experienced instructors,
                modern vehicles, and flexible scheduling. Join thousands of
                successful students in Canberra.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
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
                <span className="text-sm font-medium">Flexible Scheduling</span>
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
                px-8 py-2 rounded-md text-white font-light transition duration-200 ease-linear
                bg-[#0070f3]
                shadow-[0_0_10px_rgba(0,118,255,0.6)]
                hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                hover:bg-[rgba(0,118,255,0.95)]
                button-pulse
              "
                asChild
              >
                <Link href="/quick_bookings">Quick Book</Link>
              </Button>
              <Button
                size="lg"
                className="
                px-8 py-2 rounded-md text-white font-light transition duration-200 ease-linear
                bg-[#2da848]
                shadow-[0_0_10px_rgba(0,118,255,0.6)]
                hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                hover:bg-[rgb(130,236,104)]
                hover:text-black
                button-pulse
              "
                asChild
              >
                <Link href="/courses">View Our Courses</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
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
          <div className="space-y-8">
            {/* Main Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/professional-driving-instructor-teaching-student-i.jpg"
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
    </section>
  );
}
