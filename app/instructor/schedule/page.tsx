"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, MapPin, Phone } from "lucide-react";

export default function SchedulePage() {
  const [todayLessons] = useState([
    {
      id: 1,
      time: "9:00 AM",
      student: "Emma Wilson",
      type: "Practical Lesson",
      location: "Chisholm, ACT",
      phone: "+61 4XX XXX XXX",
      status: "confirmed",
    },
    {
      id: 2,
      time: "11:00 AM",
      student: "James Brown",
      type: "Highway Driving",
      location: "Tuggeranong, ACT",
      phone: "+61 4XX XXX XXX",
      status: "confirmed",
    },
    {
      id: 3,
      time: "2:00 PM",
      student: "Sarah Davis",
      type: "Test Preparation",
      location: "Woden, ACT",
      phone: "+61 4XX XXX XXX",
      status: "pending",
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Lessons - {new Date().toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <div className="text-lg font-semibold">{lesson.time}</div>
                    <Badge
                      variant={
                        lesson.status === "confirmed" ? "default" : "secondary"
                      }
                    >
                      {lesson.status}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{lesson.student}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {lesson.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {lesson.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {lesson.phone}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                  <Button size="sm">Start Lesson</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
