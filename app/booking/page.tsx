"use client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  BookOpen,
  User,
  Calendar as CalendarIcon,
  MessageSquare,
  CreditCard,
  CheckCircle,
} from "lucide-react";

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
}

interface Instructor {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface BookingData {
  courseId: number;
  instructorId: number;
  date: Date | undefined;
  time: string;
  message: string;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const Booking = () => {
  const location = useLocation();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  const [bookingData, setBookingData] = useState<BookingData>({
    courseId: 0,
    instructorId: 0,
    date: undefined,
    time: "",
    message: "",
  });

  // Fetch courses and instructors
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch courses
        const coursesResponse = await fetch(`${API_BASE_URL}/courses/active`);
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(Array.isArray(coursesData) ? coursesData : []);

          // Pre-select course from URL parameter
          const urlParams = new URLSearchParams(location.search);
          const courseIdParam = urlParams.get("course");
          if (courseIdParam && coursesData.length > 0) {
            const preSelectedCourse = coursesData.find(
              (c: Course) => c.id === parseInt(courseIdParam)
            );
            if (preSelectedCourse) {
              setSelectedCourse(preSelectedCourse);
              setBookingData((prev) => ({
                ...prev,
                courseId: preSelectedCourse.id,
              }));
            }
          }
        }

        // Fetch instructors
        const instructorsResponse = await fetch(
          `${API_BASE_URL}/users/instructors`
        );
        if (instructorsResponse.ok) {
          const instructorsData = await instructorsResponse.json();
          setInstructors(Array.isArray(instructorsData) ? instructorsData : []);

          // Pre-select first instructor
          if (instructorsData.length > 0) {
            setBookingData((prev) => ({
              ...prev,
              instructorId: instructorsData[0].id,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load booking data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, toast]);

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

  const handleCourseChange = (courseId: string) => {
    const course = courses.find((c) => c.id === parseInt(courseId));
    if (course) {
      setSelectedCourse(course);
      setBookingData((prev) => ({ ...prev, courseId: course.id }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setBookingData((prev) => ({ ...prev, date }));
  };

  const handleBookingSubmit = async () => {
    try {
      setLoading(true);

      // Create class session
      const sessionResponse = await fetch(`${API_BASE_URL}/class-sessions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: bookingData.courseId,
          instructor_id: bookingData.instructorId,
          date: bookingData.date?.toISOString().split("T")[0],
          time: bookingData.time,
          notes: bookingData.message,
        }),
      });

      if (!sessionResponse.ok) {
        throw new Error("Failed to create class session");
      }

      const sessionData = await sessionResponse.json();

      // Create booking
      const bookingResponse = await fetch(`${API_BASE_URL}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_session_id: sessionData.id,
          student_id: 1, // This should come from auth context
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }

      toast({
        title: "Booking Confirmed!",
        description: "Your driving lesson has been successfully booked.",
      });

      // Redirect to dashboard or confirmation page
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Failed",
        description:
          "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return bookingData.courseId > 0;
      case 2:
        return bookingData.instructorId > 0;
      case 3:
        return bookingData.date && bookingData.time;
      case 4:
        return true; // Message is optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <BookOpen className="h-5 w-5" />;
      case 2:
        return <User className="h-5 w-5" />;
      case 3:
        return <CalendarIcon className="h-5 w-5" />;
      case 4:
        return <MessageSquare className="h-5 w-5" />;
      case 5:
        return <CreditCard className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose Your Course</h2>
              <p className="text-muted-foreground">
                Select the driving course that best fits your needs
              </p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="course-select">Select Course</Label>
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
                      {course.course_title} - {course.package_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCourse && (
                <Card className="mt-4">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {selectedCourse.course_title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {selectedCourse.package_type} Package
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {selectedCourse.duration}
                        </div>
                        <div className="flex items-center text-lg font-bold">
                          <DollarSign className="h-4 w-4" />
                          {selectedCourse.discounted_price ||
                            selectedCourse.total_price}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {selectedCourse.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">What's Included:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          {selectedCourse.bullet_pt1}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          {selectedCourse.bullet_pt2}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          {selectedCourse.bullet_pt3}
                        </li>
                      </ul>
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
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Select Your Instructor</h2>
              <p className="text-muted-foreground">
                Choose from our experienced driving instructors
              </p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="instructor-select">Select Instructor</Label>
              <Select
                value={bookingData.instructorId.toString()}
                onValueChange={(value) =>
                  setBookingData((prev) => ({
                    ...prev,
                    instructorId: parseInt(value),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem
                      key={instructor.id}
                      value={instructor.id.toString()}
                    >
                      {instructor.first_name} {instructor.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose Date & Time</h2>
              <p className="text-muted-foreground">
                Select your preferred lesson date and time
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={bookingData.date}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-4">
                <Label>Select Time</Label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={
                        bookingData.time === time ? "default" : "outline"
                      }
                      onClick={() => handleTimeSelect(time)}
                      className="w-full"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Additional Message</h2>
              <p className="text-muted-foreground">
                Any special requirements or notes for your instructor
              </p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Tell us about any specific areas you'd like to focus on, accessibility needs, or other special requirements..."
                value={bookingData.message}
                onChange={(e) =>
                  setBookingData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                rows={5}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Confirm & Book</h2>
              <p className="text-muted-foreground">
                Review your booking details and confirm
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Course</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedCourse?.course_title}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Package</Label>
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedCourse?.package_type}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Instructor</Label>
                    <p className="text-sm text-muted-foreground">
                      {
                        instructors.find(
                          (i) => i.id === bookingData.instructorId
                        )?.first_name
                      }{" "}
                      {
                        instructors.find(
                          (i) => i.id === bookingData.instructorId
                        )?.last_name
                      }
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date & Time</Label>
                    <p className="text-sm text-muted-foreground">
                      {bookingData.date?.toLocaleDateString()} at{" "}
                      {bookingData.time}
                    </p>
                  </div>
                </div>

                {bookingData.message && (
                  <div>
                    <Label className="text-sm font-medium">Special Notes</Label>
                    <p className="text-sm text-muted-foreground">
                      {bookingData.message}
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Price:</span>
                  <span className="flex items-center">
                    <DollarSign className="h-5 w-5" />
                    {selectedCourse?.discounted_price ||
                      selectedCourse?.total_price}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p>Loading booking form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Book Your Lesson</h1>
            <Badge variant="outline">Step {currentStep} of 5</Badge>
          </div>

          <Progress value={(currentStep / 5) * 100} className="mb-4" />

          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center space-x-2 ${
                  step <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    getStepIcon(step)
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {step === 1 && "Course"}
                  {step === 2 && "Instructor"}
                  {step === 3 && "Date & Time"}
                  {step === 4 && "Message"}
                  {step === 5 && "Confirm"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-6">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleBookingSubmit}
              disabled={loading || !canProceed()}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
