"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, BookOpen } from "lucide-react";

interface Course {
  id: number;
  course_title: string;
  description: string;
  bullet_pt1: string;
  bullet_pt2: string;
  bullet_pt3: string;
  duration: string;
  package_type: string;
  total_price: number;
  discounted_price: number;
  is_active: boolean;
  image_url?: string;
  image_public_id?: string;
  created_at: string;
  updated_at: string;
}
// api base url
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function PopularCoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch active courses for students
  const fetchActiveCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/courses/active`);
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch courses");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveCourses();
  }, []);

  const handleBookNow = (courseId: number) => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");

    if (!userData) {
      // User not logged in - redirect to login with booking intent
      localStorage.setItem(
        "redirectAfterLogin",
        `/booking?course_id=${courseId}`
      );
      window.location.href = `/login?redirect=/booking?course_id=${courseId}`;
    } else {
      // User is logged in - go directly to booking
      window.location.href = `/booking?course_id=${courseId}`;
    }
  };

  const handleInquiry = (courseId: number) => {
    // For now, just log the inquiry - can be implemented later
    console.log("Inquiry for course:", courseId);
    alert(
      "Inquiry functionality coming soon! Please use the contact form or call us directly."
    );
  };

  const isPopularCourse = (course: Course) => {
    // Define logic for popular courses - you can customize this
    return course.package_type === "gold" || course.package_type === "platinum";
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            Popular Driving Courses
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Choose from our range of driving courses designed to meet your
            specific needs and experience level.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No courses available at the moment.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.course_title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {isPopularCourse(course) && (
                      <Badge className="absolute top-4 left-4 bg-secondary">
                        Most Popular
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      {course.course_title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {course.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-lg">
                          ${course.discounted_price || course.total_price}
                        </span>
                        {course.discounted_price &&
                          course.discounted_price < course.total_price && (
                            <span className="text-sm line-through text-muted-foreground ml-1">
                              ${course.total_price}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        What's Included:
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{course.bullet_pt1}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{course.bullet_pt2}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{course.bullet_pt3}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {course.package_type} Package
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 space-y-2">
                    <div className="w-full space-y-2">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => handleBookNow(course.id)}
                      >
                        Book Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleInquiry(course.id)}
                      >
                        Inquiry
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link href="/courses">View All Courses</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
