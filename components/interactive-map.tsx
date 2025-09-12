"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState("main")

  const locations = [
    {
      id: "main",
      name: "Main Office",
      address: "Lort Place, Chisholm, ACT 2905",
      phone: "+61 2 3456 7890",
      hours: "Mon-Sun: 7:00 AM - 7:00 PM",
      coordinates: { lat: -35.4175, lng: 149.1269 },
    },
    {
      id: "pickup1",
      name: "Tuggeranong Pickup Point",
      address: "Anketell Street, Tuggeranong, ACT 2900",
      phone: "+61 2 3456 7890",
      hours: "Mon-Sun: 7:00 AM - 7:00 PM",
      coordinates: { lat: -35.4244, lng: 149.0867 },
    },
    {
      id: "pickup2",
      name: "Woden Pickup Point",
      address: "Corinna Street, Woden, ACT 2606",
      phone: "+61 2 3456 7890",
      hours: "Mon-Sun: 7:00 AM - 7:00 PM",
      coordinates: { lat: -35.3444, lng: 149.0856 },
    },
  ]

  const currentLocation = locations.find((loc) => loc.id === selectedLocation)

  return (
    <div className="space-y-6">
      {/* Location Selector */}
      <div className="flex flex-wrap gap-2">
        {locations.map((location) => (
          <Button
            key={location.id}
            variant={selectedLocation === location.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLocation(location.id)}
            className="flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4" />
            <span>{location.name}</span>
          </Button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted border">
          {/* Placeholder map - in a real app, this would be Google Maps or similar */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Simple road network illustration */}
                <path d="M0 150 L400 150" stroke="#94a3b8" strokeWidth="3" />
                <path d="M200 0 L200 300" stroke="#94a3b8" strokeWidth="3" />
                <path d="M100 75 L300 225" stroke="#94a3b8" strokeWidth="2" />
                <path d="M100 225 L300 75" stroke="#94a3b8" strokeWidth="2" />
              </svg>
            </div>

            {/* Location marker */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium shadow-lg">
                {currentLocation?.name}
              </div>
            </div>
          </div>
        </div>

        {/* Location Info Overlay */}
        <Card className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">{currentLocation?.name}</div>
                  <div className="text-xs text-muted-foreground">{currentLocation?.address}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Phone</div>
                  <div className="text-xs text-muted-foreground">{currentLocation?.phone}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Hours</div>
                  <div className="text-xs text-muted-foreground">{currentLocation?.hours}</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button size="sm" asChild>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(currentLocation?.address || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${currentLocation?.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
