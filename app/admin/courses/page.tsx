import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Edit, Eye, Clock, DollarSign } from "lucide-react";

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

export default function Courses() {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Course Management</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
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
