import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CalendarLoading() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted animate-pulse rounded w-32"></div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="h-12 w-12 bg-muted animate-pulse rounded mx-auto mb-4"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-64 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
