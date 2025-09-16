import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const mockProgress = [
  { name: "Alice Johnson", course: "Defensive Driving", progress: 85 },
  { name: "Bob Smith", course: "Basic Car Control", progress: 60 },
  { name: "Charlie Lee", course: "Highway Driving", progress: 45 },
  { name: "Diana Prince", course: "Traffic Rules & Safety", progress: 95 },
];

export default function ProgressReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Progress Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockProgress.map((student, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.course}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {student.progress}%
                  </span>
                </div>
                <Progress value={student.progress} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
