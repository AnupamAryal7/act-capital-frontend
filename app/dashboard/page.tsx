"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
  Calendar,
  BookOpen,
  Filter,
  MessageSquare,
  ThumbsUp,
  Award,
  Users,
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

interface Review {
  id: number;
  user_name: string;
  email: string;
  rating: number;
  comment: string;
  course_title: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string | null;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://act-driving-backend.onrender.com";

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [user, setUser] = useState<Student | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  // Fetch reviews from API
  const fetchReviews = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setIsRefreshing(true);
      } else {
        setReviewsLoading(true);
      }
      setReviewsError(null);

      console.log(
        "Fetching reviews from:",
        `${API_BASE_URL}/api/v1/reviews/?skip=0&limit=100`
      );

      const response = await fetch(
        `${API_BASE_URL}/api/v1/reviews/?skip=0&limit=100`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch reviews: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Received reviews data:", data);

      // Filter only approved reviews and sort by creation date (newest first)
      const approvedReviews = Array.isArray(data)
        ? data
            .filter((review: Review) => review.is_approved)
            .sort(
              (a: Review, b: Review) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
        : [];

      setReviews(approvedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewsError(
        error instanceof Error
          ? error.message
          : "Unable to load reviews. Please check your connection and try again."
      );
      setReviews([]);
    } finally {
      setReviewsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const approvedReviews = reviews.filter((review) => review.is_approved);
  const featuredReviews = approvedReviews.slice(0, 3); // Top 3 reviews for featured section

  const filteredReviews =
    selectedCourse === "All"
      ? approvedReviews
      : approvedReviews.filter(
          (review) =>
            review.course_title
              ?.toLowerCase()
              .includes(selectedCourse.toLowerCase()) || !review.course_title
        );

  const nextTestimonial = () => {
    if (featuredReviews.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
    }
  };

  const prevTestimonial = () => {
    if (featuredReviews.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length
      );
    }
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

      const reviewData = {
        user_name: user.full_name,
        email: user.email,
        rating: reviewRating,
        comment: reviewComment.trim(),
        course_title: "",
        is_approved: false,
      };

      console.log("Submitting review:", reviewData);

      const response = await fetch(`${API_BASE_URL}/api/v1/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Review submitted successfully:", result);
        alert("Thank you for your review! It has been submitted for approval.");
        setReviewRating(0);
        setReviewComment("");

        // Refresh the reviews list
        fetchReviews(true);
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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  // Calculate average rating
  const averageRating =
    approvedReviews.length > 0
      ? (
          approvedReviews.reduce((sum, review) => sum + review.rating, 0) /
          approvedReviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge
                variant="secondary"
                className="mb-4 bg-white/20 text-white border-none"
              >
                <Award className="h-3 w-3 mr-1" />
                Student Success Stories
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                What Our Students Say
              </h1>
              <p className="text-xl text-blue-100 text-pretty">
                Don't just take our word for it. Read genuine reviews from our
                successful students.
              </p>

              {/* Rating Summary */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold">{averageRating}</div>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(parseFloat(averageRating))
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-blue-200 mt-1">
                    {approvedReviews.length} reviews
                  </div>
                </div>
                <div className="h-12 w-px bg-blue-400 hidden sm:block"></div>
                <div className="flex items-center gap-2 text-blue-100">
                  <ThumbsUp className="h-5 w-5" />
                  <span>98% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">
                      Share Your Experience
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Help others discover the quality of our driving school
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        How would you rate your experience?
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
                              className={`h-10 w-10 ${
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
                        placeholder="Tell us about your experience... What did you like? How was your instructor? Would you recommend us to others?"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={5}
                        className="resize-none border-gray-300 focus:border-blue-500"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Share your honest experience</span>
                        <span>{reviewComment.length}/500</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleReviewSubmit}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
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
                        <Link
                          href="/login"
                          className="text-blue-600 underline font-medium"
                        >
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

        {/* Featured Reviews Carousel */}
        {featuredReviews.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured Reviews</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Here's what some of our recent students have to say about
                  their learning journey
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="border-0 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center space-y-6">
                      <Quote className="h-12 w-12 text-blue-200 mx-auto" />

                      <blockquote className="text-xl md:text-2xl font-medium text-balance leading-relaxed text-gray-800">
                        "{featuredReviews[currentIndex].comment}"
                      </blockquote>

                      <div className="flex justify-center space-x-1">
                        {[...Array(featuredReviews[currentIndex].rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-6 w-6 fill-yellow-400 text-yellow-400"
                            />
                          )
                        )}
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                          {getInitials(featuredReviews[currentIndex].user_name)}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-lg text-gray-900">
                            {featuredReviews[currentIndex].user_name}
                          </div>
                          {featuredReviews[currentIndex].course_title && (
                            <div className="text-sm text-blue-600">
                              {featuredReviews[currentIndex].course_title}
                            </div>
                          )}
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(
                              featuredReviews[currentIndex].created_at
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {featuredReviews.length > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevTestimonial}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex space-x-2">
                      {featuredReviews.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex
                              ? "bg-blue-600 scale-125"
                              : "bg-blue-300"
                          }`}
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextTestimonial}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* All Reviews Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with Stats */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">All Student Reviews</h2>
                <p className="text-lg text-muted-foreground">
                  Real experiences from our driving school community
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{approvedReviews.length} reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{averageRating} average</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => fetchReviews(true)}
                  disabled={reviewsLoading || isRefreshing}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Course Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Filter by course:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {courses.map((course) => (
                  <Button
                    key={course}
                    variant={selectedCourse === course ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCourse(course);
                      setCurrentIndex(0);
                    }}
                    className={
                      selectedCourse === course
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-transparent border-gray-300 hover:border-blue-300"
                    }
                  >
                    {course}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reviews Grid */}
            {reviewsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-0 shadow-sm">
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-20 w-full" />
                      <div className="flex items-center space-x-3 pt-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-2 w-16" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : reviewsError ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-red-500 mb-4">
                  <MessageSquare className="h-16 w-16 mx-auto opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Unable to Load Reviews
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {reviewsError}
                </p>
                <Button
                  onClick={() => fetchReviews()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedCourse === "All"
                    ? "No reviews yet"
                    : `No reviews for ${selectedCourse} yet`}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCourse === "All"
                    ? "Be the first to share your experience!"
                    : "Be the first to review this course!"}
                </p>
                {user && (
                  <Button
                    onClick={() =>
                      document
                        .getElementById("review-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Write First Review
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <Card
                    key={review.id}
                    className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200 group"
                  >
                    <CardContent className="p-6 space-y-4">
                      {/* Rating and Course */}
                      <div className="flex justify-between items-start">
                        <div
                          className={`text-2xl font-bold ${getRatingColor(
                            review.rating
                          )}`}
                        >
                          {review.rating}.0
                        </div>
                        {review.course_title && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            {review.course_title}
                          </Badge>
                        )}
                      </div>

                      {/* Stars */}
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <blockquote className="text-sm text-gray-700 italic leading-relaxed group-hover:text-gray-900 transition-colors">
                        "{review.comment}"
                      </blockquote>

                      {/* Author and Date */}
                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm group-hover:scale-105 transition-transform">
                          {getInitials(review.user_name)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">
                            {review.user_name}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(review.created_at)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <Award className="h-16 w-16 mx-auto text-blue-200" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join hundreds of successful students who passed their driving test
              with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/booking">Book Your First Lesson</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/courses">View All Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
