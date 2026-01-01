// components/navigation.tsx
"use client";
import { CircleUser } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
  Calendar,
  Star,
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoutModalRef = useRef<HTMLDivElement>(null);

  // Check user roles
  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";
  const isStudent = user?.role === "student";
  const isLoggedIn = !!user;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        logoutModalRef.current &&
        !logoutModalRef.current.contains(event.target as Node)
      ) {
        setShowLogoutConfirm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setIsProfileOpen(false);
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

  const profileMenuItems = [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Calendar, label: "My Bookings", href: "/my-bookings" },
    { icon: BookOpen, label: "View Courses", href: "/courses" },
    { icon: Star, label: "My Reviews", href: "/my-reviews" },
  ];

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
    <>
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
                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition-all"
                      aria-label="Open profile menu"
                    >
                      <User className="w-5 h-5 text-white" />
                    </button>

                    {/* Dropdown Card */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
                        {/* User Info Section */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-gray-900 dark:text-white font-semibold text-sm">
                                {user?.full_name || "User"}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-xs">
                                {user?.role || "Member"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {profileMenuItems.map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <item.icon className="w-4 h-4" />
                              <span className="text-sm">{item.label}</span>
                            </Link>
                          ))}

                          <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>

                          <button
                            className="w-full px-4 py-2.5 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3"
                            onClick={() => {
                              setShowLogoutConfirm(true);
                              setIsProfileOpen(false);
                            }}
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

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
                            setShowLogoutConfirm(true);
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

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div
            ref={logoutModalRef}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-200"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mx-auto mb-4">
              <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Are you sure you want to logout? You'll need to sign in again to
              access your account.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
