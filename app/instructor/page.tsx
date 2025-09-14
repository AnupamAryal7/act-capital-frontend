"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Star,
  DollarSign,
  Users,
} from "lucide-react";

interface InstructorUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export default function InstructorDashboard() {
  const [user, setUser] = useState<InstructorUser | null>(null);
  const [todayLessons, setTodayLessons] = useState([
    {
      id: 1,
      time: "9:00 AM",
      student: "Emma Wilson",
      type: "Practical Lesson",
      location: "Chisholm, ACT",
      phone: "+61 4XX XXX XXX",
      status: "confirmed",
    },
    {
      id: 2,
      time: "11:00 AM",
      student: "James Brown",
      type: "Highway Driving",
      location: "Tuggeranong, ACT",
      phone: "+61 4XX XXX XXX",
      status: "confirmed",
    },
    {
      id: 3,
      time: "2:00 PM",
      student: "Sarah Davis",
      type: "Test Preparation",
      location: "Woden, ACT",
      phone: "+61 4XX XXX XXX",
      status: "pending",
    },
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+61 4XX XXX XXX",
      lessonsCompleted: 8,
      nextLesson: "2024-01-20",
      progress: 75,
      notes: "Good progress with parallel parking",
    },
    {
      id: 2,
      name: "James Brown",
      email: "james@example.com",
      phone: "+61 4XX XXX XXX",
      lessonsCompleted: 12,
      nextLesson: "2024-01-22",
      progress: 85,
      notes: "Ready for test preparation",
    },
  ]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-muted-foreground">
            Please wait while we load your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-white/20 text-white border-white/30"
            >
              Instructor Dashboard
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-balance">
              Welcome, {user.full_name}!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Manage your lessons and help students achieve their driving goals
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-2xl">3</h3>
                <p className="text-sm text-muted-foreground">Today's Lessons</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-2xl">24</h3>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-2xl">4.9</h3>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-2xl">$2,450</h3>
                <p className="text-sm text-muted-foreground">This Month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="today" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">Today's Schedule</TabsTrigger>
              <TabsTrigger value="students">My Students</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Today's Lessons - {new Date().toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center min-w-[80px]">
                            <div className="text-lg font-semibold">
                              {lesson.time}
                            </div>
                            <Badge
                              variant={
                                lesson.status === "confirmed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {lesson.status}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">
                              {lesson.student}
                            </h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-4">
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
                                {lesson.phone}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                          <Button size="sm">Start Lesson</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    My Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-lg">
                              {student.name}
                            </h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {student.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {student.phone}
                              </span>
                            </p>
                          </div>
                          <Badge variant="outline">
                            {student.progress}% Complete
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-semibold">
                              {student.lessonsCompleted}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Lessons
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-semibold">
                              {student.nextLesson}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Next Lesson
                            </div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded">
                            <div className="font-semibold">
                              {student.progress}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Progress
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm">
                            <strong>Notes:</strong> {student.notes}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Schedule Lesson
                          </Button>
                          <Button variant="outline" size="sm">
                            Add Note
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Calendar integration coming soon...</p>
                    <p className="text-sm">
                      View and manage your weekly schedule
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Lessons Taught</span>
                        <span className="font-semibold">87</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student Pass Rate</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Rating</span>
                        <span className="font-semibold">4.9/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue</span>
                        <span className="font-semibold">$2,450</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Student Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Ready for Test</span>
                        <span className="font-semibold">5 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Progress</span>
                        <span className="font-semibold">15 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Students</span>
                        <span className="font-semibold">4 students</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
