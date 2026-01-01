// components/navigation.tsx
"use client";
import { CircleUser } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  { name: "FAQ", href: "/faqs" },
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="ml-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-[80px] w-[200px] items-center justify-center  overflow-hidden ">
                <Image
                  src="/act_capital_logo_transparent.png"
                  alt="ACT Capital Logo"
                  height={200}
                  width={200}
                  className="h-full w-full object-contain p-1"
                  priority
                />
              </div>
              <span className="text-3xl text-blue-800 font-bold"></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group inline-block text-lg font-bold text-muted-foreground transition-colors duration-300 ease-in-out hover:text-primary"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all duration-300 ease-in-out group-hover:w-full" />
              </Link>
            ))}

            {/* Role-specific navigation items */}
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 ease-linear
                bg-[#0070f3]
                shadow-[0_0_10px_rgba(0,118,255,0.6)]
                hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                hover:bg-[rgba(0,118,255,0.95)]
                button-pulse"
                    >
                      <Shield className="h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                )}

                {isInstructor && (
                  <Link href="/instructor">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 ease-linear
                bg-[#0070f3]
                shadow-[0_0_10px_rgba(0,118,255,0.6)]
                hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                hover:bg-[rgba(0,118,255,0.95)]
                button-pulse"
                    >
                      <GraduationCap className="h-4 w-4" />
                      Instructor
                    </Button>
                  </Link>
                )}

                {isStudent && (
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 ease-linear
                bg-[#0070f3]
                shadow-[0_0_10px_rgba(0,118,255,0.6)]
                hover:shadow-[0_0_25px_rgba(0,118,255,1),0_0_50px_rgba(0,118,255,0.8)]
                hover:bg-[rgba(0,118,255,0.95)]
                button-pulse"
                    >
                      <BookOpen className="h-4 w-4" />
                      Student
                    </Button>
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 mr-6">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
                <Button size="sm" asChild>
                  <Link href="/booking">Book Session</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <CircleUser />
                </Link>
                <h1 className="text-2xl">|</h1>
                <Button size="sm" asChild>
                  <Link href="/booking">Book Session</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="transform transition-transform duration-300 hover:scale-105 active:scale-95 p-2 text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" strokeWidth={2} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col items-center text-center space-y-4 px-6 py-4 mt-6 sm:mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="w-full text-lg font-medium text-foreground hover:text-primary transition-colors text-center"
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
                        className="w-full text-lg font-medium text-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="h-5 w-5" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    {isInstructor && (
                      <Link
                        href="/instructor"
                        className="w-full text-lg font-medium text-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <GraduationCap className="h-5 w-5" />
                        <span>Instructor Portal</span>
                      </Link>
                    )}

                    {isStudent && (
                      <Link
                        href="/dashboard"
                        className="w-full text-lg font-medium text-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <BookOpen className="h-5 w-5" />
                        <span>Student Portal</span>
                      </Link>
                    )}
                  </>
                )}

                <div className="pt-4 space-y-3 w-full flex flex-col items-center">
                  {isLoggedIn ? (
                    <>
                      <div className="px-2 py-1 text-sm text-muted-foreground text-center">
                        Signed in as {user.full_name} ({user.role})
                      </div>

                      <Button
                        variant="outline"
                        className="w-full max-w-xs mx-auto bg-transparent"
                        onClick={() => {
                          handleDashboard();
                          setIsOpen(false);
                        }}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        <span>Dashboard</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full max-w-xs mx-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Logout</span>
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full max-w-xs mx-auto bg-transparent"
                      asChild
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center justify-center gap-2">
                          <CircleUser />
                          <span>Login</span>
                        </div>
                      </Link>
                    </Button>
                  )}

                  <Button className="w-full max-w-xs mx-auto" asChild>
                    <Link href="/booking" onClick={() => setIsOpen(false)}>
                      Book Session
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
