"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface Student {
  id: string;
  full_name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  license_number?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 18,
    course: "Beginner Driver Course",
    rating: 5,
    text: "Amazing experience! My instructor was patient and professional. I passed my test on the first try thanks to ACT Capital Driving School. The lessons were well-structured and I felt confident behind the wheel.",
    image: "/young-woman-smiling-portrait.png",
    date: "March 2024",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 25,
    course: "Refresher Course",
    rating: 5,
    text: "As an adult learner, I was nervous about driving after not being behind the wheel for 5 years. The instructors made me feel comfortable and confident. Highly recommend their refresher course!",
    image: "/young-man-smiling-portrait.png",
    date: "February 2024",
  },
  {
    id: 3,
    name: "Emma Wilson",
    age: 17,
    course: "Test Preparation",
    rating: 5,
    text: "The best driving school in Canberra! Flexible scheduling and excellent teaching methods. The test preparation course was exactly what I needed. Worth every dollar.",
    image: "/teenage-girl-smiling-portrait.jpg",
    date: "January 2024",
  },
  {
    id: 4,
    name: "David Thompson",
    age: 32,
    course: "Defensive Driving",
    rating: 5,
    text: "Needed a refresher course after years of not driving. The instructor was understanding and helped me regain my confidence quickly. The defensive driving techniques are invaluable.",
    image: "/smiling-middle-aged-man.png",
    date: "March 2024",
  },
  {
    id: 5,
    name: "Lisa Park",
    age: 19,
    course: "Beginner Driver Course",
    rating: 5,
    text: "I was so nervous about learning to drive, but my instructor made it fun and stress-free. The car was modern and comfortable. Passed my test with flying colors!",
    image: "/young-asian-woman-smiling.jpg",
    date: "February 2024",
  },
  {
    id: 6,
    name: "Robert Martinez",
    age: 45,
    course: "Highway Driving Course",
    rating: 5,
    text: "Great experience with the highway driving course. I was terrified of freeways but now I drive confidently on any road. Professional and patient instructors.",
    image: "/middle-aged-hispanic-man-smiling.jpg",
    date: "January 2024",
  },
];

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [user, setUser] = useState<Student | null>(null);

  const courses = [
    "All",
    "Beginner Driver Course",
    "Refresher Course",
    "Test Preparation",
    "Defensive Driving",
    "Highway Driving Course",
  ];

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.id && parsedUser.email) {
          const dashboardUser: Student = {
            id: parsedUser.id?.toString() || "1",
            full_name:
              parsedUser.full_name ||
              parsedUser.name ||
              parsedUser.email.split("@")[0] ||
              "User",
            email: parsedUser.email || "",
            role: parsedUser.role || "student",
            phone: parsedUser.phone_number || parsedUser.phone || undefined,
            address: parsedUser.address || undefined,
            license_number: parsedUser.license_number || undefined,
          };
          setUser(dashboardUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const filteredTestimonials =
    selectedCourse === "All"
      ? testimonials
      : testimonials.filter((t) => t.course === selectedCourse);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    );
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      alert("Please login to submit a review");
      return;
    }

    if (reviewRating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!reviewComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      setReviewSubmitting(true);

      // Prepare the review data
      const reviewData = {
        user_name: user.full_name,
        email: user.email,
        rating: reviewRating,
        comment: reviewComment.trim(),
        course_title: "", // You can modify this to capture the course if needed
        is_approved: false, // Set to false for admin approval, or true for auto-publish
      };

      console.log("Submitting review:", reviewData);

      const response = await fetch(`${API_BASE_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Review submitted successfully:", result);
        alert("Thank you for your review! It has been submitted successfully.");
        setReviewRating(0);
        setReviewComment("");

        // Optional: Refresh the page or update testimonials list
        // window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit review:", errorData);
        alert(
          `Failed to submit review: ${
            errorData.detail || errorData.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(
        "Failed to submit review. Please check your connection and try again."
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Enhanced star rating hover effect
  const handleStarHover = (hoverRating: number) => {
    const stars = document.querySelectorAll(".star-rating button");
    stars.forEach((star, index) => {
      const starIcon = star.querySelector("svg");
      if (starIcon) {
        if (index < hoverRating) {
          starIcon.classList.add("text-yellow-400", "fill-current");
          starIcon.classList.remove("text-gray-300");
        } else {
          starIcon.classList.add("text-gray-300");
          starIcon.classList.remove("text-yellow-400", "fill-current");
        }
      }
    });
  };

  const handleStarLeave = () => {
    const stars = document.querySelectorAll(".star-rating button");
    stars.forEach((star, index) => {
      const starIcon = star.querySelector("svg");
      if (starIcon) {
        if (index < reviewRating) {
          starIcon.classList.add("text-yellow-400", "fill-current");
          starIcon.classList.remove("text-gray-300");
        } else {
          starIcon.classList.add("text-gray-300");
          starIcon.classList.remove("text-yellow-400", "fill-current");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                Student Success Stories
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                What Our Students Say
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Don't just take our word for it. Here's what our successful
                students have to say about their experience with ACT Capital
                Driving School.
              </p>
            </div>
          </div>
        </section>

        {/* Review Us Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Leave a Review
                  </h2>

                  <div className="space-y-6">
                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2 star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => handleStarHover(star)}
                            onMouseLeave={handleStarLeave}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-8 w-8 ${
                                star <= reviewRating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {reviewRating > 0
                            ? `${reviewRating} star${
                                reviewRating > 1 ? "s" : ""
                              }`
                            : "Select rating"}
                        </span>
                      </div>
                    </div>

                    {/* Review Comment */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Review
                      </label>
                      <Textarea
                        placeholder="Tell us what you think about our driving school. What did you like? How was your instructor? Would you recommend us to others?"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {reviewComment.length}/500 characters
                      </p>
                    </div>

                    <Button
                      onClick={handleReviewSubmit}
                      className="w-full"
                      disabled={
                        reviewSubmitting ||
                        reviewRating === 0 ||
                        !reviewComment.trim() ||
                        reviewComment.length > 500
                      }
                    >
                      {reviewSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          Submit Review
                        </>
                      )}
                    </Button>

                    {!user && (
                      <p className="text-sm text-muted-foreground text-center">
                        Please{" "}
                        <Link href="/login" className="text-primary underline">
                          login
                        </Link>{" "}
                        to submit a review
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {courses.map((course) => (
                <Button
                  key={course}
                  variant={selectedCourse === course ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCourse(course);
                    setCurrentIndex(0);
                  }}
                  className={selectedCourse !== course ? "bg-transparent" : ""}
                >
                  {course}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Testimonial */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {filteredTestimonials.length > 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center space-y-6">
                      <Quote className="h-12 w-12 text-primary mx-auto" />

                      <blockquote className="text-xl md:text-2xl font-medium text-balance leading-relaxed">
                        "{filteredTestimonials[currentIndex].text}"
                      </blockquote>

                      <div className="flex justify-center space-x-1">
                        {[
                          ...Array(filteredTestimonials[currentIndex].rating),
                        ].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={
                            filteredTestimonials[currentIndex].image ||
                            "/placeholder.svg"
                          }
                          alt={filteredTestimonials[currentIndex].name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-lg">
                            {filteredTestimonials[currentIndex].name}
                          </div>
                          <div className="text-muted-foreground">
                            Age {filteredTestimonials[currentIndex].age}
                          </div>
                          <div className="text-sm text-primary">
                            {filteredTestimonials[currentIndex].course}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {filteredTestimonials.length > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <Button variant="outline" size="sm" onClick={prevTestimonial}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex space-x-2">
                    {filteredTestimonials.map((_, index) => (
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
              )}
            </div>
          </div>
        </section>

        {/* All Testimonials Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              All Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.course}
                      </Badge>
                    </div>

                    <blockquote className="text-sm text-muted-foreground italic">
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex items-center space-x-3 pt-4 border-t border-border">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Age {testimonial.age} • {testimonial.date}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Start your driving journey today and become our next success
              story.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/booking">Book Your First Lesson</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
