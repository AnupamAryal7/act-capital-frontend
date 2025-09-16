"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, LogOut } from "lucide-react";
import Overview from "@/components/admin_overview";

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

        <Overview />

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
