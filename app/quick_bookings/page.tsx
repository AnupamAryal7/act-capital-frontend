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

// Static instructor data
const STATIC_INSTRUCTOR = {
  id: 1,
  name: "Jeevan Bilash Pandey",
  experience: "8+ years",
  specialization: "Beginner & Advanced Courses",
  image: "/instructors/jan_jeevan.png",
  phone: "+61 420 995 333",
  email: "jeevan.pandey68@gmail.com",
};

// Default course for quick booking
const DEFAULT_COURSE: Course = {
  id: 1,
  course_title: "General Driving Lesson",
  description:
    "Comprehensive driving lesson covering essential skills and road safety",
  duration: "1 hour",
  package_type: "general",
  total_price: 85,
  discounted_price: 80,
  bullet_pt1: "Personalized instruction based on your skill level",
  bullet_pt2: "Road safety and defensive driving techniques",
  bullet_pt3: "Flexible scheduling to suit your availability",
};

// Duration options
const DURATION_OPTIONS = [
  { value: "60", label: "1 hour", minutes: 60 },
  { value: "90", label: "1.5 hours", minutes: 90 },
  { value: "120", label: "2 hours", minutes: 120 },
  { value: "150", label: "2.5 hours", minutes: 150 },
  { value: "180", label: "3 hours", minutes: 180 },
  { value: "210", label: "3.5 hours", minutes: 210 },
  { value: "240", label: "4 hours", minutes: 240 },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function combineDateAndTime(dateStr: string, timeStr: string) {
  return `${dateStr}T${timeStr}:00`;
}

function formatSessionTimeRange(session: ClassSession): string {
  const startDate = new Date(session.date_time);
  const endDate = new Date(startDate.getTime() + session.duration * 60000);

  const formatTime = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return `${formatTime(startDate)} - ${formatTime(endDate)}`;
}

// Calculate price based on duration
function calculatePrice(duration: string): {
  total: number;
  discounted: number;
} {
  const durationHours = parseInt(duration) / 60;
  const baseTotalPrice = DEFAULT_COURSE.total_price;
  const baseDiscountedPrice = DEFAULT_COURSE.discounted_price || baseTotalPrice;

  return {
    total: baseTotalPrice * durationHours,
    discounted: baseDiscountedPrice * durationHours,
  };
}

export default function QuickBookingPage(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [allClassSessions, setAllClassSessions] = useState<ClassSession[]>([]);

  const [bookingData, setBookingData] = useState<BookingData>({
    courseId: DEFAULT_COURSE.id,
    instructorId: STATIC_INSTRUCTOR.id,
    date: new Date().toISOString().split("T")[0],
    time: "",
    duration: "60",
    phoneNumber: "",
    suburb: "",
    additionalMessage: "",
  });

  // Calculate prices based on current duration
  const currentPrices = calculatePrice(bookingData.duration);

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

  useEffect(() => {
    fetchAllClassSessions();
  }, []);

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
    if (currentStep < 3) setCurrentStep((s) => s + 1);
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

      if (!bookingData.date || !bookingData.time || !bookingData.duration) {
        alert("Please select date, time and duration for your session.");
        return;
      }

      // Create a new class session
      const date_time = combineDateAndTime(bookingData.date, bookingData.time);
      const durationMinutes = parseInt(bookingData.duration);

      const sessionPayload = {
        course_id: bookingData.courseId,
        instructor_id: bookingData.instructorId,
        date_time: date_time,
        duration: durationMinutes,
        is_active: true,
      };

      console.log("Creating session:", sessionPayload);

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
          } else {
            errorMessage += errorData.detail;
          }
        }
        alert(errorMessage);
        return;
      }

      const sessionData = await sessionResponse.json();
      const classSessionId = sessionData.id;

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
        console.log("Quick booking created successfully:", bookingResult);
        alert(
          "Booking created successfully! Your booking is pending confirmation."
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
        return Boolean(
          bookingData.date && bookingData.time && bookingData.duration
        );
      case 2:
        return (
          bookingData.phoneNumber.trim().length > 0 &&
          bookingData.suburb.trim().length > 0
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const bookedSessions = getBookedSessionsForDate();

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Schedule Your Lesson</h2>
              <p className="text-muted-foreground">
                Choose your preferred date and time
              </p>
            </div>

            {/* Course and Instructor Summary */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {DEFAULT_COURSE.course_title}
                  <Badge variant="outline" className="capitalize">
                    {DEFAULT_COURSE.package_type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {DEFAULT_COURSE.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium">Duration:</span>
                    <p className="text-sm text-muted-foreground">
                      {DEFAULT_COURSE.duration}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Price:</span>
                    <p className="text-sm font-semibold text-primary">
                      $
                      {DEFAULT_COURSE.discounted_price ??
                        DEFAULT_COURSE.total_price}
                      {DEFAULT_COURSE.discounted_price && (
                        <span className="line-through text-muted-foreground ml-2">
                          ${DEFAULT_COURSE.total_price}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                    <Image
                      src={STATIC_INSTRUCTOR.image}
                      alt={STATIC_INSTRUCTOR.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {STATIC_INSTRUCTOR.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {STATIC_INSTRUCTOR.experience} •{" "}
                      {STATIC_INSTRUCTOR.specialization}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
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

      case 2:
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

      case 3:
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
                    <p className="text-sm">{DEFAULT_COURSE.course_title}</p>
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
                  <div className="flex flex-col items-end space-y-2">
                    {/* Original Total Price */}
                    {currentPrices.total !== currentPrices.discounted && (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium text-gray-900">
                          Total:
                        </span>
                        <span className="text-xl line-through text-gray-500">
                          ${currentPrices.total.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Discounted Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-900">
                        {currentPrices.total !== currentPrices.discounted
                          ? "Discounted:"
                          : "Total:"}
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ${currentPrices.discounted.toFixed(2)}
                      </span>
                    </div>

                    {/* Savings Display */}
                    {currentPrices.total !== currentPrices.discounted && (
                      <div className="text-sm text-green-600 font-medium">
                        You save: $
                        {(
                          currentPrices.total - currentPrices.discounted
                        ).toFixed(2)}
                      </div>
                    )}
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Quick Book Driving Lesson
          </h1>
          <p className="text-white/90 mt-1">
            Fast booking with our expert instructor
          </p>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
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
                <span>Schedule</span>
                <span>Details</span>
                <span>Confirm</span>
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

              {currentStep < 3 ? (
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
