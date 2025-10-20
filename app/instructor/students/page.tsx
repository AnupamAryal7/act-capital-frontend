"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { CheckCircle, Clock, XCircle, Check, UserX } from "lucide-react";

interface Student {
  id: number;
  student_id: number;
  student_name: string;
  phone_no: string;
  suburb: string;
  additional_message: string;
  status: string;
  remarks: string;
  created_at: string;
  class_id: number;
  email?: string;
  phone_number?: string;
}

interface UserDetails {
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  id: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", icon: Clock, color: "default" },
  {
    value: "confirmed",
    label: "Confirmed",
    icon: CheckCircle,
    color: "default",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    color: "destructive",
  },
  { value: "attended", label: "Attended", icon: Check, color: "secondary" },
  { value: "no_show", label: "No Show", icon: UserX, color: "destructive" },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  // Fetch user details by ID - FIXED URL CONSTRUCTION
  const fetchUserDetails = async (
    userId: number
  ): Promise<UserDetails | null> => {
    try {
      // FIX: Remove the duplicate /api/v1 from the URL construction
      const url = `${API_BASE_URL}/${userId}`;
      console.log(`🔄 [DEBUG] Fetching user details from: ${url}`);

      const response = await fetch(url);

      console.log(`📡 [DEBUG] Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status}`);
      }

      const userData = await response.json();
      console.log(
        `✅ [DEBUG] User details received for ID ${userId}:`,
        userData
      );

      return userData;
    } catch (err) {
      console.error(
        `❌ [DEBUG] Error fetching user details for ID ${userId}:`,
        err
      );
      return null;
    }
  };

  // Fetch students from bookings endpoint and enrich with user details
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 [DEBUG] Starting to fetch students from bookings...");

      const bookingsUrl = `${API_BASE_URL}/bookings/?skip=0&limit=200`;
      console.log(`🔗 [DEBUG] Bookings API URL: ${bookingsUrl}`);

      const response = await fetch(bookingsUrl);

      console.log(`📡 [DEBUG] Bookings response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 [DEBUG] Raw bookings data received:", data);

      if (Array.isArray(data)) {
        console.log(`📊 [DEBUG] Received ${data.length} bookings`);

        // Get unique student IDs first
        const uniqueStudentIds = Array.from(
          new Set(data.map((booking: any) => booking.student_id))
        );

        console.log(
          `👥 [DEBUG] Found ${uniqueStudentIds.length} unique students:`,
          uniqueStudentIds
        );

        // Fetch user details for all unique students first
        const studentDetailsPromises = uniqueStudentIds.map(
          async (studentId) => {
            const userDetails = await fetchUserDetails(studentId);
            return { studentId, userDetails };
          }
        );

        const studentDetailsResults = await Promise.all(studentDetailsPromises);

        // Create a map of studentId to user details for easy lookup
        const studentDetailsMap = new Map();
        studentDetailsResults.forEach(({ studentId, userDetails }) => {
          if (userDetails) {
            studentDetailsMap.set(studentId, userDetails);
          }
        });

        console.log("🗺️ [DEBUG] Student details map:", studentDetailsMap);

        // Transform bookings to students - only include those with real names
        const validStudents: Student[] = [];
        const processedStudentIds = new Set();

        data.forEach((booking: any) => {
          // Skip if we've already processed this student
          if (processedStudentIds.has(booking.student_id)) {
            return;
          }

          const userDetails = studentDetailsMap.get(booking.student_id);

          // Only include students where we successfully got their real name
          if (userDetails) {
            const student: Student = {
              id: booking.id,
              student_id: booking.student_id,
              student_name: userDetails.full_name, // REAL NAME!
              phone_no: booking.phone_no,
              suburb: booking.suburb,
              additional_message: booking.additional_message,
              status: booking.status,
              remarks: booking.remarks,
              created_at: booking.created_at,
              class_id: booking.class_id,
              email: userDetails.email,
              phone_number: userDetails.phone_number,
            };

            validStudents.push(student);
            processedStudentIds.add(booking.student_id);
          }
        });

        console.log(
          `🎉 [DEBUG] Final students with real names: ${validStudents.length}`,
          validStudents
        );
        setStudents(validStudents);
      } else {
        console.log("❌ [DEBUG] Bookings data is not an array:", data);
        setStudents([]);
      }
    } catch (err) {
      console.error("❌ [DEBUG] Error in fetchStudents:", err);
      setError(err instanceof Error ? err.message : "Failed to load students");
      setStudents([]);
    } finally {
      console.log(
        "🏁 [DEBUG] fetchStudents completed, setting loading to false"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🚀 [DEBUG] Component mounted, starting initial fetch");
    console.log(`🔗 [DEBUG] API_BASE_URL: ${API_BASE_URL}`);
    fetchStudents();
  }, []);

  // Get status badge info
  const getStatusBadge = (status: string) => {
    return (
      STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0]
    );
  };

  // Toggle student details expansion
  const toggleStudentExpansion = (studentId: number) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span>Loading students with real names...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchStudents}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Students ({students.length})
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchStudents}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No students found</p>
              <p className="text-sm text-muted-foreground mt-2">
                We only show students when we can load their real names.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student) => {
                const statusInfo = getStatusBadge(student.status);
                const StatusIcon = statusInfo.icon;
                const isExpanded = expandedStudent === student.id;

                return (
                  <div
                    key={student.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    {/* Student Summary */}
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">
                              {student.student_name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Student ID: {student.student_id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Badge variant={statusInfo.color as any}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStudentExpansion(student.id)}
                            className="p-2"
                          >
                            View Details
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t bg-gray-50 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Contact Information */}
                          <div>
                            <h5 className="font-semibold mb-3 text-gray-700">
                              Contact Information
                            </h5>
                            <div className="space-y-3">
                              <div className="flex items-center text-sm">
                                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                <span>
                                  {student.phone_number || student.phone_no}
                                </span>
                              </div>
                              {student.email && (
                                <div className="flex items-center text-sm">
                                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{student.email}</span>
                                </div>
                              )}
                              <div className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{student.suburb}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                <span>
                                  Joined:{" "}
                                  {new Date(
                                    student.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Additional Information */}
                          <div>
                            <h5 className="font-semibold mb-3 text-gray-700">
                              Additional Information
                            </h5>
                            <div className="space-y-3">
                              <div className="flex items-start text-sm">
                                <MessageCircle className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                <span className="flex-1">
                                  <strong>Message:</strong>{" "}
                                  {student.additional_message ||
                                    "No additional message"}
                                </span>
                              </div>
                              <div className="text-sm">
                                <strong>Class ID:</strong> {student.class_id}
                              </div>
                              <div className="text-sm">
                                <strong>Remarks:</strong>{" "}
                                {student.remarks || "No remarks"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm">
                            View Progress
                          </Button>
                          <Button variant="outline" size="sm">
                            Schedule Lesson
                          </Button>
                          <Button variant="outline" size="sm">
                            Add Note
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
