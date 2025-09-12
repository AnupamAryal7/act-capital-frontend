"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, X, AlertCircle } from "lucide-react"

export function EmergencyContactBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="border-orange-200 bg-orange-50 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-orange-900">Need Immediate Help?</h4>
              <p className="text-sm text-orange-800 mt-1">Contact us for urgent booking or lesson changes</p>
              <Button size="sm" className="mt-2 bg-orange-600 hover:bg-orange-700" asChild>
                <a href="tel:+61234567890">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
