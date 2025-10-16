"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, MapPin, Phone, User } from "lucide-react";

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

interface Booking {
  id: number;
  student_id: number;
  class_id: number;
  phone_no: string;
  suburb: string;
  additional_message: string;
  status: string;
  remarks: string;
  created_at: string;
  updated_at: string;
}

interface Student {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
}

interface Course {
  id: number;
  course_title: string;
  description: string;
  duration: string;
}

interface LessonData {
  id: number;
  time: string;
  endTime: string;
  student: string;
  studentPhone: string;
  type: string;
  location: string;
  status: string;
  additionalMessage: string;
  duration: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SchedulePage() {
  const [todayLessons, setTodayLessons] = useState<LessonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodayLessons();
  }, []);

  const fetchTodayLessons = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("=== SCHEDULE FETCH START ===");
      console.log("API_BASE_URL:", API_BASE_URL);

      // Fetch all active class sessions
      console.log("Fetching class sessions...");
      const sessionsRes = await fetch(
        `${API_BASE_URL}/class_sessions/?is_active=true&limit=200`
      );
      console.log("Sessions response status:", sessionsRes.status);
      if (!sessionsRes.ok) throw new Error("Failed to fetch sessions");
      const sessions: ClassSession[] = await sessionsRes.json();
      console.log("Total sessions fetched:", sessions.length);
      console.log("All sessions:", sessions);

      // Fetch all bookings
      console.log("Fetching bookings...");
      const bookingsRes = await fetch(`${API_BASE_URL}/bookings/?limit=200`);
      console.log("Bookings response status:", bookingsRes.status);
      if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");
      const bookings: Booking[] = await bookingsRes.json();
      console.log("Total bookings fetched:", bookings.length);
      console.log("All bookings:", bookings);

      // Get today's date (start of day in UTC)
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      console.log("Today's date (UTC):", today);

      // Filter sessions for today
      const todaySessions = sessions.filter((session) => {
        const sessionDate = new Date(session.date_time);
        sessionDate.setUTCHours(0, 0, 0, 0);
        return sessionDate.getTime() === today.getTime();
      });

      console.log("Today's sessions:", todaySessions.length);
      console.log("Today's sessions data:", todaySessions);

      // If no sessions today, show empty state
      if (todaySessions.length === 0) {
        console.log("No sessions today, showing empty state");
        setTodayLessons([]);
        return;
      }

      // Fetch course and student data for each booking
      const lessonsData: LessonData[] = [];

      for (const session of todaySessions) {
        console.log(`\n--- Processing session ID: ${session.id} ---`);
        console.log("Session details:", session);

        // Find booking for this session
        const booking = bookings.find((b) => b.class_id === session.id);
        console.log("Found booking:", booking);

        if (booking) {
          // Fetch student data
          let studentName = "Unknown Student";
          try {
            console.log(`Fetching student data for ID: ${booking.student_id}`);
            const studentRes = await fetch(
              `${API_BASE_URL}/users/${booking.student_id}`
            );
            console.log("Student response status:", studentRes.status);
            if (studentRes.ok) {
              const student: Student = await studentRes.json();
              console.log("Student data:", student);
              studentName =
                student.full_name || student.email || "Unknown Student";
              console.log("Student name resolved to:", studentName);
            } else {
              console.error("Student response not OK:", studentRes.status);
            }
          } catch (err) {
            console.error(
              `Failed to fetch student ${booking.student_id}:`,
              err
            );
          }

          // Fetch course data
          let courseTitle = "Unknown Course";
          try {
            console.log(`Fetching course data for ID: ${session.course_id}`);
            const courseRes = await fetch(
              `${API_BASE_URL}/courses/${session.course_id}`
            );
            console.log("Course response status:", courseRes.status);
            if (courseRes.ok) {
              const course: Course = await courseRes.json();
              console.log("Course data:", course);
              courseTitle = course.course_title;
              console.log("Course title resolved to:", courseTitle);
            } else {
              console.error("Course response not OK:", courseRes.status);
            }
          } catch (err) {
            console.error(`Failed to fetch course ${session.course_id}:`, err);
          }

          // Calculate times
          const startDate = new Date(session.date_time);
          const endDate = new Date(
            startDate.getTime() + session.duration * 60000
          );

          const formatTime = (date: Date) => {
            const hours = date.getUTCHours().toString().padStart(2, "0");
            const minutes = date.getUTCMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
          };

          const lessonItem: LessonData = {
            id: booking.id,
            time: formatTime(startDate),
            endTime: formatTime(endDate),
            student: studentName,
            studentPhone: booking.phone_no,
            type: courseTitle,
            location: booking.suburb,
            status: booking.status,
            additionalMessage: booking.additional_message,
            duration: session.duration,
          };

          console.log("Lesson item created:", lessonItem);
          lessonsData.push(lessonItem);
        } else {
          console.log(`No booking found for session ${session.id}`);
        }
      }

      console.log("\nTotal lessons data collected:", lessonsData.length);
      console.log("Before sorting:", lessonsData);

      // Sort by time
      lessonsData.sort(
        (a, b) =>
          parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]) ||
          parseInt(a.time.split(":")[1]) - parseInt(b.time.split(":")[1])
      );

      console.log("After sorting:", lessonsData);
      console.log("=== SCHEDULE FETCH COMPLETE ===\n");

      setTodayLessons(lessonsData);
    } catch (err) {
      console.error("=== ERROR DURING FETCH ===");
      console.error("Error fetching lessons:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Loading today's lessons...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-destructive">
          <CardContent className="p-8">
            <p className="text-destructive text-center">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Lessons - {new Date().toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayLessons.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">
                No lessons scheduled for today
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center min-w-[100px]">
                      <div className="text-lg font-semibold">{lesson.time}</div>
                      <div className="text-xs text-muted-foreground">
                        {lesson.duration} min
                      </div>
                      <Badge
                        variant={getStatusColor(lesson.status)}
                        className="mt-1"
                      >
                        {lesson.status}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-lg flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {lesson.student}
                      </h4>
                      <p className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {lesson.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {lesson.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {lesson.studentPhone}
                          </span>
                        </div>
                      </p>
                      {lesson.additionalMessage && (
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          Note: {lesson.additionalMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`tel:${lesson.studentPhone}`)}
                    >
                      Contact
                    </Button>
                    <Button size="sm">Start Lesson</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
