import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function ScheduleLoading() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <div className="h-6 bg-muted animate-pulse rounded w-64"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Loading skeleton for lessons */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                    <div className="h-5 bg-muted animate-pulse rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-6 bg-muted animate-pulse rounded mb-2 w-32"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-96"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-muted animate-pulse rounded w-20"></div>
                  <div className="h-8 bg-muted animate-pulse rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
