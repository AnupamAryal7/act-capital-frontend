"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export function QuickBookingWidget() {
  const [quickBooking, setQuickBooking] = useState({
    course: "",
    instructor: "",
    timePreference: "",
  })

  const handleQuickBooking = () => {
    // Redirect to booking page with pre-filled data
    const params = new URLSearchParams()
    if (quickBooking.course) params.set("course", quickBooking.course)
    if (quickBooking.instructor) params.set("instructor", quickBooking.instructor)
    if (quickBooking.timePreference) params.set("time", quickBooking.timePreference)

    window.location.href = `/booking?${params.toString()}`
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Quick Booking</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Get started with a few quick selections</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Course Type</label>
          <Select onValueChange={(value) => setQuickBooking((prev) => ({ ...prev, course: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner Lessons</SelectItem>
              <SelectItem value="refresher">Refresher Course</SelectItem>
              <SelectItem value="test-prep">Test Preparation</SelectItem>
              <SelectItem value="defensive">Defensive Driving</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Instructor</label>
          <Select onValueChange={(value) => setQuickBooking((prev) => ({ ...prev, instructor: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Any instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
              <SelectItem value="mike">Mike Chen</SelectItem>
              <SelectItem value="emma">Emma Wilson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Time Preference</label>
          <Select onValueChange={(value) => setQuickBooking((prev) => ({ ...prev, timePreference: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Any time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (7AM - 12PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
              <SelectItem value="evening">Evening (5PM - 7PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={handleQuickBooking} disabled={!quickBooking.course}>
          Continue Booking
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>

        <div className="text-center">
          <Link href="/booking" className="text-sm text-primary hover:underline">
            Or start from scratch
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
