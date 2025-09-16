import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
];

export default function Overview() {
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
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">
                    {stat.change} from last month
                  </p>
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
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{booking.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.course}
                    </p>
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
                  <p className="text-sm text-muted-foreground">
                    Beginner Lesson with Sarah
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">2:00 PM - Emma Wilson</p>
                  <p className="text-sm text-muted-foreground">
                    Test Prep with Mike
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">4:00 PM - David Brown</p>
                  <p className="text-sm text-muted-foreground">
                    Refresher with Emma
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
