"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Car, Clock, Trophy, Shield, MapPin } from "lucide-react";
import SpotlightCard from "../SpotlightCard";

const features = [
  {
    icon: Users,
    title: "Professional Instructor",
    description:
      "Fully licensed and experienced instructors with proven track records in driver education.",
  },
  {
    icon: Car,
    title: "Modern Vehicles",
    description:
      "Learn in safe, well-maintained vehicles equipped with dual controls and latest safety features.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Book lessons at times that suit you, including evenings and weekends.",
  },
  {
    icon: Trophy,
    title: "High Pass Rates",
    description:
      "95% of our students pass their driving test on the first attempt with our proven methods.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "Complete insurance coverage for your peace of mind during every lesson.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description:
      "Expert knowledge of Canberra roads and test routes to give you the best preparation.",
  },
];

export function WhyChooseUsSection() {
  const [showAll, setShowAll] = React.useState(false);
  const displayedFeatures = showAll ? features : features.slice(0, 4);

  return (
    <section className="py-20 bg-muted/30">
      {/* This is for Mobile View */}
      <div className="md:hidden lg:hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-balance">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              We're committed to providing the highest quality driving education
              in Canberra. Here's what sets us apart from other driving schools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {displayedFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/80 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon Container */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
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
      </div>

      {/* This is for Desktop View */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Why Choose ACT Capital Driving School?
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              We're committed to providing the highest quality driving education
              in Canberra. Here's what sets us apart from other driving schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <SpotlightCard
                  className="custom-spotlight-card bg-primary/10 border-primary/10"
                  spotlightColor="rgba(25, 55, 255, 0.5)"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-pretty">
                      {feature.description}
                    </p>
                  </CardContent>
                </SpotlightCard>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
