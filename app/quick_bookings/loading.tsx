"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, User, MessageSquare, CreditCard } from "lucide-react";

export default function QuickBookingLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-64 bg-white/20 mb-2" />
          <Skeleton className="h-4 w-80 bg-white/20" />
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps Skeleton */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 bg-white"
                  >
                    <div className="animate-pulse bg-gray-200 w-6 h-6 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <Skeleton className="h-4 w-16 bg-gray-300" />
                <Skeleton className="h-4 w-16 bg-gray-300" />
                <Skeleton className="h-4 w-16 bg-gray-300" />
              </div>
            </div>

            {/* Main Content Skeleton */}
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Header with Icon */}
                  <div className="text-center">
                    <div className="animate-pulse">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    </div>
                    <Skeleton className="h-7 w-64 mx-auto mb-2 bg-gray-300" />
                    <Skeleton className="h-4 w-80 mx-auto bg-gray-300" />
                  </div>

                  {/* Course Card Skeleton */}
                  <Card className="border-gray-200">
                    <CardContent className="p-6 space-y-4">
                      {/* Title and Badge */}
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-48 bg-gray-300" />
                        <Skeleton className="h-6 w-20 bg-gray-300" />
                      </div>

                      {/* Description */}
                      <Skeleton className="h-4 w-full bg-gray-300" />
                      <Skeleton className="h-4 w-3/4 bg-gray-300" />

                      {/* Duration and Price */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Skeleton className="h-4 w-16 mb-1 bg-gray-300" />
                          <Skeleton className="h-4 w-20 bg-gray-300" />
                        </div>
                        <div>
                          <Skeleton className="h-4 w-16 mb-1 bg-gray-300" />
                          <Skeleton className="h-4 w-20 bg-gray-300" />
                        </div>
                      </div>

                      {/* Instructor Skeleton */}
                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                        <Skeleton className="w-10 h-10 rounded-full bg-gray-300" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32 bg-gray-300" />
                          <Skeleton className="h-3 w-48 bg-gray-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Date and Time Section */}
                  <div className="space-y-4">
                    {/* Date Input */}
                    <div>
                      <Skeleton className="h-5 w-24 mb-2 bg-gray-300" />
                      <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Time and Duration Inputs */}
                      <div className="space-y-4">
                        <div>
                          <Skeleton className="h-5 w-24 mb-2 bg-gray-300" />
                          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
                        </div>
                        <div>
                          <Skeleton className="h-5 w-24 mb-2 bg-gray-300" />
                          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
                        </div>
                      </div>

                      {/* Booked Sessions */}
                      <div>
                        <Skeleton className="h-5 w-40 mb-2 bg-gray-300" />
                        <div className="border rounded-lg p-3 bg-gray-50 space-y-3">
                          {[1, 2].map((item) => (
                            <div key={item} className="animate-pulse">
                              <div className="bg-gray-200 rounded-md p-3">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-2">
                                    <Skeleton className="h-4 w-24 bg-gray-300" />
                                    <Skeleton className="h-3 w-32 bg-gray-300" />
                                  </div>
                                  <Skeleton className="h-5 w-14 bg-gray-300 rounded-full" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons Skeleton */}
                  <div className="flex justify-between pt-6">
                    <Skeleton className="h-10 w-24 bg-gray-300 rounded-md" />
                    <Skeleton className="h-10 w-24 bg-gray-300 rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
