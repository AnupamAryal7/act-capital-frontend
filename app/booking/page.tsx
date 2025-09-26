"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";

interface Course {
  id: number;
  course_title: string;
  description: string;
  duration: string;
  package_type: string;
  total_price: number;
  discounted_price: number;
  bullet_pt1: string;
  bullet_pt2: string;
  bullet_pt3: string;
}

interface BookingData {
  courseId: number;
  instructorId: number;
  date: string;
  time: string;
  message: string;
  pickupLocation: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Static instructor data (as requested)
const STATIC_INSTRUCTOR = {
  id: 1,
  name: "Sarah Johnson",
  experience: "8+ years",
  specialization: "Beginner & Advanced Courses",
};

// Available time slots
const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [bookingData, setBookingData] = useState<BookingData>({
    courseId: 0,
    instructorId: STATIC_INSTRUCTOR.id,
    date: "",
    time: "",
    message: "",
    pickupLocation: "",
  });

  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/courses/active`);
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);

        // Pre-select course from URL parameter if available
        const urlParams = new URLSearchParams(window.location.search);
        const courseIdParam = urlParams.get("course_id");
        if (courseIdParam) {
          const courseId = parseInt(courseIdParam);
          const preSelectedCourse = data.find(
            (course: Course) => course.id === courseId
          );
          if (preSelectedCourse) {
            setSelectedCourse(preSelectedCourse);
            setBookingData((prev) => ({ ...prev, courseId: courseId }));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCourseChange = (courseId: string) => {
    const course = courses.find((c) => c.id === parseInt(courseId));
    if (course) {
      setSelectedCourse(course);
      setBookingData((prev) => ({ ...prev, courseId: course.id }));
    }
  };

  const handleDateChange = (date: string) => {
    setBookingData((prev) => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = async () => {
    try {
      setLoading(true);

      // Get user data from localStorage
      const userData = localStorage.getItem("user");
      if (!userData) {
        alert("Please login to continue");
        window.location.href = "/login";
        return;
      }

      const user = JSON.parse(userData);

      // Create class session first
      const sessionResponse = await fetch(`${API_BASE_URL}/class-sessions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: bookingData.courseId,
          instructor_id: bookingData.instructorId,
          date_time: `${bookingData.date} ${bookingData.time}`,
          suburb: bookingData.pickupLocation,
        }),
      });

      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();

        // Create booking
        const bookingResponse = await fetch(`${API_BASE_URL}/bookings/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: user.id,
            session_id: sessionData.id,
            pickup_location: bookingData.pickupLocation,
            notes: bookingData.message,
            status: "pending",
          }),
        });

        if (bookingResponse.ok) {
          alert("Booking created successfully!");
          window.location.href = "/dashboard";
        } else {
          alert("Failed to create booking");
        }
      } else {
        alert("Failed to create class session");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred during booking");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bookingData.courseId > 0;
      case 2:
        return bookingData.instructorId > 0;
      case 3:
        return bookingData.date && bookingData.time;
      case 4:
        return bookingData.pickupLocation.trim().length > 0;
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
                Select the driving course you'd like to book
              </p>
            </div>

            <div className="space-y-4">
              <Label>Select Course</Label>
              <Select
                value={bookingData.courseId.toString()}
                onValueChange={handleCourseChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
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
                        {selectedCourse.discounted_price ||
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
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        {selectedCourse.bullet_pt1}
                      </li>
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        {selectedCourse.bullet_pt2}
                      </li>
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        {selectedCourse.bullet_pt3}
                      </li>
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
                Your assigned driving instructor
              </p>
            </div>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
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
                  </div>
                  <Badge variant="default">Selected</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground text-center">
              Currently showing available instructor for your selected course
            </div>
          </div>
        );

      case 3:
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

              <div>
                <Label>Select Time</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {TIME_SLOTS.map((time) => (
                    <Button
                      key={time}
                      variant={
                        bookingData.time === time ? "default" : "outline"
                      }
                      onClick={() => handleTimeSelect(time)}
                      className="h-12"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </Button>
                  ))}
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
              <h2 className="text-2xl font-bold mb-2">Additional Details</h2>
              <p className="text-muted-foreground">
                Provide pickup location and any special requests
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="pickup">Pickup Location *</Label>
                <Input
                  id="pickup"
                  placeholder="Enter your pickup address or suburb"
                  value={bookingData.pickupLocation}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      pickupLocation: e.target.value,
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
                  value={bookingData.message}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      message: e.target.value,
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
                </div>

                <div>
                  <span className="text-sm font-medium">Pickup Location:</span>
                  <p className="text-sm">{bookingData.pickupLocation}</p>
                </div>

                {bookingData.message && (
                  <div>
                    <span className="text-sm font-medium">
                      Additional Message:
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {bookingData.message}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary">
                      $
                      {selectedCourse?.discounted_price ||
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
