"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Car, Clock, Trophy, Shield, MapPin, Star } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Fully licensed and experienced instructors with proven track records in driver education.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600",
    stats: "8+ Years Avg Experience",
  },
  {
    icon: Car,
    title: "Modern Fleet",
    description:
      "Learn in safe, well-maintained vehicles equipped with dual controls and latest safety features.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    iconColor: "text-green-600",
    stats: "2024 Model Vehicles",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Book lessons at times that suit you, including evenings and weekends for maximum convenience.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    iconColor: "text-purple-600",
    stats: "7 Days a Week",
  },
  {
    icon: Trophy,
    title: "Proven Success",
    description:
      "95% of our students pass their driving test on the first attempt with our proven methods.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    iconColor: "text-yellow-600",
    stats: "95% Pass Rate",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "Complete insurance coverage for your peace of mind during every lesson and test.",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    iconColor: "text-red-600",
    stats: "Comprehensive Coverage",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Expert knowledge of Canberra roads and test routes to give you the best preparation.",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    iconColor: "text-indigo-600",
    stats: "Canberra Specialists",
  },
];

export function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-tr from-green-200/25 to-blue-200/25 dark:from-green-900/15 dark:to-blue-900/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`text-center space-y-3 mb-8 lg:mb-10 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Why Choose ACT Capital Driving School?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Icon Background Pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <feature.icon className="w-full h-full" />
              </div>

              <CardContent className="relative p-6 space-y-4">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100/80 dark:bg-slate-700/80 text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    {feature.stats}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div
          className={`text-center mt-8 lg:mt-10 transform transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
            <a href="/testimonials">
              <span className="text-white font-semibold">
                Trusted by 500+ Students
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
