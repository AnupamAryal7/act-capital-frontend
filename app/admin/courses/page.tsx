"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  BookOpen,
  Plus,
  Edit,
  Eye,
  Clock,
  DollarSign,
  Trash2,
  Search,
  Filter,
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

interface CourseFormData {
  course_title: string;
  description: string;
  bullet_pt1: string;
  bullet_pt2: string;
  bullet_pt3: string;
  duration: string;
  package_type: string;
  total_price: string;
  discounted_price: string;
  is_active: boolean;
  image: File | null;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPackage, setFilterPackage] = useState("all");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const [formData, setFormData] = useState<CourseFormData>({
    course_title: "",
    description: "",
    bullet_pt1: "",
    bullet_pt2: "",
    bullet_pt3: "",
    duration: "",
    package_type: "",
    total_price: "",
    discounted_price: "",
    is_active: true,
    image: null,
  });

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/courses/`;

      if (showActiveOnly) {
        url = `${API_BASE_URL}/courses/active`;
      }

      const response = await fetch(url);
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

  // Search courses
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
      }
    } catch (error) {
      console.error("Error searching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter by package type
  const filterByPackage = async (packageType: string) => {
    if (packageType === "all") {
      fetchCourses();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/courses/filter/package/${packageType}`
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error filtering courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete course
  const deleteCourse = async (courseId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCourses();
        alert("Course deleted successfully!");
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course");
    }
  };

  // Hard delete course
  const hardDeleteCourse = async (courseId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/hard/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCourses();
        alert("Course permanently deleted!");
      } else {
        alert("Failed to permanently delete course");
      }
    } catch (error) {
      console.error("Error permanently deleting course:", error);
      alert("Error permanently deleting course");
    }
  };

  // Restore course
  const restoreCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/${courseId}/restore`,
        {
          method: "PATCH",
        }
      );
      if (response.ok) {
        fetchCourses();
        alert("Course restored successfully!");
      } else {
        alert("Failed to restore course");
      }
    } catch (error) {
      console.error("Error restoring course:", error);
      alert("Error restoring course");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [showActiveOnly]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchCourses(searchTerm);
      } else {
        fetchCourses();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    filterByPackage(filterPackage);
  }, [filterPackage]);

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    );
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !formData.course_title ||
      !formData.description ||
      !formData.bullet_pt1 ||
      !formData.bullet_pt2 ||
      !formData.bullet_pt3 ||
      !formData.duration ||
      !formData.package_type ||
      !formData.total_price ||
      !formData.image
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append("course_title", formData.course_title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("bullet_pt1", formData.bullet_pt1);
      formDataToSend.append("bullet_pt2", formData.bullet_pt2);
      formDataToSend.append("bullet_pt3", formData.bullet_pt3);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("package_type", formData.package_type);
      formDataToSend.append("total_price", formData.total_price);
      formDataToSend.append("discounted_price", formData.discounted_price);
      formDataToSend.append("is_active", formData.is_active.toString());

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch(`${API_BASE_URL}/courses/`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const newCourse = await response.json();
        console.log("Course created successfully:", newCourse);

        // Reset form
        setFormData({
          course_title: "",
          description: "",
          bullet_pt1: "",
          bullet_pt2: "",
          bullet_pt3: "",
          duration: "",
          package_type: "",
          total_price: "",
          discounted_price: "",
          is_active: true,
          image: null,
        });

        // Reset file input
        const fileInput = document.getElementById("image") as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }

        // Close modal
        setIsCreateModalOpen(false);

        // Refresh courses list
        fetchCourses();

        alert("Course created successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error creating course:", errorData);
        alert("Error creating course. Please check the form data.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Course Management</CardTitle>
              <Dialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
              >
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="course_title">Course Title *</Label>
                        <Input
                          id="course_title"
                          value={formData.course_title}
                          onChange={(e) =>
                            handleInputChange("course_title", e.target.value)
                          }
                          placeholder="Enter course title"
                          maxLength={50}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration *</Label>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) =>
                            handleInputChange("duration", e.target.value)
                          }
                          placeholder="e.g., 20 hours"
                          maxLength={25}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Enter course description"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Course Highlights *</Label>
                      <Input
                        value={formData.bullet_pt1}
                        onChange={(e) =>
                          handleInputChange("bullet_pt1", e.target.value)
                        }
                        placeholder="First highlight"
                        maxLength={80}
                      />
                      <Input
                        value={formData.bullet_pt2}
                        onChange={(e) =>
                          handleInputChange("bullet_pt2", e.target.value)
                        }
                        placeholder="Second highlight"
                        maxLength={80}
                      />
                      <Input
                        value={formData.bullet_pt3}
                        onChange={(e) =>
                          handleInputChange("bullet_pt3", e.target.value)
                        }
                        placeholder="Third highlight"
                        maxLength={80}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="package_type">Package Type *</Label>
                        <Select
                          value={formData.package_type}
                          onValueChange={(value) =>
                            handleInputChange("package_type", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select package type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bronze">Bronze</SelectItem>
                            <SelectItem value="silver">Silver</SelectItem>
                            <SelectItem value="gold">Gold</SelectItem>
                            <SelectItem value="platinum">Platinum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="is_active">Status</Label>
                        <Select
                          value={formData.is_active.toString()}
                          onValueChange={(value) =>
                            handleInputChange("is_active", value === "true")
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="total_price">Total Price *</Label>
                        <Input
                          id="total_price"
                          type="number"
                          value={formData.total_price}
                          onChange={(e) =>
                            handleInputChange("total_price", e.target.value)
                          }
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discounted_price">
                          Discounted Price
                        </Label>
                        <Input
                          id="discounted_price"
                          type="number"
                          value={formData.discounted_price}
                          onChange={(e) =>
                            handleInputChange(
                              "discounted_price",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="image">Course Image *</Label>
                      <div className="mt-2">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload JPEG, PNG, or WebP image
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateModalOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Course"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterPackage} onValueChange={setFilterPackage}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Package" />
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

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowActiveOnly(!showActiveOnly)}
                className={showActiveOnly ? "bg-green-50 text-green-700" : ""}
              >
                {showActiveOnly ? "Show All" : "Active Only"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={fetchCourses}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading courses...</span>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No courses found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden border-0 shadow-sm bg-gray-50"
                >
                  {/* Course Image */}
                  <div className="relative h-48 w-full">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.course_title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(course.is_active)}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Course Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.course_title}
                    </h3>

                    {/* Course Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Duration and Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-gray-900" />
                        <span className="text-lg font-semibold text-gray-900">
                          ${course.discounted_price || course.total_price}
                        </span>
                        {course.discounted_price &&
                          course.discounted_price < course.total_price && (
                            <span className="text-sm line-through text-gray-500 ml-1">
                              ${course.total_price}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* What's Included */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        What's Included:
                      </h4>
                      <ul className="space-y-1">
                        <li className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {course.bullet_pt1}
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {course.bullet_pt2}
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {course.bullet_pt3}
                        </li>
                      </ul>
                    </div>

                    {/* Package Type */}
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
                        {course.package_type} Package
                      </span>
                    </div>

                    {/* Action Buttons for Customers
                    <div className="space-y-2">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          // Book Now functionality
                          console.log("Book Now:", course.id);
                        }}
                      >
                        Book Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // Inquiry functionality
                          console.log("Inquiry:", course.id);
                        }}
                      >
                        Inquiry
                      </Button>
                    </div> */}

                    {/* Admin Actions - Separator */}
                    <hr className="my-4 border-gray-200" />

                    {/* Admin Controls */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          // View course details
                          console.log("View course:", course.id);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          // Edit course
                          console.log("Edit course:", course.id);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Course</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "
                              {course.course_title}"? This action can be undone
                              later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteCourse(course.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
