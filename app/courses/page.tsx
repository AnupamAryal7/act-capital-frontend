"use client";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Search,
  Filter,
  BookOpen,
  RefreshCw,
} from "lucide-react";

interface Course {
  id: number;
  course_title: string;
  description: string;
  bullet_pt1: string;
  bullet_pt2: string;
  bullet_pt3: string;
  duration: string;
  package_type: string;
  total_price: number;
  discounted_price: number;
  is_active: boolean;
  image_url?: string;
  image_public_id?: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all active courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/courses/active`);
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch courses");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Search courses by term
  const searchCourses = async (term: string) => {
    if (!term.trim()) {
      fetchCourses();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/courses/search/${encodeURIComponent(term)}`
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error searching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter courses by package type
  const filterByPackage = async (packageType: string) => {
    if (packageType === "all") {
      fetchCourses();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/courses/filter/package/${packageType}?is_active=true`
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error filtering by package:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter courses by price range
  const filterByPrice = async (min: string, max: string) => {
    if (!min && !max) {
      fetchCourses();
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (min) params.append("min_price", min);
      if (max) params.append("max_price", max);
      params.append("is_active", "true");

      const response = await fetch(
        `${API_BASE_URL}/courses/filter/price?${params.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error filtering by price:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  const applyFilters = () => {
    if (searchTerm) {
      searchCourses(searchTerm);
    } else if (selectedPackage !== "all") {
      filterByPackage(selectedPackage);
    } else if (minPrice || maxPrice) {
      filterByPrice(minPrice, maxPrice);
    } else {
      fetchCourses();
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPackage("all");
    setMinPrice("");
    setMaxPrice("");
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchCourses(searchTerm);
      } else {
        applyFilters();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const isPopularCourse = (course: Course) => {
    return course.package_type === "gold" || course.package_type === "platinum";
  };

  const handleBookCourse = (courseId: number) => {
    // Redirect to booking page
    console.log("Book course:", courseId);
    // window.location.href = `/booking?course=${courseId}`;
  };

  const handleLearnMore = (courseId: number) => {
    // Redirect to course details page
    console.log("Learn more about course:", courseId);
    // window.location.href = `/courses/${courseId}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                Our Courses
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                Driving Courses for Every Need
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                From complete beginners to experienced drivers looking to
                refresh their skills, we have the perfect course for you.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="py-8 border-b bg-muted/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  disabled={loading}
                >
                  Clear All
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background border rounded-lg">
                  <div>
                    <Label htmlFor="package-filter">Package Type</Label>
                    <Select
                      value={selectedPackage}
                      onValueChange={setSelectedPackage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Packages</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="min-price">Min Price ($)</Label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="max-price">Max Price ($)</Label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end space-x-2">
                    <Button variant="outline" onClick={clearFilters}>
                      Reset
                    </Button>
                    <Button onClick={applyFilters} disabled={loading}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className="text-sm text-muted-foreground">
                {loading ? (
                  <span className="flex items-center">
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    Loading courses...
                  </span>
                ) : (
                  <span>
                    Showing {courses.length} course
                    {courses.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <RefreshCw className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading courses...</span>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find courses.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      {course.image_url ? (
                        <img
                          src={course.image_url}
                          alt={course.course_title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      {isPopularCourse(course) && (
                        <Badge className="absolute top-4 left-4 bg-secondary">
                          Most Popular
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        {course.course_title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {course.description}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-lg">
                            ${course.discounted_price || course.total_price}
                          </span>
                          {course.discounted_price &&
                            course.discounted_price < course.total_price && (
                              <span className="text-sm line-through text-muted-foreground ml-1">
                                ${course.total_price}
                              </span>
                            )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          What's Included:
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-secondary" />
                            <span>{course.bullet_pt1}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-secondary" />
                            <span>{course.bullet_pt2}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-secondary" />
                            <span>{course.bullet_pt3}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <Badge variant="outline" className="capitalize">
                          {course.package_type} Package
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0 space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => handleBookCourse(course.id)}
                      >
                        Book Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => handleLearnMore(course.id)}
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Not Sure Which Course is Right for You?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced instructors can help you choose the perfect course
              based on your current skills and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent"
                asChild
              >
                <Link href="tel:+61234567890">Call Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
