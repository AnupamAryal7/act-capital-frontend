"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Car,
  Clock,
  Shield,
  Award,
  Sparkles,
  MapPin,
} from "lucide-react";
import CountUp from "../CountUp";
import { useState, useEffect } from "react";


export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gradient-to-tr from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-bl from-orange-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Car className="w-8 h-8 text-blue-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Shield className="w-6 h-6 text-green-300 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float">
          <Star className="w-5 h-5 text-yellow-300 opacity-40" />
        </div>
        <div className="absolute top-1/3 right-10 animate-float-delayed">
          <Award className="w-7 h-7 text-purple-300 opacity-50" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1 text-left">
            {/* Trust Badge */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Trusted by 500+ Students
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div
              className={`space-y-4 transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-left">
                Master the Road with Confidence
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl text-left">
                Transform your driving journey with ACT Capital's expert
                instructors, cutting-edge vehicles, and personalized learning
                approach in Canberra.
              </p>
            </div>

            {/* Key Features Grid */}
            <div
              className={`grid grid-cols-2 gap-4 transform transition-all duration-1000 delay-400 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {[
                {
                  icon: Users,
                  label: "Expert Instructors",
                  color: "text-blue-600",
                },
                { icon: Car, label: "Modern Fleet", color: "text-green-600" },
                {
                  icon: Clock,
                  label: "Flexible Hours",
                  color: "text-purple-600",
                },
                {
                  icon: Shield,
                  label: "Fully Insured",
                  color: "text-orange-600",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 group justify-start"
                >
                  <feature.icon
                    className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-600 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link
                  href="/quick_bookings"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/courses" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Explore Courses
                </Link>
              </Button>
            </div>

              {/* Social Proof Stats */}
              <div
                className={`grid grid-cols-3 gap-4 transform transition-all duration-1000 delay-800 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
              {[
                { value: 500, label: "Happy Students", suffix: "+" },
                { value: 98, label: "Pass Rate", suffix: "%" },
                { value: 3, label: "Years Experience", suffix: "+" },
              ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-left p-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                  <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <CountUp
                      from={0}
                      to={stat.value}
                      separator=","
                      direction="up"
                      duration={2}
                      delay={index * 0.2}
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {/* Main Hero Image */}
              <div className="relative">
                <div className="aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 shadow-2xl">
                  <img
                    src="/professional-driving-instructor-teaching-student-i.jpg"
                    alt="Professional driving instructor teaching a student in a modern car"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Success Card */}
                <Card className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-0 shadow-xl max-w-xs">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                          First Time Pass Rate
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          98% Success Rate
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Rating Card */}
                <Card className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        4.9/5
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      200+ Reviews
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-4 right-4 w-full h-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl blur-xl"></div>
              <div className="absolute -z-20 -top-2 -right-2 w-full h-full bg-gradient-to-br from-green-200/20 to-blue-200/20 dark:from-green-900/10 dark:to-blue-900/10 rounded-3xl blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
