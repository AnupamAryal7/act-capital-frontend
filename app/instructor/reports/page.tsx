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
  TrendingUp,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  Play,
  Plus,
  Target,
  BarChart3,
} from "lucide-react";

interface ProgressReport {
  id: number;
  user_id: number;
  course_id: number;
  progress_percentage: number;
  status: string;
  feedback: string;
  remarks: string;
  created_at: string;
  updated_at: string | null;
}

interface CreateReportData {
  user_id: number;
  course_id: number;
  progress_percentage: number;
  status: string;
  feedback: string;
  remarks: string;
}

interface UpdateReportData {
  progress_percentage: number;
  feedback: string;
  remarks: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const STATUS_OPTIONS = [
  {
    value: "not_started",
    label: "Not Started",
    icon: Clock,
    color: "secondary",
  },
  { value: "in_progress", label: "In Progress", icon: Play, color: "default" },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle,
    color: "secondary",
  },
];

export default function ProgressReports() {
  const [reports, setReports] = useState<ProgressReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ProgressReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<ProgressReport | null>(
    null
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);

  const [createFormData, setCreateFormData] = useState<CreateReportData>({
    user_id: 0,
    course_id: 0,
    progress_percentage: 0,
    status: "not_started",
    feedback: "",
    remarks: "",
  });

  const [editFormData, setEditFormData] = useState<UpdateReportData>({
    progress_percentage: 0,
    feedback: "",
    remarks: "",
  });

  const [newProgressPercentage, setNewProgressPercentage] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/progress-reports/?skip=0&limit=500`
      );
      if (response.ok) {
        const data = await response.json();
        setReports(Array.isArray(data) ? data : []);
        setFilteredReports(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch reports");
        setReports([]);
        setFilteredReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
      setFilteredReports([]);
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (data: CreateReportData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/progress-reports/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201 || response.ok) {
        alert("Progress report created successfully!");
        fetchReports();
        setIsCreateDialogOpen(false);
        resetCreateForm();
      } else {
        alert("Failed to create progress report");
      }
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Error creating progress report");
    }
  };

  const updateReport = async (reportId: number, data: UpdateReportData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/progress-reports/${reportId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Progress report updated successfully!");
        fetchReports();
        setIsEditDialogOpen(false);
        setSelectedReport(null);
      } else {
        alert("Failed to update progress report");
      }
    } catch (error) {
      console.error("Error updating report:", error);
      alert("Error updating progress report");
    }
  };

  const updateProgressPercentage = async (
    reportId: number,
    percentage: number
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/progress-reports/${reportId}/progress?percentage=${percentage}`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        alert("Progress percentage updated successfully!");
        fetchReports();
        setIsProgressDialogOpen(false);
        setSelectedReport(null);
      } else {
        alert("Failed to update progress percentage");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Error updating progress percentage");
    }
  };

  const deleteReport = async (reportId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/progress-reports/${reportId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 204 || response.ok) {
        alert("Progress report deleted successfully!");
        fetchReports();
        setIsDeleteDialogOpen(false);
        setSelectedReport(null);
      } else {
        alert("Failed to delete progress report");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Error deleting progress report");
    }
  };

  useEffect(() => {
    let filtered = [...reports];

    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.user_id.toString().includes(query) ||
          report.course_id.toString().includes(query) ||
          report.id.toString().includes(query) ||
          report.feedback.toLowerCase().includes(query) ||
          report.remarks.toLowerCase().includes(query)
      );
    }

    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [statusFilter, searchQuery, reports]);

  useEffect(() => {
    fetchReports();
  }, []);

  const openCreateDialog = () => {
    resetCreateForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (report: ProgressReport) => {
    setSelectedReport(report);
    setEditFormData({
      progress_percentage: report.progress_percentage,
      feedback: report.feedback,
      remarks: report.remarks,
    });
    setIsEditDialogOpen(true);
  };

  const openProgressDialog = (report: ProgressReport) => {
    setSelectedReport(report);
    setNewProgressPercentage(report.progress_percentage);
    setIsProgressDialogOpen(true);
  };

  const openDeleteDialog = (report: ProgressReport) => {
    setSelectedReport(report);
    setIsDeleteDialogOpen(true);
  };

  const resetCreateForm = () => {
    setCreateFormData({
      user_id: 0,
      course_id: 0,
      progress_percentage: 0,
      status: "not_started",
      feedback: "",
      remarks: "",
    });
  };

  const getStatusInfo = (status: string) => {
    return (
      STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0]
    );
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return "bg-gray-300";
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const totalReports = reports.length;
  const notStarted = reports.filter((r) => r.status === "not_started").length;
  const inProgress = reports.filter((r) => r.status === "in_progress").length;
  const completed = reports.filter((r) => r.status === "completed").length;
  const avgProgress =
    reports.length > 0
      ? reports.reduce((sum, r) => sum + r.progress_percentage, 0) /
        reports.length
      : 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Progress Reports
              </h1>
              <p className="text-lg text-white/90">
                Track and manage student progress across all courses
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              onClick={openCreateDialog}
              className="hidden md:flex"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Report
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Button
              size="lg"
              onClick={openCreateDialog}
              className="w-full mb-6 md:hidden"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Report
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Reports</p>
                      <p className="text-2xl font-bold">{totalReports}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Not Started</p>
                      <p className="text-2xl font-bold">{notStarted}</p>
                    </div>
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold">{inProgress}</p>
                    </div>
                    <Play className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-2xl font-bold">{completed}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Progress</p>
                      <p className="text-2xl font-bold">
                        {avgProgress.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search by user ID, course ID, report ID, feedback..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

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
                    onClick={fetchReports}
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
                    Showing {filteredReports.length} of {totalReports} reports
                  </p>
                </div>
              </CardContent>
            </Card>

            <div>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin mr-2" />
                  <span>Loading reports...</span>
                </div>
              ) : currentReports.length === 0 ? (
                <Card>
                  <CardContent className="p-12">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        No reports found
                      </p>
                      <Button onClick={openCreateDialog}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {currentReports.map((report) => {
                      const statusInfo = getStatusInfo(report.status);
                      const StatusIcon = statusInfo.icon;
                      return (
                        <Card
                          key={report.id}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">
                                  Report #{report.id}
                                </CardTitle>
                                <p className="text-sm text-gray-600 mt-1">
                                  <User className="h-3 w-3 inline mr-1" />
                                  User: {report.user_id} |{" "}
                                  <BookOpen className="h-3 w-3 inline mr-1" />
                                  Course: {report.course_id}
                                </p>
                              </div>
                              <Badge variant={statusInfo.color as any}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Progress</span>
                                <span className="font-bold">
                                  {report.progress_percentage}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(
                                    report.progress_percentage
                                  )}`}
                                  style={{
                                    width: `${report.progress_percentage}%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            {report.feedback && (
                              <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-1">
                                  Feedback:
                                </p>
                                <p className="text-sm bg-gray-50 p-2 rounded line-clamp-2">
                                  {report.feedback}
                                </p>
                              </div>
                            )}

                            {report.remarks && (
                              <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-1">
                                  Remarks:
                                </p>
                                <p className="text-sm bg-gray-50 p-2 rounded line-clamp-2">
                                  {report.remarks}
                                </p>
                              </div>
                            )}

                            <p className="text-xs text-gray-500 mb-4">
                              Created:{" "}
                              {new Date(report.created_at).toLocaleDateString()}
                            </p>

                            <div className="grid grid-cols-3 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openProgressDialog(report)}
                                title="Update Progress"
                              >
                                <Target className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(report)}
                                title="Edit Report"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openDeleteDialog(report)}
                                title="Delete Report"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between">
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
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Progress Report</DialogTitle>
            <DialogDescription>
              Add a new progress report for a student
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  User ID *
                </label>
                <Input
                  type="number"
                  value={createFormData.user_id || ""}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      user_id: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter user ID"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Course ID *
                </label>
                <Input
                  type="number"
                  value={createFormData.course_id || ""}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      course_id: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter course ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Progress Percentage (0-100)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={createFormData.progress_percentage}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      progress_percentage: Math.min(
                        100,
                        Math.max(0, parseFloat(e.target.value) || 0)
                      ),
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select
                  value={createFormData.status}
                  onValueChange={(value) =>
                    setCreateFormData({ ...createFormData, status: value })
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
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Feedback</label>
              <Textarea
                value={createFormData.feedback}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    feedback: e.target.value,
                  })
                }
                rows={3}
                placeholder="Enter feedback for the student..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Remarks</label>
              <Textarea
                value={createFormData.remarks}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    remarks: e.target.value,
                  })
                }
                rows={3}
                placeholder="Enter any additional remarks..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => createReport(createFormData)}
              disabled={!createFormData.user_id || !createFormData.course_id}
            >
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Progress Report</DialogTitle>
            <DialogDescription>
              Update report details for #{selectedReport?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Progress Percentage (0-100)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={editFormData.progress_percentage}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    progress_percentage: Math.min(
                      100,
                      Math.max(0, parseFloat(e.target.value) || 0)
                    ),
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Feedback</label>
              <Textarea
                value={editFormData.feedback}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, feedback: e.target.value })
                }
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Remarks</label>
              <Textarea
                value={editFormData.remarks}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, remarks: e.target.value })
                }
                rows={4}
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
                if (selectedReport) {
                  updateReport(selectedReport.id, editFormData);
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isProgressDialogOpen}
        onOpenChange={setIsProgressDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Progress Percentage</DialogTitle>
            <DialogDescription>
              Quickly update progress for report #{selectedReport?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Progress: {newProgressPercentage}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={newProgressPercentage}
                onChange={(e) =>
                  setNewProgressPercentage(parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${getProgressColor(
                  newProgressPercentage
                )}`}
                style={{ width: `${newProgressPercentage}%` }}
              ></div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProgressDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedReport) {
                  updateProgressPercentage(
                    selectedReport.id,
                    newProgressPercentage
                  );
                }
              }}
            >
              Update Progress
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Progress Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete report #{selectedReport?.id}? This
              action cannot be undone.
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
                if (selectedReport) {
                  deleteReport(selectedReport.id);
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
