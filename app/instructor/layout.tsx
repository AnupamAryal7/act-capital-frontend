import type React from "react";
import { ProtectedRoute } from "@/components/protected-route";
import Link from "next/link";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute
      requiredRole="instructor"
      fallbacke={
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
      {children}
    </ProtectedRoute>
  );
}
