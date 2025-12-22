// components/navigation.tsx
"use client";
import { CircleUser } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menu,
  Car,
  User,
  LogOut,
  Shield,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Calendar,
  Clock,
  MessageSquare,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Award,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

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

function combineDateAndTime(dateStr: string, timeStr: string) {
  return `${dateStr}T${timeStr}:00`;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [allClassSessions, setAllClassSessions] = useState<ClassSession[]>([]);

  const [bookingData, setBookingData] = useState<BookingData>({
    courseId: 0,
    instructorId: STATIC_INSTRUCTOR.id,
    date: new Date().toISOString().split("T")[0],
    time: "",
    duration: "60",
    phoneNumber: "",
    suburb: "",
    additionalMessage: "",
  });

  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  // Check user roles
  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";
  const isStudent = user?.role === "student";
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDashboard = () => {
    if (isAdmin) {
      router.push("/admin");
    } else if (isInstructor) {
      router.push("/instructor");
    } else {
      router.push("/dashboard");
    }
  };

  // Booking functions
  const openBookingModal = () => {
    setIsBookingModalOpen(true);
    setCurrentStep(1);
    // Reset form data
    setSelectedCourse(null);
    setBookingData({
      courseId: 0,
      instructorId: STATIC_INSTRUCTOR.id,
      date: new Date().toISOString().split("T")[0],
      time: "",
      duration: "60",
      phoneNumber: "",
      suburb: "",
      additionalMessage: "",
    });
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setCurrentStep(1);
  };

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

  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${API_BASE_URL}/courses/active`);
      if (!resp.ok) return;
      const data = await resp.json();
      const list = Array.isArray(data) ? data : [];
      setCourses(list);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Booking handlers
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
      if (!user) {
        alert("Please login to continue");
        router.push("/login");
        return;
      }

      if (bookingData.courseId <= 0) {
        alert("Please select a course.");
        return;
      }

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

      // Create booking
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
        closeBookingModal();
        router.push("/dashboard");
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

  // Fetch data on mount
  useEffect(() => {
    fetchCourses();
    fetchAllClassSessions();
  }, []);

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Choose Your Course
              </h2>
            </div>

            {/* Course Selection */}
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Select Your Course
                </Label>
                <Select
                  value={
                    bookingData.courseId ? String(bookingData.courseId) : ""
                  }
                  onValueChange={handleCourseChange}
                >
                  <SelectTrigger className="mt-2 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 transition-colors duration-300">
                    <SelectValue placeholder="Choose the best course for you" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-0 shadow-xl">
                    {courses.map((course) => (
                      <SelectItem
                        key={course.id}
                        value={String(course.id)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {course.course_title}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            ${course.discounted_price ?? course.total_price}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCourse && (
                <Card className="bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-slate-800/80 border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">
                          {selectedCourse.course_title}
                        </CardTitle>
                        <Badge className="bg-white/20 text-white border-white/30 mt-2 capitalize">
                          {selectedCourse.package_type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          $
                          {selectedCourse.discounted_price ??
                            selectedCourse.total_price}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {selectedCourse.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        What's Included:
                      </span>
                      <div className="space-y-2">
                        {selectedCourse.bullet_pt1 && (
                          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {selectedCourse.bullet_pt1}
                          </div>
                        )}
                        {selectedCourse.bullet_pt2 && (
                          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {selectedCourse.bullet_pt2}
                          </div>
                        )}
                        {selectedCourse.bullet_pt3 && (
                          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {selectedCourse.bullet_pt3}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Select Instructor
              </h2>
            </div>

            <Card className="bg-gradient-to-br from-white to-green-50/30 dark:from-slate-800 dark:to-slate-800/80 border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/90 shadow-lg">
                        <Image
                          src={STATIC_INSTRUCTOR.image}
                          alt={STATIC_INSTRUCTOR.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {STATIC_INSTRUCTOR.name}
                      </h3>
                      <p className="text-white/90">
                        {STATIC_INSTRUCTOR.experience}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm px-3 py-1">
                    Selected Instructor
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Specialization
                      </span>
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium">
                      {STATIC_INSTRUCTOR.specialization}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Experience
                      </span>
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium">
                      {STATIC_INSTRUCTOR.experience}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        const bookedSessions = getBookedSessionsForDate();

        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Schedule Your Lesson
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        Select Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => handleDateChange(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-2 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        Select Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={bookingData.time}
                        onChange={(e) => handleTimeSelect(e.target.value)}
                        className="mt-2 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-green-400 transition-colors duration-300 text-lg"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-500" />
                        Lesson Duration
                      </Label>
                      <Select
                        value={bookingData.duration}
                        onValueChange={handleDurationChange}
                      >
                        <SelectTrigger className="mt-2 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-purple-400 transition-colors duration-300">
                          <SelectValue placeholder="Choose lesson length" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-0 shadow-xl">
                          {DURATION_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="hover:bg-purple-50 dark:hover:bg-purple-950/30 cursor-pointer"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        Availability for Selected Date
                      </h3>
                    </div>

                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {bookedSessions.length === 0 ? (
                        <div className="text-center py-12 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                            <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                            All Times Available!
                          </h4>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            Choose any time that works for you
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                            {bookedSessions.length} session
                            {bookedSessions.length !== 1 ? "s" : ""} already
                            booked:
                          </div>
                          {bookedSessions.map((session) => (
                            <div
                              key={session.id}
                              className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-red-800 dark:text-red-300 text-sm">
                                      {formatSessionTimeRange(session)}
                                    </p>
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                      {session.duration} minutes (
                                      {(session.duration / 60).toFixed(1)}{" "}
                                      hours)
                                    </p>
                                  </div>
                                </div>
                                <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 text-xs">
                                  Booked
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {bookingData.date && bookingData.time && bookingData.duration && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                        Lesson Scheduled!
                      </h3>
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        {new Date(bookingData.date).toLocaleDateString(
                          "en-AU",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                        at {bookingData.time}
                        <span className="font-medium ml-1">
                          (
                          {
                            DURATION_OPTIONS.find(
                              (d) => d.value === bookingData.duration
                            )?.label
                          }
                          )
                        </span>
                      </p>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700">
                      Confirmed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Contact Details
              </h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+61 XXX XXX XXX"
                          value={bookingData.phoneNumber}
                          onChange={(e) =>
                            setBookingData((prev) => ({
                              ...prev,
                              phoneNumber: e.target.value,
                            }))
                          }
                          className="h-12 pl-4 pr-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-green-400 transition-colors duration-300 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Pickup Suburb <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="suburb"
                          placeholder="e.g. Chisholm, Belconnen"
                          value={bookingData.suburb}
                          onChange={(e) =>
                            setBookingData((prev) => ({
                              ...prev,
                              suburb: e.target.value,
                            }))
                          }
                          className="h-12 pl-4 pr-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 transition-colors duration-300 text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-500" />
                      Additional Notes{" "}
                      <span className="text-slate-500">(Optional)</span>
                    </Label>
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
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 focus:border-purple-400 transition-colors duration-300 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Review & Confirm
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/80 border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Booking Summary
                      </h3>
                      <p className="text-white/90 text-sm">
                        Review your lesson details
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Course
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {selectedCourse?.course_title}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedCourse?.description}
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Instructor
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {STATIC_INSTRUCTOR.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {STATIC_INSTRUCTOR.experience}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Date & Time
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {new Date(bookingData.date).toLocaleDateString(
                            "en-AU",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Starts at {bookingData.time}
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Duration
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          {
                            DURATION_OPTIONS.find(
                              (d) => d.value === bookingData.duration
                            )?.label
                          }
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Total course: {selectedCourse?.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800/30">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Contact Information
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700 dark:text-blue-400">
                          {bookingData.phoneNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700 dark:text-blue-400">
                          {bookingData.suburb}
                        </span>
                      </div>
                    </div>
                    {bookingData.additionalMessage && (
                      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800/30">
                        <p className="text-xs text-blue-600 dark:text-blue-400 italic">
                          "{bookingData.additionalMessage}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                          Total Amount
                        </h3>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">
                          One-time payment for your course
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          $
                          {selectedCourse?.discounted_price ??
                            selectedCourse?.total_price}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Loading skeleton */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-slate-700/20 shadow-sm">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-purple-50/50 dark:from-slate-950/50 dark:via-slate-900/50 dark:to-slate-800/50 pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-18 lg:h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="flex h-[40px] sm:h-[50px] lg:h-[60px] w-[120px] sm:w-[150px] lg:w-[180px] items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/act_capital_logo_transparent.png"
                    alt="ACT Capital Logo"
                    height={200}
                    width={200}
                    className="h-full w-full object-contain p-1"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on tablet and mobile */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group inline-block text-sm xl:text-base font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 ease-in-out hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-in-out group-hover:w-full rounded-full"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </Link>
              ))}

              {/* Role-specific navigation items */}
              {isLoggedIn && (
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                  {isAdmin && (
                    <Link href="/admin">
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="relative gap-1 xl:gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50 hover:border-red-400 text-red-600 hover:text-white font-semibold text-xs xl:text-sm shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <Shield className="h-3 w-3 xl:h-4 xl:w-4" />
                          <span className="hidden xl:inline">Admin</span>
                        </Button>
                      </div>
                    </Link>
                  )}

                  {isInstructor && (
                    <Link href="/instructor">
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="relative gap-1 xl:gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50 hover:border-green-400 text-green-600 hover:text-white font-semibold text-xs xl:text-sm shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <GraduationCap className="h-3 w-3 xl:h-4 xl:w-4" />
                          <span className="hidden xl:inline">Instructor</span>
                        </Button>
                      </div>
                    </Link>
                  )}

                  {isStudent && (
                    <Link href="/dashboard">
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="relative gap-1 xl:gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-400 text-blue-600 hover:text-white font-semibold text-xs xl:text-sm shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <BookOpen className="h-3 w-3 xl:h-4 xl:w-4" />
                          <span className="hidden xl:inline">Student</span>
                        </Button>
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </nav>

            {/* Desktop Actions - Hidden on tablet and mobile */}
            <div className="hidden lg:flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 bg-red-50/80 dark:bg-red-950/20 backdrop-blur-sm border border-red-200/50 dark:border-red-800/30 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden xl:inline ml-2 font-medium">
                      Logout
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={openBookingModal}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Book Session
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login" className="group">
                    <div className="p-2 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg transition-all duration-300 group-hover:bg-slate-100 dark:group-hover:bg-slate-700/80">
                      <CircleUser className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200" />
                    </div>
                  </Link>
                  <Button
                    size="sm"
                    onClick={openBookingModal}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Book Session
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Navigation - Visible on tablet and mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-700/80"
                  aria-label="Open menu"
                >
                  <Menu
                    className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 dark:text-slate-400"
                    strokeWidth={2}
                  />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-l border-white/20 dark:border-slate-700/20"
              >
                <div className="flex flex-col h-full">
                  {/* Logo in mobile menu */}
                  <div className="flex justify-center py-6 border-b border-slate-200/50 dark:border-slate-700/50">
                    <Link
                      href="/"
                      className="flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-[50px] w-[150px] items-center justify-center overflow-hidden">
                        <Image
                          src="/act_capital_logo_transparent.png"
                          alt="ACT Capital Logo"
                          height={200}
                          width={200}
                          className="h-full w-full object-contain p-1"
                          priority
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-1 px-4 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="w-full py-4 px-4 text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-300 text-center group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    ))}

                    {/* Role-specific navigation items */}
                    {isLoggedIn && (
                      <div className="space-y-1 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="w-full py-4 px-4 text-lg font-medium text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 group"
                            onClick={() => setIsOpen(false)}
                          >
                            <Shield className="h-6 w-6" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        {isInstructor && (
                          <Link
                            href="/instructor"
                            className="w-full py-4 px-4 text-lg font-medium text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 group"
                            onClick={() => setIsOpen(false)}
                          >
                            <GraduationCap className="h-6 w-6" />
                            <span>Instructor Portal</span>
                          </Link>
                        )}

                        {isStudent && (
                          <Link
                            href="/dashboard"
                            className="w-full py-4 px-4 text-lg font-medium text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 group"
                            onClick={() => setIsOpen(false)}
                          >
                            <BookOpen className="h-6 w-6" />
                            <span>Student Portal</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </nav>

                  {/* User Info and Actions */}
                  <div className="mt-auto space-y-4 px-4 pb-6">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 text-center bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          Signed in as{" "}
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {user.full_name}
                          </span>
                          <br />
                          <span className="text-xs">({user.role})</span>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 font-medium"
                          onClick={() => {
                            handleDashboard();
                            setIsOpen(false);
                          }}
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          <span>Dashboard</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full bg-red-50/80 dark:bg-red-950/20 backdrop-blur-sm border-2 border-red-200 dark:border-red-800 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 font-medium"
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Logout</span>
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 font-medium"
                        asChild
                      >
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <div className="flex items-center justify-center gap-2">
                            <CircleUser className="h-4 w-4" />
                            <span>Login</span>
                          </div>
                        </Link>
                      </Button>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      asChild
                    >
                      <Link href="/booking" onClick={() => setIsOpen(false)}>
                        Book Session
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={closeBookingModal}>
        <DialogContent className="!w-[80vw] !h-[80vh] !max-w-none !max-h-none overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-slate-900 dark:text-white">
              Book Your Driving Lesson
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="px-6">
              <div className="flex items-center justify-between relative mb-8">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                  ></div>
                </div>

                {/* Steps */}
                {[
                  { number: 1, title: "Course", icon: BookOpen },
                  { number: 2, title: "Instructor", icon: User },
                  { number: 3, title: "Schedule", icon: Calendar },
                  { number: 4, title: "Details", icon: MessageSquare },
                  { number: 5, title: "Confirm", icon: Check },
                ].map((step, index) => (
                  <div
                    key={step.number}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step.number === currentStep
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110"
                          : step.number < currentStep
                          ? "bg-green-500 text-white shadow-md"
                          : "bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <h3
                        className={`text-xs font-semibold ${
                          step.number === currentStep
                            ? "text-slate-900 dark:text-white"
                            : step.number < currentStep
                            ? "text-green-600"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="px-6">{renderStepContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center px-6 pb-6 gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleBookingSubmit}
                  disabled={loading || !isStepValid()}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
