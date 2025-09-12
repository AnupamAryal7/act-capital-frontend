"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Phone, Search } from "lucide-react"

interface Location {
  id: string
  name: string
  address: string
  suburb: string
  distance: string
  phone: string
  hours: string
  services: string[]
}

export function LocationFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const locations: Location[] = [
    {
      id: "main",
      name: "ACT Capital Driving School - Main Office",
      address: "Lort Place, Chisholm, ACT 2905",
      suburb: "Chisholm",
      distance: "0 km",
      phone: "+61 2 3456 7890",
      hours: "Mon-Sun: 7:00 AM - 7:00 PM",
      services: ["Beginner Lessons", "Test Preparation", "Refresher Courses", "Defensive Driving"],
    },
    {
      id: "tuggeranong",
      name: "Tuggeranong Pickup Point",
      address: "Anketell Street, Tuggeranong, ACT 2900",
      suburb: "Tuggeranong",
      distance: "5.2 km",
      phone: "+61 2 3456 7890",
      hours: "Mon-Sun: 7:00 AM - 7:00 PM",
      services: ["Beginner Lessons", "Test Preparation", "Refresher Courses"],
    },
    {
      id: "woden",
      name: "Woden Pickup Point",
      address: "Corinna Street, Woden, ACT 2606",
      suburb: "Woden",
      distance: "8.1 km",
      phone: "+61 2 3456 7890",
      hours: "Mon-Sun: 7:00 AM - 7:00 PM",
      services: ["Beginner Lessons", "Test Preparation"],
    },
    {
      id: "belconnen",
      name: "Belconnen Pickup Point",
      address: "Benjamin Way, Belconnen, ACT 2617",
      suburb: "Belconnen",
      distance: "12.3 km",
      phone: "+61 2 3456 7890",
      hours: "Mon-Sun: 8:00 AM - 6:00 PM",
      services: ["Beginner Lessons", "Refresher Courses"],
    },
  ]

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by suburb or location name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLocations.map((location) => (
          <Card
            key={location.id}
            className={`cursor-pointer transition-all ${
              selectedLocation === location.id ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedLocation(location.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{location.address}</span>
                  </div>
                </div>
                <Badge variant="secondary">{location.distance}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{location.hours}</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <div className="text-sm font-medium mb-2">Available Services:</div>
                <div className="flex flex-wrap gap-1">
                  {location.services.map((service) => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" asChild>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${location.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No locations found</h3>
          <p className="text-muted-foreground">Try searching for a different suburb or location name.</p>
        </div>
      )}
    </div>
  )
}
