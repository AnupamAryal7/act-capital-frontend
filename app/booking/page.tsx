"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  User,
  MessageSquare,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Check,
  BookOpen,
  Plus,
  Mail,
  Phone,
} from "lucide-react";

interface Course {
  id: number;
  course_title: string;
  description: string;
  duration: string;
  package_type: string;
  total_price: number;
  discounted_price?: number;
  bullet_pt1?: string;
  bullet_pt2?: string;
  bullet_pt3?: string;
}

interface ClassSession {
  id: number;
  course_id: number;
  instructor_id: number;
  date_time: string;
  duration: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

interface BookingData {
  courseId: number;
  instructorId: number;
  date: string;
  time: string;
  duration: string;
  phoneNumber: string;
  suburb: string;
  additionalMessage: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Static instructor data (as requested)
const STATIC_INSTRUCTOR = {
  id: 1,
  name: "Jeevan Bilash Pandey",
  experience: "8+ years",
  specialization: "Beginner & Advanced Courses",
  image: "/instructors/jan_jeevan.png",
  phone: "+61 420 995 333",
  email: "jeevan.pandey68@gmail.com",
};

// Duration options (in minutes, but displayed in hours)
const DURATION_OPTIONS = [
  { value: "60", label: "1 hour", minutes: 60 },
  { value: "90", label: "1.5 hours", minutes: 90 },
  { value: "120", label: "2 hours", minutes: 120 },
];

function combineDateAndTime(dateStr: string, timeStr: string) {
  return `${dateStr}T${timeStr}:00`;
}

export default function BookingPage(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [allClassSessions, setAllClassSessions] = useState<ClassSession[]>([]);

  const [bookingData, setBookingData] = useState<BookingData>({
    courseId: 0,
    instructorId: STATIC_INSTRUCTOR.id,
    date: new Date().toISOString().split("T")[0], // today's date
    time: "",
    duration: "60", // default to 60 minutes
    phoneNumber: "",
    suburb: "",
    additionalMessage: "",
  });

  // Fetch all active class sessions
  const fetchAllClassSessions = async () => {
    try {
      const resp = await fetch(
        `${API_BASE_URL}/class_sessions/?is_active=true&limit=200`
      );
      if (!resp.ok) return setAllClassSessions([]);
      const data = await resp.json();
      setAllClassSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching class sessions:", err);
      setAllClassSessions([]);
    }
  };

  // Get booked sessions for the selected date
  const getBookedSessionsForDate = (): ClassSession[] => {
    if (!bookingData.date) return [];

    const selectedDateStr = bookingData.date;

    return allClassSessions.filter((session) => {
      const sessionDate = new Date(session.date_time);
      const sessionDateStr = sessionDate.toISOString().split("T")[0];

      return (
        sessionDateStr === selectedDateStr &&
        session.instructor_id === bookingData.instructorId &&
        session.is_active
      );
    });
  };

  // Format time range from session
  const formatSessionTimeRange = (session: ClassSession): string => {
    const startDate = new Date(session.date_time);
    const endDate = new Date(startDate.getTime() + session.duration * 60000);

    const formatTime = (date: Date) => {
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  };

  // Fetch courses and try to pre-select from URL params if present
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${API_BASE_URL}/courses/active`);
      if (!resp.ok) return;
      const data = await resp.json();
      const list = Array.isArray(data) ? data : [];
      setCourses(list);

      // Pre-select course from URL parameter if available
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const courseIdParam =
          urlParams.get("course_id") || urlParams.get("course");
        if (courseIdParam) {
          const courseId = parseInt(courseIdParam, 10);
          const preSelected =
            list.find((c: Course) => c.id === courseId) || null;
          if (preSelected) {
            setSelectedCourse(preSelected);
            setBookingData((prev) => ({ ...prev, courseId: courseId }));
          }
        }
      } catch (err) {
        // ignore window parsing errors on serverside
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchAllClassSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCourseChange = (courseIdString: string) => {
    const id = parseInt(courseIdString, 10);
    const course = courses.find((c) => c.id === id) || null;
    setSelectedCourse(course);
    setBookingData((prev) => ({
      ...prev,
      courseId: id,
    }));
  };

  const handleDateChange = (date: string) => {
    setBookingData((prev) => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }));
  };

  const handleDurationChange = (duration: string) => {
    setBookingData((prev) => ({ ...prev, duration }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((s) => s + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleBookingSubmit = async () => {
    try {
      setLoading(true);

      // Basic validation
      const userData = localStorage.getItem("user");
      if (!userData) {
        alert("Please login to continue");
        window.location.href = "/login";
        return;
      }
      const user = JSON.parse(userData);

      if (bookingData.courseId <= 0) {
        alert("Please select a course.");
        return;
      }

      if (!bookingData.date || !bookingData.time || !bookingData.duration) {
        alert("Please select date, time and duration for your session.");
        return;
      }

      // Always create a new class session (custom session)
      const date_time = combineDateAndTime(bookingData.date, bookingData.time);

      // Get duration in minutes from the selected value
      const durationMinutes = parseInt(bookingData.duration);

      const sessionPayload = {
        course_id: bookingData.courseId,
        instructor_id: bookingData.instructorId,
        date_time: date_time,
        duration: durationMinutes,
        is_active: true,
      };

      console.log("=== SESSION CREATION DEBUG ===");
      console.log("Raw inputs:", {
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
      });
      console.log("Payload being sent to API:", sessionPayload);
      console.log("Duration is in MINUTES:", durationMinutes);
      console.log(
        "Expected end time:",
        new Date(
          new Date(date_time).getTime() + durationMinutes * 60000
        ).toISOString()
      );

      const sessionResponse = await fetch(`${API_BASE_URL}/class_sessions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionPayload),
      });

      if (!sessionResponse.ok) {
        const errorData = await sessionResponse.json();
        console.error("Session creation failed:", errorData);

        let errorMessage = "Failed to create class session. ";

        if (errorData.detail) {
          if (errorData.detail.includes("already has a class")) {
            errorMessage =
              "This time slot conflicts with an existing booking. Please choose a different time.";
          } else if (
            errorData.detail.includes("SSL connection") ||
            errorData.detail.includes("database")
          ) {
            errorMessage =
              "Server connection error. Please try again in a moment.";
          } else if (errorData.detail.includes("OperationalError")) {
            errorMessage = "Database connection lost. Please try again.";
          } else {
            errorMessage += errorData.detail;
          }
        }

        alert(errorMessage);
        return;
      }

      const sessionData = await sessionResponse.json();
      const classSessionId = sessionData.id;
      console.log("New class session created:", sessionData);

      // Create booking with the class session ID
      const bookingResponse = await fetch(`${API_BASE_URL}/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          class_id: classSessionId,
          phone_no: bookingData.phoneNumber,
          suburb: bookingData.suburb,
          additional_message: bookingData.additionalMessage,
          status: "pending",
          remarks: "pending",
        }),
      });

      if (bookingResponse.ok) {
        const bookingResult = await bookingResponse.json();
        console.log("Booking created successfully:", bookingResult);
        alert(
          "Booking created successfully! A new session was created for you. Your booking is pending confirmation."
        );
        window.location.href = "/dashboard";
      } else {
        const err = await bookingResponse.text();
        console.error("Booking failed:", err);
        alert("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred during booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return bookingData.courseId > 0;
      case 2:
        return bookingData.instructorId > 0;
      case 3:
        return Boolean(
          bookingData.date && bookingData.time && bookingData.duration
        );
      case 4:
        return (
          bookingData.phoneNumber.trim().length > 0 &&
          bookingData.suburb.trim().length > 0
        );
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Choose Your Course</h2>
              <p className="text-muted-foreground">
                Select the course you want to book
              </p>
            </div>

            {/* Course Selection */}
            <div className="space-y-4">
              <Label>Select Course</Label>
              <Select
                value={bookingData.courseId ? String(bookingData.courseId) : ""}
                onValueChange={handleCourseChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={String(course.id)}>
                      {course.course_title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCourse && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedCourse.course_title}
                    <Badge variant="outline" className="capitalize">
                      {selectedCourse.package_type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {selectedCourse.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Duration:</span>
                      <p className="text-sm text-muted-foreground">
                        {selectedCourse.duration}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Price:</span>
                      <p className="text-sm font-semibold text-primary">
                        $
                        {selectedCourse.discounted_price ??
                          selectedCourse.total_price}
                        {selectedCourse.discounted_price &&
                          selectedCourse.discounted_price <
                            selectedCourse.total_price && (
                            <span className="line-through text-muted-foreground ml-2">
                              ${selectedCourse.total_price}
                            </span>
                          )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">
                      What's Included:
                    </span>
                    <ul className="space-y-1">
                      {selectedCourse.bullet_pt1 && (
                        <li className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2" />
                          {selectedCourse.bullet_pt1}
                        </li>
                      )}
                      {selectedCourse.bullet_pt2 && (
                        <li className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2" />
                          {selectedCourse.bullet_pt2}
                        </li>
                      )}
                      {selectedCourse.bullet_pt3 && (
                        <li className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2" />
                          {selectedCourse.bullet_pt3}
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Select Instructor</h2>
              <p className="text-muted-foreground">
                Choose your driving instructor
              </p>
            </div>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Instructor Image */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={STATIC_INSTRUCTOR.image}
                      alt={STATIC_INSTRUCTOR.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {STATIC_INSTRUCTOR.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {STATIC_INSTRUCTOR.experience}
                    </p>
                    <p className="text-sm text-primary">
                      {STATIC_INSTRUCTOR.specialization}
                    </p>

                    {/* Contact Buttons */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-xs h-8"
                        onClick={() =>
                          window.open(`tel:${STATIC_INSTRUCTOR.phone}`)
                        }
                      >
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-xs h-8"
                        onClick={() =>
                          window.open(`mailto:${STATIC_INSTRUCTOR.email}`)
                        }
                      >
                        <Mail className="h-3 w-3" />
                        Email
                      </Button>
                    </div>
                  </div>

                  <Badge variant="default">Selected</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        const bookedSessions = getBookedSessionsForDate();

        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Date and Time</h2>
              <p className="text-muted-foreground">
                Choose your preferred lesson schedule
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Time Input */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="time">Select Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => handleTimeSelect(e.target.value)}
                      className="text-lg"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter your preferred start time (24-hour format)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select
                      value={bookingData.duration}
                      onValueChange={handleDurationChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Side - Booked Sessions */}
                <div>
                  <Label>Booked Sessions for This Day</Label>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {bookedSessions.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          No sessions booked for this day
                        </p>
                      </div>
                    ) : (
                      bookedSessions.map((session) => (
                        <div
                          key={session.id}
                          className="bg-red-100 border border-red-300 rounded-md p-3 text-black hover:text-yellow-800 transition-colors cursor-default"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm">
                                {formatSessionTimeRange(session)}
                              </p>
                              <p className="text-xs opacity-75">
                                Duration: {session.duration} minutes (
                                {(session.duration / 60).toFixed(1)} hours)
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              Booked
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Avoid scheduling during these times
                  </p>
                </div>
              </div>

              {bookingData.date && bookingData.time && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium">
                        Scheduled for{" "}
                        {new Date(bookingData.date).toLocaleDateString()} at{" "}
                        {bookingData.time}
                        {` for ${
                          DURATION_OPTIONS.find(
                            (d) => d.value === bookingData.duration
                          )?.label
                        }`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Contact Details</h2>
              <p className="text-muted-foreground">
                Provide your contact information and pickup location
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={bookingData.phoneNumber}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="suburb">Suburb *</Label>
                <Input
                  id="suburb"
                  placeholder="Enter your suburb for pickup"
                  value={bookingData.suburb}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      suburb: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Any special requests or notes for your instructor..."
                  value={bookingData.additionalMessage}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      additionalMessage: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Review & Book</h2>
              <p className="text-muted-foreground">
                Review your booking details before confirming
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium">Course:</span>
                    <p className="text-sm">{selectedCourse?.course_title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Instructor:</span>
                    <p className="text-sm">{STATIC_INSTRUCTOR.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Date:</span>
                    <p className="text-sm">
                      {new Date(bookingData.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Time:</span>
                    <p className="text-sm">{bookingData.time}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Duration:</span>
                    <p className="text-sm">
                      {
                        DURATION_OPTIONS.find(
                          (d) => d.value === bookingData.duration
                        )?.label
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Booking Type:</span>
                    <p className="text-sm capitalize">Custom Session</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium">Phone:</span>
                  <p className="text-sm">{bookingData.phoneNumber}</p>
                </div>

                <div>
                  <span className="text-sm font-medium">Suburb:</span>
                  <p className="text-sm">{bookingData.suburb}</p>
                </div>

                {bookingData.additionalMessage && (
                  <div>
                    <span className="text-sm font-medium">
                      Additional Message:
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {bookingData.additionalMessage}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary">
                      $
                      {selectedCourse?.discounted_price ??
                        selectedCourse?.total_price}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Loading Booking Form...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Book Your Driving Lesson
          </h1>
          <p className="text-white/90 mt-1">
            Complete the form below to schedule your session
          </p>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step === currentStep
                        ? "border-primary bg-primary text-white"
                        : step < currentStep
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-300"
                    }`}
                  >
                    {step < currentStep ? <Check className="h-5 w-5" /> : step}
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Course</span>
                <span>Instructor</span>
                <span>Schedule</span>
                <span>Details</span>
                <span>Payment</span>
              </div>
            </div>

            {/* Step Content */}
            <Card>
              <CardContent className="p-8">{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleBookingSubmit}
                  disabled={loading || !isStepValid()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
