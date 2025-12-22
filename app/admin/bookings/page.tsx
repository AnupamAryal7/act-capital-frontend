"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Edit, Trash2, Plus, Download } from "lucide-react";

// Mock data for demonstration
const mockBookings = [
  {
    id: "1",
    studentName: "John Smith",
    course: "Beginner Lessons",
    instructor: "Sarah Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    phone: "+61 2 3456 7890",
    email: "john@example.com",
  },
  {
    id: "2",
    studentName: "Emma Wilson",
    course: "Test Preparation",
    instructor: "Mike Chen",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "pending",
    phone: "+61 2 3456 7891",
    email: "emma@example.com",
  },
  {
    id: "3",
    studentName: "David Brown",
    course: "Refresher Course",
    instructor: "Emma Wilson",
    date: "2024-01-16",
    time: "9:00 AM",
    status: "completed",
    phone: "+61 2 3456 7892",
    email: "david@example.com",
  },
];

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Manage Bookings</CardTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Student</th>
                  <th className="text-left p-3 font-medium">Course</th>
                  <th className="text-left p-3 font-medium">Instructor</th>
                  <th className="text-left p-3 font-medium">Date & Time</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">{booking.course}</td>
                    <td className="p-3">{booking.instructor}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.time}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">{getStatusBadge(booking.status)}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bookings Cards - Mobile */}
          <div className="lg:hidden space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">
                        {booking.studentName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.phone}
                      </p>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Course:</span>
                      <p className="text-muted-foreground">{booking.course}</p>
                    </div>
                    <div>
                      <span className="font-medium">Instructor:</span>
                      <p className="text-muted-foreground">
                        {booking.instructor}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Date & Time:</span>
                      <p className="text-muted-foreground">
                        {booking.date} at {booking.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
