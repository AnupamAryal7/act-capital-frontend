"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  BookOpen,
  User,
  MapPin,
  Star,
  Send,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  GraduationCap,
  Users,
  RefreshCw,
  Info,
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

interface Booking {
  id: number;
  student_id: number;
  class_id: number;
  phone_no: string;
  suburb: string;
  additional_message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  remarks: string;
  created_at: string;
  updated_at: string | null;
}

interface Course {
  id: number;
  name: string;
  progress: number;
  instructor: string;
  next_session: string;
  total_sessions: number;
  completed_sessions: number;
}

interface APICourse {
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

interface Review {
  id: number;
  student_name: string;
  rating: number;
  comment: string;
  course: string;
  date: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export default function StudentDashboard() {
  const [user, setUser] = useState<Student | null>(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [availableCourses, setAvailableCourses] = useState<APICourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Mock data for enrolled courses and reviews
  const enrolledCourses: Course[] = [
    {
      id: 1,
      name: "Beginner Driving Course",
      progress: 75,
      instructor: "Sarah Johnson",
      next_session: "2024-01-20 10:00 AM",
      total_sessions: 20,
      completed_sessions: 15,
    },
    {
      id: 2,
      name: "Highway Driving Mastery",
      progress: 40,
      instructor: "Mike Chen",
      next_session: "2024-01-25 2:00 PM",
      total_sessions: 10,
      completed_sessions: 4,
    },
  ];

  const studentReviews: Review[] = [
    {
      id: 1,
      student_name: "Emma Wilson",
      rating: 5,
      comment:
        "Excellent instructors and comprehensive courses. I passed my test on the first try!",
      course: "Beginner Driving Course",
      date: "2024-01-10",
    },
    {
      id: 2,
      student_name: "James Brown",
      rating: 5,
      comment:
        "The highway driving course really boosted my confidence. Highly recommended!",
      course: "Highway Driving Mastery",
      date: "2024-01-08",
    },
    {
      id: 3,
      student_name: "Sophie Chen",
      rating: 4,
      comment:
        "Great learning experience with patient and professional instructors.",
      course: "Advanced Parking Techniques",
      date: "2024-01-05",
    },
  ];

  // Fetch student bookings from API
  const fetchStudentBookings = async (studentId: string) => {
    try {
      setBookingsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/bookings/student/${studentId}`
      );
      if (response.ok) {
        const data = await response.json();
        setRecentBookings(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch bookings");
        setRecentBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setRecentBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  // Fetch active courses from API
  const fetchActiveCourses = async () => {
    try {
      setCoursesLoading(true);
      const response = await fetch(`${API_BASE_URL}/courses/active`);
      if (response.ok) {
        const data = await response.json();
        setAvailableCourses(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch courses");
        setAvailableCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setAvailableCourses([]);
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    // Get user data from localStorage (set by your auth provider)
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user data from localStorage:", parsedUser);

        // Check if user object has required fields (from your auth provider)
        if (parsedUser.id && parsedUser.email) {
          // Map auth provider user data to dashboard interface
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
          console.log("Final dashboard user set:", dashboardUser);

          // Fetch bookings for this user
          fetchStudentBookings(dashboardUser.id);
        } else {
          console.log("Invalid user data structure");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        alert("Error loading user data. Please login again.");
        window.location.href = "/login";
      }
    } else {
      console.log("No user data found in localStorage");
      window.location.href = "/login";
    }

    // Fetch courses when component mounts
    fetchActiveCourses();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
      alert("Message sent to instructor!");
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      console.log("Feedback submitted:", feedback);
      setFeedback("");
      alert("Thank you for your feedback!");
    }
  };

  const handleEnrollCourse = (courseId: number) => {
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

  const handleBookLesson = () => {
    // Navigate to booking page without pre-selected course
    window.location.href = "/booking";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-4">Loading Dashboard...</h2>
          <p className="text-muted-foreground">
            Please wait while we prepare your learning journey.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      {/* Greeting Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Welcome back, {user.full_name}!
            </h1>
            <p className="text-lg text-white/90">
              Continue your driving journey with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Recent Bookings */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Recent Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookingsLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                        <span>Loading bookings...</span>
                      </div>
                    ) : recentBookings.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          No bookings yet. Book your first lesson!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="p-4 border rounded-lg bg-gray-50"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">
                                Booking #{booking.id}
                              </h4>
                              <Badge
                                variant={
                                  booking.status === "pending"
                                    ? "default"
                                    : booking.status === "confirmed"
                                    ? "default"
                                    : booking.status === "completed"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                              <Clock className="h-3 w-3" />
                              {new Date(
                                booking.created_at
                              ).toLocaleDateString()}{" "}
                              at{" "}
                              {new Date(
                                booking.created_at
                              ).toLocaleTimeString()}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                              <Phone className="h-3 w-3" />
                              {booking.phone_no}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                              <MapPin className="h-3 w-3" />
                              {booking.suburb}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Info className="h-3 w-3 mr-2" />
                              More Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 space-y-3">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleBookLesson}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book a Lesson
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        size="lg"
                        onClick={() => (window.location.href = "/courses")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Courses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Profile & Courses */}
              <div className="space-y-6">
                {/* Profile Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Profile Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Name:
                        </span>
                        <span className="text-sm">{user.full_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Email:
                        </span>
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Phone:
                        </span>
                        <span className="text-sm">
                          {user.phone || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          License:
                        </span>
                        <span className="text-sm">
                          {user.license_number || "In Progress"}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 bg-transparent"
                    >
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Enrolled Courses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Enrolled Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold">{course.name}</h4>
                            <Badge variant="outline">
                              {course.completed_sessions}/
                              {course.total_sessions}
                            </Badge>
                          </div>
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Instructor: {course.instructor}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            Next Session: {course.next_session}
                          </p>

                          {/* Message to Instructor */}
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Send message to instructor..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1"
                              />
                              <Button size="sm" onClick={handleSendMessage}>
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Review Button */}
                    <Button
                      variant="outline"
                      className="w-full mt-4 bg-transparent"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Write a Review
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Available Courses from API */}
            <Card className="mb-12">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Available Courses
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchActiveCourses}
                      disabled={coursesLoading}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${
                          coursesLoading ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                    <Button variant="outline">
                      View All Courses
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {coursesLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading courses...</span>
                  </div>
                ) : availableCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No courses available at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.slice(0, 6).map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="aspect-video bg-gray-100">
                          {course.image_url ? (
                            <img
                              src={course.image_url}
                              alt={course.course_title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold line-clamp-2">
                              {course.course_title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize ml-2 flex-shrink-0"
                            >
                              {course.package_type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Duration:</span>
                              <span>{course.duration}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center space-x-1">
                              <span className="font-bold text-primary">
                                ${course.discounted_price || course.total_price}
                              </span>
                              {course.discounted_price &&
                                course.discounted_price <
                                  course.total_price && (
                                  <span className="text-sm line-through text-gray-500">
                                    ${course.total_price}
                                  </span>
                                )}
                            </div>
                          </div>
                          <Button
                            className="w-full"
                            size="sm"
                            onClick={() => handleEnrollCourse(course.id)}
                          >
                            Enroll Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* What Other Students Say */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  What Other Students Say
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studentReviews.map((review) => (
                    <Card key={review.id} className="bg-gray-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-3">
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
                        <p className="text-sm text-gray-700 mb-4 italic">
                          "{review.comment}"
                        </p>
                        <div className="border-t pt-3">
                          <p className="font-semibold text-sm">
                            {review.student_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {review.course}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Us & Feedback */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Contact Us & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Feedback Form */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Share Your Feedback
                    </h3>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Tell us about your experience with ACT Capital Driving School..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                      />
                      <Button onClick={handleFeedbackSubmit} className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </Button>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-gray-600">
                            (02) 6123 4567
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-gray-600">
                            info@actcapitaldriving.com.au
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-gray-600">
                            123 Driving School Lane
                            <br />
                            Chisholm, ACT 2905
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Find Us</h3>
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive Map</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Details Dialog */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about your booking
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Booking ID
                  </p>
                  <p className="text-base font-semibold">
                    {selectedBooking.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant={
                      selectedBooking.status === "pending"
                        ? "default"
                        : selectedBooking.status === "confirmed"
                        ? "default"
                        : selectedBooking.status === "completed"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {selectedBooking.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Student ID
                  </p>
                  <p className="text-base">{selectedBooking.student_id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Class ID</p>
                  <p className="text-base">{selectedBooking.class_id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phone Number
                  </p>
                  <p className="text-base">{selectedBooking.phone_no}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Suburb</p>
                  <p className="text-base">{selectedBooking.suburb}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Additional Message
                </p>
                <p className="text-base p-3 bg-gray-50 rounded-lg">
                  {selectedBooking.additional_message ||
                    "No additional message"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Remarks
                </p>
                <p className="text-base p-3 bg-gray-50 rounded-lg">
                  {selectedBooking.remarks || "No remarks"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Created At
                  </p>
                  <p className="text-sm">
                    {new Date(selectedBooking.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Updated At
                  </p>
                  <p className="text-sm">
                    {selectedBooking.updated_at
                      ? new Date(selectedBooking.updated_at).toLocaleString()
                      : "Not updated"}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  className="w-full"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
