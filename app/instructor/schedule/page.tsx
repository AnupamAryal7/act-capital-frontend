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
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string | null;
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

      // Get current instructor ID from localStorage
      const userData = localStorage.getItem("user");
      if (!userData) {
        setError("User not logged in");
        return;
      }

      const user = JSON.parse(userData);
      const instructorId = user.id;

      // Fetch all active class sessions (not filtered by instructor since there's only one)
      const sessionsRes = await fetch(
        `${API_BASE_URL}/class_sessions/?is_active=true&limit=200`
      );
      if (!sessionsRes.ok) throw new Error("Failed to fetch sessions");
      const sessions: ClassSession[] = await sessionsRes.json();

      // Fetch all bookings
      const bookingsRes = await fetch(`${API_BASE_URL}/bookings/?limit=200`);
      if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");
      const bookings: Booking[] = await bookingsRes.json();

      // Get today's date (start of day in UTC)
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

      // Filter sessions for today
      const todaySessions = sessions.filter((session) => {
        const sessionDate = new Date(session.date_time);
        sessionDate.setUTCHours(0, 0, 0, 0);
        return sessionDate.getTime() === today.getTime();
      });

      // If no sessions today, show empty state
      if (todaySessions.length === 0) {
        setTodayLessons([]);
        return;
      }

      // Fetch course and student data for each booking
      const lessonsData: LessonData[] = [];

      for (const session of todaySessions) {
        // Find booking for this session
        const booking = bookings.find((b) => b.class_id === session.id);

        if (booking) {
          // Fetch student data
          const studentRes = await fetch(
            `${API_BASE_URL}/users/${booking.student_id}`
          );
          const student: Student = await studentRes.json();

          // Fetch course data
          const courseRes = await fetch(
            `${API_BASE_URL}/courses/${session.course_id}`
          );
          const course: Course = await courseRes.json();

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
            student: `${student.first_name} ${student.last_name}`,
            studentPhone: booking.phone_no,
            type: course.course_title,
            location: booking.suburb,
            status: booking.status,
            additionalMessage: booking.additional_message,
            duration: session.duration,
          };

          lessonsData.push(lessonItem);
        }
      }

      // Sort by time
      lessonsData.sort(
        (a, b) =>
          parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0]) ||
          parseInt(a.time.split(":")[1]) - parseInt(b.time.split(":")[1])
      );

      setTodayLessons(lessonsData);
    } catch (err) {
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
