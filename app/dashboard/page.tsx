"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/navigation";

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
  FileText,
  TrendingUp,
  CheckCircle,
  XCircle,
  Loader,
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
  status: "pending" | "confirmed" | "completed" | "cancelled" | "attended";
  remarks: string;
  created_at: string;
  updated_at: string | null;
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

interface ProgressReport {
  id: number;
  user_id: number;
  course_id: number;
  progress_percentage: number;
  status: string;
  feedback: string;
  remarks: string;
  created_at: string;
  updated_at: string | null;
}

interface EnrolledCourse {
  id: number;
  course_id: number;
  course_name: string;
  progress_percentage: number;
  status: string;
  feedback: string;
  remarks: string;
  created_at: string;
  updated_at: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const STATUS_CONFIG = {
  not_started: {
    label: "Not Started",
    color: "bg-gray-100 text-gray-700",
    icon: XCircle,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-blue-100 text-blue-700",
    icon: Loader,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  on_hold: {
    label: "On Hold",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
};

export default function StudentDashboard() {
  const [user, setUser] = useState<Student | null>(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [availableCourses, setAvailableCourses] = useState<APICourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ProgressReport | null>(
    null
  );
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [enrolledCoursesLoading, setEnrolledCoursesLoading] = useState(true);
  const [selectedCourseMessage, setSelectedCourseMessage] = useState<{
    [key: number]: string;
  }>({});

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

  // Fetch progress reports for enrolled courses
  const fetchEnrolledCourses = async (userId: string) => {
    try {
      setEnrolledCoursesLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/progress-reports/?user_id=${userId}&skip=0&limit=100`
      );
      if (response.ok) {
        const data = await response.json();
        const reports = Array.isArray(data) ? data : [];

        // Transform progress reports into enrolled courses format
        const courses: EnrolledCourse[] = reports.map(
          (report: ProgressReport) => ({
            id: report.id,
            course_id: report.course_id,
            course_name: getCourseName(report.course_id),
            progress_percentage: report.progress_percentage,
            status: report.status,
            feedback: report.feedback,
            remarks: report.remarks,
            created_at: report.created_at,
            updated_at: report.updated_at,
          })
        );

        setEnrolledCourses(courses);
      } else {
        console.error("Failed to fetch enrolled courses");
        setEnrolledCourses([]);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setEnrolledCourses([]);
    } finally {
      setEnrolledCoursesLoading(false);
    }
  };

  // Fetch progress reports for the student
  const fetchProgressReports = async (userId: string) => {
    try {
      setReportsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/progress-reports/?user_id=${userId}&skip=0&limit=100`
      );
      if (response.ok) {
        const data = await response.json();
        setProgressReports(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch progress reports");
        setProgressReports([]);
      }
    } catch (error) {
      console.error("Error fetching progress reports:", error);
      setProgressReports([]);
    } finally {
      setReportsLoading(false);
    }
  };

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

  // Get course name by ID
  const getCourseName = (courseId: number) => {
    const course = availableCourses.find((c) => c.id === courseId);
    return course ? course.course_title : `Course #${courseId}`;
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user data from localStorage:", parsedUser);

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
          console.log("Final dashboard user set:", dashboardUser);

          // Fetch data for this user
          fetchStudentBookings(dashboardUser.id);
          fetchProgressReports(dashboardUser.id);
          fetchEnrolledCourses(dashboardUser.id);
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

    fetchActiveCourses();
  }, []);

  const handleSendMessage = (courseId?: number) => {
    const msg = courseId ? selectedCourseMessage[courseId] : message;
    if (msg?.trim()) {
      console.log(
        "Message sent:",
        msg,
        courseId ? `for course ${courseId}` : ""
      );
      if (courseId) {
        setSelectedCourseMessage({ ...selectedCourseMessage, [courseId]: "" });
      } else {
        setMessage("");
      }
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
      const response = await fetch(`${API_BASE_URL}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: user.full_name,
          email: user.email,
          rating: reviewRating,
          comment: reviewComment.trim(),
          course_title: "",
          is_approved: true,
        }),
      });

      if (response.ok) {
        alert("Thank you for your review! It is published.");
        setReviewRating(0);
        setReviewComment("");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to submit review: ${errorData.detail || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again later.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleEnrollCourse = (courseId: number) => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      localStorage.setItem(
        "redirectAfterLogin",
        `/booking?course_id=${courseId}`
      );
      window.location.href = `/login?redirect=/booking?course_id=${courseId}`;
    } else {
      window.location.href = `/booking?course_id=${courseId}`;
    }
  };

  const handleBookLesson = () => {
    window.location.href = "/quick_bookings";
  };

  const getStatusConfig = (status: string) => {
    return (
      STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ||
      STATUS_CONFIG.not_started
    );
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
      {/* Header */}
      <div>
        <Navigation />
      </div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-8">
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
                        {recentBookings.slice(0, 3).map((booking) => (
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
                                    : booking.status === "attended"
                                    ? "tertary"
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

              {/* Right Column - Profile */}
              <div className="space-y-6">
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
                    </div>
                  </CardContent>
                </Card>

                {/* Enrolled Courses */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Enrolled Courses
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => user && fetchEnrolledCourses(user.id)}
                        disabled={enrolledCoursesLoading}
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${
                            enrolledCoursesLoading ? "animate-spin" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {enrolledCoursesLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                        <span>Loading courses...</span>
                      </div>
                    ) : enrolledCourses.length === 0 ? (
                      <div className="text-center py-8">
                        <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          No enrolled courses yet
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Book a lesson to get started!
                        </p>
                        <Button size="sm" onClick={handleBookLesson}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Book a Lesson
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {enrolledCourses.map((course) => {
                          const statusConfig = getStatusConfig(course.status);
                          const StatusIcon = statusConfig.icon;
                          return (
                            <div
                              key={course.id}
                              className="p-4 border rounded-lg bg-white"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                  <h4 className="font-semibold">
                                    {course.course_name}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Report ID: #{course.id}
                                  </p>
                                </div>
                                <div
                                  className={`px-2 py-1 rounded-full flex items-center gap-1 text-xs ${statusConfig.color}`}
                                >
                                  <StatusIcon className="h-3 w-3" />
                                  <span>{statusConfig.label}</span>
                                </div>
                              </div>

                              <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium">Progress</span>
                                  <span className="font-bold text-primary">
                                    {course.progress_percentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${course.progress_percentage}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {course.feedback &&
                                course.feedback !== "not inserted yet" && (
                                  <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                                    <p className="text-gray-600 line-clamp-2">
                                      <span className="font-semibold">
                                        Feedback:{" "}
                                      </span>
                                      {course.feedback}
                                    </p>
                                  </div>
                                )}

                              <div className="text-xs text-gray-500 mb-3">
                                Last updated:{" "}
                                {course.updated_at
                                  ? new Date(
                                      course.updated_at
                                    ).toLocaleDateString()
                                  : new Date(
                                      course.created_at
                                    ).toLocaleDateString()}
                              </div>

                              {/* Message to Instructor */}
                              <div className="space-y-2">
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Send message to instructor..."
                                    value={
                                      selectedCourseMessage[course.id] || ""
                                    }
                                    onChange={(e) =>
                                      setSelectedCourseMessage({
                                        ...selectedCourseMessage,
                                        [course.id]: e.target.value,
                                      })
                                    }
                                    className="flex-1 text-sm"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleSendMessage(course.id)}
                                    disabled={
                                      !selectedCourseMessage[course.id]?.trim()
                                    }
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => {
                                    const report = progressReports.find(
                                      (r) => r.id === course.id
                                    );
                                    if (report) setSelectedReport(report);
                                  }}
                                >
                                  <FileText className="h-3 w-3 mr-2" />
                                  View Full Report
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Review Button */}
                    {enrolledCourses.length > 0 && (
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Write a Review
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Progress Reports / Enrolled Courses */}
            <Card className="mb-12">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    My Progress Reports
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => user && fetchProgressReports(user.id)}
                    disabled={reportsLoading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${
                        reportsLoading ? "animate-spin" : ""
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {reportsLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading progress reports...</span>
                  </div>
                ) : progressReports.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      No progress reports yet
                    </p>
                    <p className="text-sm text-gray-500">
                      Your instructor will create progress reports as you
                      complete your courses
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {progressReports.map((report) => {
                      const statusConfig = getStatusConfig(report.status);
                      const StatusIcon = statusConfig.icon;
                      return (
                        <div
                          key={report.id}
                          className="p-6 border rounded-lg bg-white hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">
                                {getCourseName(report.course_id)}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Report ID: #{report.id}
                              </p>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full flex items-center gap-2 ${statusConfig.color}`}
                            >
                              <StatusIcon className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {statusConfig.label}
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium">Progress</span>
                              <span className="font-bold text-primary">
                                {report.progress_percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                                style={{
                                  width: `${report.progress_percentage}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Feedback Preview */}
                          {report.feedback &&
                            report.feedback !== "not inserted yet" && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  Instructor Feedback:
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {report.feedback}
                                </p>
                              </div>
                            )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => setSelectedReport(report)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              View Full Report
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendMessage()}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message Instructor
                            </Button>
                          </div>

                          {/* Timestamps */}
                          <div className="mt-4 pt-4 border-t flex justify-between text-xs text-gray-500">
                            <span>
                              Created:{" "}
                              {new Date(report.created_at).toLocaleDateString()}
                            </span>
                            {report.updated_at && (
                              <span>
                                Updated:{" "}
                                {new Date(
                                  report.updated_at
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

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

                    {/* Review Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Review Us</h3>
                      <div className="space-y-4">
                        {/* Star Rating */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Rating
                          </label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                onMouseEnter={(e) => {
                                  const stars =
                                    e.currentTarget.parentElement?.querySelectorAll(
                                      "button"
                                    );
                                  stars?.forEach((s, i) => {
                                    const starIcon = s.querySelector("svg");
                                    if (starIcon && i < star) {
                                      starIcon.classList.add(
                                        "text-yellow-400",
                                        "fill-current"
                                      );
                                      starIcon.classList.remove(
                                        "text-gray-300"
                                      );
                                    }
                                  });
                                }}
                                onMouseLeave={(e) => {
                                  const stars =
                                    e.currentTarget.parentElement?.querySelectorAll(
                                      "button"
                                    );
                                  stars?.forEach((s, i) => {
                                    const starIcon = s.querySelector("svg");
                                    if (starIcon) {
                                      if (i < reviewRating) {
                                        starIcon.classList.add(
                                          "text-yellow-400",
                                          "fill-current"
                                        );
                                        starIcon.classList.remove(
                                          "text-gray-300"
                                        );
                                      } else {
                                        starIcon.classList.add("text-gray-300");
                                        starIcon.classList.remove(
                                          "text-yellow-400",
                                          "fill-current"
                                        );
                                      }
                                    }
                                  });
                                }}
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
                            <span className="ml-2 text-sm text-gray-600">
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review
                          </label>
                          <Textarea
                            placeholder="Tell us what you think about our driving school..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            rows={4}
                          />
                        </div>

                        <Button
                          onClick={handleReviewSubmit}
                          className="w-full"
                          disabled={
                            reviewSubmitting ||
                            reviewRating === 0 ||
                            !reviewComment.trim()
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
                      </div>
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

      {/* Progress Report Details Dialog */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Progress Report Details
            </DialogTitle>
            <DialogDescription>
              Detailed view of your learning progress
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {getCourseName(selectedReport.course_id)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Report ID: #{selectedReport.id}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full ${
                      getStatusConfig(selectedReport.status).color
                    }`}
                  >
                    <span className="font-semibold">
                      {getStatusConfig(selectedReport.status).label}
                    </span>
                  </div>
                </div>

                {/* Progress Circle/Bar */}
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Overall Progress
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {selectedReport.progress_percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{
                        width: `${selectedReport.progress_percentage}%`,
                      }}
                    >
                      {selectedReport.progress_percentage > 10 && (
                        <TrendingUp className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Instructor Feedback
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedReport.feedback &&
                    selectedReport.feedback !== "not inserted yet"
                      ? selectedReport.feedback
                      : "No feedback provided yet. Your instructor will add feedback as you progress through the course."}
                  </p>
                </div>
              </div>

              {/* Remarks Section */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Additional Remarks
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedReport.remarks &&
                    selectedReport.remarks !== "not inserted yet"
                      ? selectedReport.remarks
                      : "No additional remarks at this time."}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Student ID
                  </p>
                  <p className="text-lg font-semibold">
                    {selectedReport.user_id}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Course ID
                  </p>
                  <p className="text-lg font-semibold">
                    {selectedReport.course_id}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Report Created
                  </p>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {new Date(selectedReport.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-gray-400" />
                    {selectedReport.updated_at
                      ? new Date(selectedReport.updated_at).toLocaleString()
                      : "Not updated"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleSendMessage()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Instructor
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setSelectedReport(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
