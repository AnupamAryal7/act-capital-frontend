"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  Users,
  Star,
  DollarSign,
  FileText,
  CalendarCheck,
  MessageSquarePlus,
} from "lucide-react";

interface InstructorUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

// Inner component that contains the instructor dashboard UI
function InstructorDashboard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<InstructorUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isActive = (path: string) => {
    if (path === "/instructor" && pathname === "/instructor") return true;
    if (path !== "/instructor" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    {
      label: "Today's Schedule",
      path: "/instructor/schedule",
      icon: Clock,
    },
    {
      label: "My Students",
      path: "/instructor/students",
      icon: Users,
    },
    {
      label: "Reports",
      path: "/instructor/reports",
      icon: FileText,
    },
    {
      label: "New Bookings",
      path: "/instructor/bookings",
      icon: CalendarCheck,
    },
    {
      label: "Add FAQs",
      path: "/instructor/add_faqs",
      icon: MessageSquarePlus,
    },
    {
      label: "Add Courses",
      path: "/instructor/add_courses",
      icon: MessageSquarePlus,
    },
  ];

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

          {/* Navigation Tabs */}
          <div className="hidden md:grid w-full grid-cols-6 bg-muted p-1 rounded-lg mb-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-md text-center transition-colors flex items-center justify-center gap-2
                    ${
                      isActive(item.path)
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    p-3 text-sm font-medium rounded-lg text-center transition-colors flex flex-col items-center gap-2 min-h-[80px] justify-center
                    ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }
                  `}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Page-specific content */}
          {children}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Main layout component that wraps everything in ProtectedRoute
export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute
      requiredRole="instructor"
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <p className="text-lg font-semibold mb-4">
            Access denied to this page
          </p>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      }
    >
      <InstructorDashboard>{children}</InstructorDashboard>
    </ProtectedRoute>
  );
}
