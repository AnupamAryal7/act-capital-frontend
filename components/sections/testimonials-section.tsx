"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 18,
    rating: 5,
    text: "Amazing experience! My instructor was patient and professional. I passed my test on the first try thanks to ACT Capital Driving School.",
    image: "/young-woman-smiling-portrait.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 25,
    rating: 5,
    text: "As an adult learner, I was nervous about driving. The instructors made me feel comfortable and confident. Highly recommend!",
    image: "/young-man-smiling-portrait.png",
  },
  {
    id: 3,
    name: "Emma Wilson",
    age: 17,
    rating: 5,
    text: "The best driving school in Canberra! Flexible scheduling and excellent teaching methods. Worth every dollar.",
    image: "/teenage-girl-smiling-portrait.jpg",
  },
  {
    id: 4,
    name: "David Thompson",
    age: 32,
    rating: 5,
    text: "Needed a refresher course after years of not driving. The instructor was understanding and helped me regain my confidence quickly.",
    image: "/smiling-middle-aged-man.png",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our successful students
            have to say about their experience.
          </p>
        </div>

        <div className="text-center mt-12">
          <Button
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/courses">Review Us</Link>
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <Quote className="h-12 w-12 text-primary mx-auto" />

                <blockquote className="text-xl md:text-2xl font-medium text-balance leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>

                <div className="flex justify-center space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={currentTestimonial.image || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-lg">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-muted-foreground">
                      Age {currentTestimonial.age}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button variant="outline" size="sm" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
