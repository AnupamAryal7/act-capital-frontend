"use client";
import { useState } from "react";
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
  BookOpen,
  Plus,
  Edit,
  Eye,
  Clock,
  DollarSign,
  Upload,
} from "lucide-react";

const mockCourses = [
  {
    id: "1",
    name: "Beginner Lessons",
    description: "Complete driving course for beginners",
    duration: "20 hours",
    price: "$850",
    status: "active",
    enrolledStudents: 45,
    instructor: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Test Preparation",
    description: "Intensive preparation for driving test",
    duration: "8 hours",
    price: "$350",
    status: "active",
    enrolledStudents: 23,
    instructor: "Mike Chen",
  },
  {
    id: "3",
    name: "Refresher Course",
    description: "Quick refresher for experienced drivers",
    duration: "5 hours",
    price: "$250",
    status: "active",
    enrolledStudents: 12,
    instructor: "Emma Wilson",
  },
  {
    id: "4",
    name: "Advanced Driving",
    description: "Advanced techniques and defensive driving",
    duration: "15 hours",
    price: "$650",
    status: "draft",
    enrolledStudents: 0,
    instructor: "Sarah Johnson",
  },
];

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

export default function Courses() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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

      const response = await fetch("http://127.0.0.1:8000/api/v1/courses/", {
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

        // Here you would typically refresh the courses list or add to state
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
                      <Label htmlFor="discounted_price">Discounted Price</Label>
                      <Input
                        id="discounted_price"
                        type="number"
                        value={formData.discounted_price}
                        onChange={(e) =>
                          handleInputChange("discounted_price", e.target.value)
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
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {mockCourses.map((course) => (
              <Card key={course.id} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(course.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {course.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Enrolled Students:</span>
                      <span className="font-medium">
                        {course.enrolledStudents}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Primary Instructor:</span>
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
