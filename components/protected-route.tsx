"use client";

import type React from "react";

import { useAuth } from "./auth-provider";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "instructor" | "student";
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/login";
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              Please Login with correct credentials to access this page.
            </p>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
