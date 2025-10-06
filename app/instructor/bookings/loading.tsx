import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Skeleton */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-10 w-64 mb-2 bg-white/20" />
            <Skeleton className="h-6 w-96 bg-white/20" />
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters Skeleton */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </CardContent>
            </Card>

            {/* Table Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                {/* Desktop Table Skeleton */}
                <div className="hidden lg:block space-y-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-8 gap-4 pb-4 border-b">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>

                  {/* Table Rows */}
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                    <div
                      key={row}
                      className="grid grid-cols-8 gap-4 py-4 border-b"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
                        <Skeleton key={col} className="h-4 w-full" />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Mobile Card Skeleton */}
                <div className="lg:hidden space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Skeleton className="h-8 flex-1" />
                          <Skeleton className="h-8 flex-1" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-5 w-32 bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-3/4 bg-white/20" />
                  <Skeleton className="h-4 w-5/6 bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
