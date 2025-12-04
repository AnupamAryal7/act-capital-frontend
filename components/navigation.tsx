// components/navigation.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Car,
  User,
  LogOut,
  Shield,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  // Check user roles
  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";
  const isStudent = user?.role === "student";
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDashboard = () => {
    if (isAdmin) {
      router.push("/admin");
    } else if (isInstructor) {
      router.push("/instructor");
    } else {
      router.push("/dashboard");
    }
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Loading skeleton */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-16 w-16 items-center justify-center  overflow-hidden ">
                <Image
                  src="/act-logo-transparent.png"
                  alt="ACT Capital Logo"
                  height={200}
                  width={200}
                  className="h-full w-full object-contain p-1"
                  priority
                />
              </div>
              <span className="text-3xl text-blue-800 font-bold">
                ᗩᑕT ᑕᗩᑭITᗩᒪ
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}

            {/* Role-specific navigation items */}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                )}

                {isInstructor && (
                  <Link href="/instructor">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Instructor
                    </Button>
                  </Link>
                )}

                {isStudent && (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Student
                    </Button>
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">
                    {user.full_name}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2  bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">Log Out</span>
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}

            <Button size="sm" asChild>
              <Link href="/booking">Book Lesson</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {isLoggedIn && (
                  <>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    {isInstructor && (
                      <Link
                        href="/instructor"
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <GraduationCap className="h-4 w-4" />
                        Instructor Portal
                      </Link>
                    )}

                    {isStudent && (
                      <Link
                        href="/dashboard"
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <BookOpen className="h-4 w-4" />
                        Student Portal
                      </Link>
                    )}
                  </>
                )}

                <div className="pt-4 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <div className="px-2 py-1 text-sm text-muted-foreground">
                        Signed in as {user.full_name} ({user.role})
                      </div>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => {
                          handleDashboard();
                          setIsOpen(false);
                        }}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        User Dashboard
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                  )}

                  <Button className="w-full" asChild>
                    <Link href="/booking" onClick={() => setIsOpen(false)}>
                      Book Lesson
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
