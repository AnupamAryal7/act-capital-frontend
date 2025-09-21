"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InteractiveMap } from "@/components/interactive-map";
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
  date: string;
  time: string;
  instructor: string;
  type: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
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
  // const [availableCourses, setAvailableCourses] = useState<APICourse[]>([]);
  // const [coursesLoading, setCoursesLoading] = useState(true);

  // Mock data
  const recentBookings: Booking[] = [
    {
      id: 1,
      date: "2024-01-20",
      time: "10:00 AM",
      instructor: "Sarah Johnson",
      type: "Practical Lesson",
      location: "Chisholm, ACT",
      status: "upcoming",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "2:00 PM",
      instructor: "Mike Chen",
      type: "Highway Driving",
      location: "Tuggeranong, ACT",
      status: "completed",
    },
  ];

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

  const suggestedCourses = [
    {
      id: 3,
      name: "Advanced Parking Techniques",
      description: "Master parallel, reverse, and angle parking",
      duration: "8 sessions",
      price: "$320",
      image: "/parking-lesson.jpg",
    },
    {
      id: 4,
      name: "Night Driving Course",
      description: "Learn safe driving techniques for night conditions",
      duration: "6 sessions",
      price: "$240",
      image: "/night-driving.jpg",
    },
    {
      id: 5,
      name: "Defensive Driving",
      description: "Advanced safety and hazard awareness training",
      duration: "12 sessions",
      price: "$480",
      image: "/defensive-driving.jpg",
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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log("Message sent:", message);
      setMessage("");
      alert("Message sent to instructor!");
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      // Handle feedback submission logic here
      console.log("Feedback submitted:", feedback);
      setFeedback("");
      alert("Thank you for your feedback!");
    }
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
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 border rounded-lg bg-gray-50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{booking.type}</h4>
                            <Badge
                              variant={
                                booking.status === "upcoming"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                            <Clock className="h-3 w-3" />
                            {new Date(
                              booking.date
                            ).toLocaleDateString()} at {booking.time}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                            <User className="h-3 w-3" />
                            {booking.instructor}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {booking.location}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      <Button className="w-full" size="lg">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book a Lesson
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        size="lg"
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
                            <Progress value={course.progress} className="h-2" />
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

            {/* Courses You Might Like */}
            <Card className="mb-12">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Courses You Might Like
                  </CardTitle>
                  <Button variant="outline">
                    View All Courses
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{course.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {course.description}
                        </p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-500">
                            {course.duration}
                          </span>
                          <span className="font-bold text-primary">
                            {course.price}
                          </span>
                        </div>
                        <Button className="w-full" size="sm">
                          Enroll Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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

                {/* Google Map */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Find Us</h3>
                  <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <InteractiveMap />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
