"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Phone } from "lucide-react";

export default function StudentsPage() {
  const [students] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+61 4XX XXX XXX",
      lessonsCompleted: 8,
      nextLesson: "2024-01-20",
      progress: 75,
      notes: "Good progress with parallel parking",
    },
    {
      id: 2,
      name: "James Brown",
      email: "james@example.com",
      phone: "+61 4XX XXX XXX",
      lessonsCompleted: 12,
      nextLesson: "2024-01-22",
      progress: 85,
      notes: "Ready for test preparation",
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{student.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {student.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {student.phone}
                      </span>
                    </p>
                  </div>
                  <Badge variant="outline">{student.progress}% Complete</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">
                      {student.lessonsCompleted}
                    </div>
                    <div className="text-xs text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">{student.nextLesson}</div>
                    <div className="text-xs text-muted-foreground">
                      Next Lesson
                    </div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">{student.progress}%</div>
                    <div className="text-xs text-muted-foreground">
                      Progress
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm">
                    <strong>Notes:</strong> {student.notes}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Schedule Lesson
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Note
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
