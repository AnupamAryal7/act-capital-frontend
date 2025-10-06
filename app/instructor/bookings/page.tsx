"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  RefreshCw,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Check,
  X,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserX,
} from "lucide-react";

interface Booking {
  id: number;
  student_id: number;
  class_id: number;
  phone_no: string;
  suburb: string;
  additional_message: string;
  status: string;
  remarks: string;
  created_at: string;
  updated_at: string | null;
}

interface UpdateBookingData {
  phone_no: string;
  suburb: string;
  status: string;
  remarks: string;
  additional_message: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", icon: Clock, color: "default" },
  {
    value: "confirmed",
    label: "Confirmed",
    icon: CheckCircle,
    color: "default",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    color: "destructive",
  },
  { value: "attended", label: "Attended", icon: Check, color: "secondary" },
  { value: "no_show", label: "No Show", icon: UserX, color: "destructive" },
];

export default function InstructorBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<UpdateBookingData>({
    phone_no: "",
    suburb: "",
    status: "",
    remarks: "",
    additional_message: "",
  });
  const [newStatus, setNewStatus] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/bookings/?skip=0&limit=200`
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
        setFilteredBookings(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch bookings");
        setBookings([]);
        setFilteredBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Search by phone number
  const searchByPhone = async (phoneNo: string) => {
    if (!phoneNo.trim()) {
      setFilteredBookings(bookings);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/bookings/phone/${phoneNo}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredBookings(Array.isArray(data) ? data : []);
      } else {
        setFilteredBookings([]);
      }
    } catch (error) {
      console.error("Error searching by phone:", error);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/bookings/${bookingId}/status?status=${status}`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        alert("Booking status updated successfully!");
        fetchBookings();
        setIsStatusDialogOpen(false);
        setSelectedBooking(null);
      } else {
        alert("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Error updating booking status");
    }
  };

  // Update full booking
  const updateBooking = async (bookingId: number, data: UpdateBookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Booking updated successfully!");
        fetchBookings();
        setIsEditDialogOpen(false);
        setSelectedBooking(null);
      } else {
        alert("Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Error updating booking");
    }
  };

  // Delete booking
  const deleteBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (response.status === 204 || response.ok) {
        alert("Booking deleted successfully!");
        fetchBookings();
        setIsDeleteDialogOpen(false);
        setSelectedBooking(null);
      } else {
        alert("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Error deleting booking");
    }
  };

  // Filter bookings
  useEffect(() => {
    let filtered = [...bookings];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Search filter (search in multiple fields)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.phone_no.toLowerCase().includes(query) ||
          booking.suburb.toLowerCase().includes(query) ||
          booking.id.toString().includes(query) ||
          booking.student_id.toString().includes(query)
      );
    }

    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [statusFilter, searchQuery, bookings]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Open edit dialog
  const openEditDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditFormData({
      phone_no: booking.phone_no,
      suburb: booking.suburb,
      status: booking.status,
      remarks: booking.remarks,
      additional_message: booking.additional_message,
    });
    setIsEditDialogOpen(true);
  };

  // Open status update dialog
  const openStatusDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setIsStatusDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    const statusOption = STATUS_OPTIONS.find((opt) => opt.value === status);
    return statusOption || STATUS_OPTIONS[0];
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Booking Management
            </h1>
            <p className="text-lg text-white/90">
              Manage and track all student bookings
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Bookings</p>
                      <p className="text-2xl font-bold">{bookings.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold">
                        {bookings.filter((b) => b.status === "pending").length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Confirmed</p>
                      <p className="text-2xl font-bold">
                        {
                          bookings.filter((b) => b.status === "confirmed")
                            .length
                        }
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Attended</p>
                      <p className="text-2xl font-bold">
                        {bookings.filter((b) => b.status === "attended").length}
                      </p>
                    </div>
                    <Check className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search by phone, suburb, booking ID, or student ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchBookings}
                    disabled={loading}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        loading ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </Button>

                  <p className="text-sm text-gray-600">
                    Showing {filteredBookings.length} of {bookings.length}{" "}
                    bookings
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin mr-2" />
                    <span>Loading bookings...</span>
                  </div>
                ) : currentBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookings found</p>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Student ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Class ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Phone
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Suburb
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Created
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {currentBookings.map((booking) => {
                            const statusInfo = getStatusBadge(booking.status);
                            const StatusIcon = statusInfo.icon;
                            return (
                              <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 text-sm font-medium">
                                  #{booking.id}
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  {booking.student_id}
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  {booking.class_id}
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    {booking.phone_no}
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-gray-400" />
                                    {booking.suburb}
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  <Badge variant={statusInfo.color as any}>
                                    <StatusIcon className="h-3 w-3 mr-1" />
                                    {statusInfo.label}
                                  </Badge>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-600">
                                  {new Date(
                                    booking.created_at
                                  ).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => openStatusDialog(booking)}
                                      title="Update Status"
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => openEditDialog(booking)}
                                      title="Edit Booking"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => openDeleteDialog(booking)}
                                      title="Delete Booking"
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {currentBookings.map((booking) => {
                        const statusInfo = getStatusBadge(booking.status);
                        const StatusIcon = statusInfo.icon;
                        return (
                          <Card key={booking.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <p className="font-semibold">
                                    Booking #{booking.id}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Student: {booking.student_id} | Class:{" "}
                                    {booking.class_id}
                                  </p>
                                </div>
                                <Badge variant={statusInfo.color as any}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {statusInfo.label}
                                </Badge>
                              </div>

                              <div className="space-y-2 mb-4">
                                <p className="text-sm flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  {booking.phone_no}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  {booking.suburb}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  {new Date(
                                    booking.created_at
                                  ).toLocaleDateString()}
                                </p>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => openStatusDialog(booking)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Status
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => openEditDialog(booking)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openDeleteDialog(booking)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">
                          Page {currentPage} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(totalPages, prev + 1)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Status Update Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Change the status of booking #{selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedBooking) {
                  updateBookingStatus(selectedBooking.id, newStatus);
                }
              }}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update booking details for #{selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Phone Number
                </label>
                <Input
                  value={editFormData.phone_no}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      phone_no: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Suburb</label>
                <Input
                  value={editFormData.suburb}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, suburb: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select
                value={editFormData.status}
                onValueChange={(value) =>
                  setEditFormData({ ...editFormData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Additional Message
              </label>
              <Textarea
                value={editFormData.additional_message}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    additional_message: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Remarks</label>
              <Textarea
                value={editFormData.remarks}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, remarks: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedBooking) {
                  updateBooking(selectedBooking.id, editFormData);
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete booking #{selectedBooking?.id}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedBooking) {
                  deleteBooking(selectedBooking.id);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
