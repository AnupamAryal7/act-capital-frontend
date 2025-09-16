import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Lessons Taught</span>
                <span className="font-semibold">87</span>
              </div>
              <div className="flex justify-between">
                <span>Student Pass Rate</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex justify-between">
                <span>Average Rating</span>
                <span className="font-semibold">4.9/5</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue</span>
                <span className="font-semibold">$2,450</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Ready for Test</span>
                <span className="font-semibold">5 students</span>
              </div>
              <div className="flex justify-between">
                <span>In Progress</span>
                <span className="font-semibold">15 students</span>
              </div>
              <div className="flex justify-between">
                <span>New Students</span>
                <span className="font-semibold">4 students</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
