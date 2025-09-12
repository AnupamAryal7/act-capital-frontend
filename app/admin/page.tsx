"use client"
import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const mockBookings = [
  {
    id: "1",
    studentName: "John Smith",
    course: "Beginner Lessons",
    instructor: "Sarah Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    phone: "+61 2 3456 7890",
    email: "john@example.com",
  },
  {
    id: "2",
    studentName: "Emma Wilson",
    course: "Test Preparation",
    instructor: "Mike Chen",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "pending",
    phone: "+61 2 3456 7891",
    email: "emma@example.com",
  },
  {
    id: "3",
    studentName: "David Brown",
    course: "Refresher Course",
    instructor: "Emma Wilson",
    date: "2024-01-16",
    time: "9:00 AM",
    status: "completed",
    phone: "+61 2 3456 7892",
    email: "david@example.com",
  },
]

const mockInstructors = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@actcapital.com.au",
    phone: "+61 2 3456 7893",
    experience: "8 years",
    rating: 4.9,
    totalLessons: 1250,
    status: "active",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@actcapital.com.au",
    phone: "+61 2 3456 7894",
    experience: "6 years",
    rating: 4.8,
    totalLessons: 980,
    status: "active",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@actcapital.com.au",
    phone: "+61 2 3456 7895",
    experience: "10 years",
    rating: 4.9,
    totalLessons: 1580,
    status: "active",
  },
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  const stats = [
    {
      title: "Total Bookings",
      value: "156",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Active Students",
      value: "89",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">ACT Capital Admin</h1>
              <Badge variant="secondary">Dashboard</Badge>
              {user && <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-600">{stat.change} from last month</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{booking.studentName}</p>
                          <p className="text-sm text-muted-foreground">{booking.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{booking.date}</p>
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">10:00 AM - John Smith</p>
                        <p className="text-sm text-muted-foreground">Beginner Lesson with Sarah</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">2:00 PM - Emma Wilson</p>
                        <p className="text-sm text-muted-foreground">Test Prep with Mike</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">4:00 PM - David Brown</p>
                        <p className="text-sm text-muted-foreground">Refresher with Emma</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Manage Bookings</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Booking
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bookings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Student</th>
                        <th className="text-left p-3 font-medium">Course</th>
                        <th className="text-left p-3 font-medium">Instructor</th>
                        <th className="text-left p-3 font-medium">Date & Time</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{booking.studentName}</p>
                              <p className="text-sm text-muted-foreground">{booking.email}</p>
                            </div>
                          </td>
                          <td className="p-3">{booking.course}</td>
                          <td className="p-3">{booking.instructor}</td>
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{booking.date}</p>
                              <p className="text-sm text-muted-foreground">{booking.time}</p>
                            </div>
                          </td>
                          <td className="p-3">{getStatusBadge(booking.status)}</td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructors Tab */}
          <TabsContent value="instructors" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Manage Instructors</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Instructor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockInstructors.map((instructor) => (
                    <Card key={instructor.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{instructor.name}</h3>
                            <p className="text-sm text-muted-foreground">{instructor.experience}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Rating:</span>
                            <span className="font-medium">⭐ {instructor.rating}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total Lessons:</span>
                            <span className="font-medium">{instructor.totalLessons}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Status:</span>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Student Management</h3>
                  <p className="text-muted-foreground mb-4">
                    View and manage all student records, progress, and history.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Reports & Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate detailed reports on bookings, revenue, and performance metrics.
                  </p>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
