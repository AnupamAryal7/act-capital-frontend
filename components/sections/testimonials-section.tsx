"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle, Award, Users, Sparkles } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 18,
    rating: 5,
    course: "Beginner Course",
    achievement: "First Time Pass",
    text: "Amazing experience! My instructor was patient and professional. I passed my test on the first try thanks to ACT Capital Driving School.",
    image: "/young-woman-smiling-portrait.png",
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 25,
    rating: 5,
    course: "Adult Refresher",
    achievement: "Confidence Restored",
    text: "As an adult learner, I was nervous about driving. The instructors made me feel comfortable and confident. Highly recommend!",
    image: "/young-man-smiling-portrait.png",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Wilson",
    age: 17,
    rating: 5,
    course: "P-Plate Course",
    achievement: "Top Student",
    text: "The best driving school in Canberra! Flexible scheduling and excellent teaching methods. Worth every dollar.",
    image: "/teenage-girl-smiling-portrait.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "David Thompson",
    age: 32,
    rating: 5,
    course: "Refresher Course",
    achievement: "Quick Success",
    text: "Needed a refresher course after years of not driving. The instructor was understanding and helped me regain my confidence quickly.",
    image: "/smiling-middle-aged-man.png",
    verified: true,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-br from-green-200/30 to-blue-200/30 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-tr from-yellow-200/25 to-purple-200/25 dark:from-yellow-900/15 dark:to-purple-900/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-bl from-pink-200/20 to-indigo-200/20 dark:from-pink-900/10 dark:to-indigo-900/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center space-y-4 mb-8 lg:mb-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            What Our Students Say
          </h2>
        </div>


        {/* Main Testimonial Display */}
        <div className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 lg:p-8">
              <div className="text-center space-y-4">
                <Quote className="w-8 h-8 text-blue-500 mx-auto" />

                <blockquote className="text-lg lg:text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                  "{currentTestimonial.text}"
                </blockquote>

                <div className="flex justify-center">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-md">
                    <img
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Age {currentTestimonial.age}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button variant="outline" size="sm" onClick={prevTestimonial}>
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-blue-500"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextTestimonial}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
