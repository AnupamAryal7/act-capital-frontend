// app/login/page.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Lock, Mail, User, Loader2, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// API endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CREATE_USER_URL = `${API_BASE_URL}/`;

export default function LoginPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
    role: "student",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleSignup();
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(formData.email, formData.password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Basic phone number validation (optional field)
    if (
      formData.phone &&
      !/^\+?[\d\s\-\(\)]{10,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      const requestBody: any = {
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      // Add phone number if provided
      if (formData.phone.trim()) {
        requestBody.phone_number = formData.phone.trim();
      }

      const response = await fetch(CREATE_USER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User created successfully:", userData);
        setError("");
        setIsLogin(true);
        setFormData((prev) => ({
          ...prev,
          confirmPassword: "",
          phone: "",
          name: "",
          password: "",
        }));
        alert(
          "Account created successfully! Please login with your credentials."
        );
      } else {
        const errorData = await response.json();
        console.error("Signup error response:", errorData);
        setError(
          errorData.detail?.[0]?.msg ||
            errorData.detail ||
            "Failed to create account. Please try again."
        );
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Signup error:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4">
                {isLogin ? "Login" : "Create Account"}
              </Badge>
              <h1 className="text-3xl font-bold text-balance">
                {isLogin
                  ? "Welcome to ACT Capital Driving School"
                  : "Join Our Driving School"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isLogin
                  ? "Sign in to access your account"
                  : "Create an account to start your driving journey"}
              </p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">
                  {isLogin ? "Sign In" : "Sign Up"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                      {error}
                    </div>
                  )}

                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="Enter your phone number (optional)"
                            className="pl-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Optional - helps us contact you about lessons
                        </p>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            placeholder="Confirm your password"
                            className="pl-10"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>

                      {/* ✅ Updated Account Type Selection with Lucide Locks */}
                      <div className="space-y-2">
                        <Label htmlFor="role">Account Type *</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            handleInputChange("role", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="instructor" disabled>
                              <div className="flex items-center text-gray-400 gap-2">
                                <Lock size={14} />
                                Instructor
                              </div>
                            </SelectItem>
                            <SelectItem value="admin" disabled>
                              <div className="flex items-center text-gray-400 gap-2">
                                <Lock size={14} />
                                Admin
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isLogin ? "Signing In..." : "Creating Account..."}
                      </>
                    ) : isLogin ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                      }}
                      className="ml-1 text-primary hover:underline font-medium"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>

                {isLogin && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Demo Credentials
                    </h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>
                        <strong>Student:</strong> student@gmail.com
                      </p>
                      <p>
                        <strong>Password:</strong> student123
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        Use these credentials to test the login functionality
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
