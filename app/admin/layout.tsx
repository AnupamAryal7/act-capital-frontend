// app/admin/layout.tsx
"use client";

import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

// Inner component that contains the admin dashboard UI
function AdminDashboard({ children }: { children: ReactNode }) {
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
    { label: "FAQs", path: "/admin/faqs" },
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

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid w-full grid-cols-6 bg-muted p-1 rounded-lg mb-6">
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

        {/* Page-specific content */}
        {children}
      </div>
    </div>
  );
}

// Main layout component that wraps everything in ProtectedRoute
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute
      requiredRole="admin"
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
      <AdminDashboard>{children}</AdminDashboard>
    </ProtectedRoute>
  );
}
