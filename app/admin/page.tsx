"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
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
      <Overview />

      {/* Page Content */}
      {children}
    </div>
  );
}
