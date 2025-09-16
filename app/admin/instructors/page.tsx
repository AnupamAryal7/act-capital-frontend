"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, Edit, Plus } from "lucide-react";

const mockInstructors = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@actcapital.com.au",
    phone: "+61 2 3456 7893",
    experience: "8 years",
    rating: 4.9,
    totalLessons: 1250,
    status: "active",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@actcapital.com.au",
    phone: "+61 2 3456 7894",
    experience: "6 years",
    rating: 4.8,
    totalLessons: 980,
    status: "active",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@actcapital.com.au",
    phone: "+61 2 3456 7895",
    experience: "10 years",
    rating: 4.9,
    totalLessons: 1580,
    status: "active",
  },
];

export default function Instructors() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Manage Instructors</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Instructor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInstructors.map((instructor) => (
              <Card key={instructor.id} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{instructor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {instructor.experience}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Rating:</span>
                      <span className="font-medium">
                        ⭐ {instructor.rating}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Lessons:</span>
                      <span className="font-medium">
                        {instructor.totalLessons}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
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
