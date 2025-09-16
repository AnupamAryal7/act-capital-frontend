"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp, Clock } from "lucide-react";

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

export default function Overview() {
  const stats = [
    {
      title: "Total Bookings",
      value: "156",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Active Students",
      value: "89",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

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

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true;
    if (path !== "/admin" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: "Overview", path: "/admin" },
    { label: "Bookings", path: "/admin/bookings" },
    { label: "Instructors", path: "/admin/instructors" },
    { label: "Students", path: "/admin/students" },
    { label: "Reports", path: "/admin/reports" },
    { label: "Courses", path: "/admin/courses" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">ACT Capital Admin</h1>
              <Badge variant="secondary">Dashboard</Badge>
              {user && (
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.name}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="grid w-full grid-cols-6 bg-muted p-1 rounded-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md text-center transition-colors
                  ${
                    isActive(item.path)
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
