import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function StudentsLoading() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <div className="h-6 bg-muted animate-pulse rounded w-32"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Loading skeleton for students */}
            {[1, 2].map((i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="h-6 bg-muted animate-pulse rounded mb-2 w-32"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-64"></div>
                  </div>
                  <div className="h-6 bg-muted animate-pulse rounded w-24"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="text-center p-2 bg-muted rounded">
                      <div className="h-5 bg-muted animate-pulse rounded mb-1"></div>
                      <div className="h-3 bg-muted animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((k) => (
                    <div
                      key={k}
                      className="h-8 bg-muted animate-pulse rounded w-24"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
