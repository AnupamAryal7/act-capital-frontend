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

  // Fetch students from bookings endpoint
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${API_BASE_URL}/bookings/?skip=0&limit=200`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        // Transform booking data into student data and remove duplicates
        const uniqueStudents = data
          .map((booking: any) => ({
            id: booking.id,
            student_id: booking.student_id,
            student_name: `Student ${booking.student_id}`, // Replace with actual name if available
            phone_no: booking.phone_no,
            suburb: booking.suburb,
            additional_message: booking.additional_message,
            status: booking.status,
            remarks: booking.remarks,
            created_at: booking.created_at,
            class_id: booking.class_id,
          }))
          .filter(
            (student: Student, index: number, self: Student[]) =>
              index ===
              self.findIndex(
                (s: Student) => s.student_id === student.student_id
              )
          );

        setStudents(uniqueStudents);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err instanceof Error ? err.message : "Failed to load students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
              <span>Loading students...</span>
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
                                <span>{student.phone_no}</span>
                              </div>
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
