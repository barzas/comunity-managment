import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Filter, Download } from "lucide-react";

interface AdminPanelProps {
  activeTab?: string;
}

const AdminPanel = ({ activeTab = "residents" }: AdminPanelProps) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="w-full h-full bg-background p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your community resources and residents.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="residents">Residents</TabsTrigger>
            <TabsTrigger value="service-requests">Service Requests</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          {/* Residents Tab */}
          <TabsContent value="residents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resident Management</CardTitle>
                <CardDescription>
                  View and manage all residents in your community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search residents..." className="pl-8" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Residents</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => setShowAddDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Resident
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          name: "John Doe",
                          unit: "A-101",
                          contact: "john.doe@example.com",
                          status: "active",
                        },
                        {
                          id: 2,
                          name: "Jane Smith",
                          unit: "B-205",
                          contact: "jane.smith@example.com",
                          status: "active",
                        },
                        {
                          id: 3,
                          name: "Robert Johnson",
                          unit: "C-310",
                          contact: "robert.j@example.com",
                          status: "inactive",
                        },
                        {
                          id: 4,
                          name: "Emily Davis",
                          unit: "A-202",
                          contact: "emily.d@example.com",
                          status: "active",
                        },
                        {
                          id: 5,
                          name: "Michael Wilson",
                          unit: "D-405",
                          contact: "michael.w@example.com",
                          status: "active",
                        },
                      ].map((resident) => (
                        <TableRow key={resident.id}>
                          <TableCell className="font-medium">
                            {resident.name}
                          </TableCell>
                          <TableCell>{resident.unit}</TableCell>
                          <TableCell>{resident.contact}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                resident.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {resident.status === "active"
                                ? "Active"
                                : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Requests Tab */}
          <TabsContent value="service-requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Request Management</CardTitle>
                <CardDescription>
                  Track and manage all service requests from residents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search requests..." className="pl-8" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Requests</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Resident</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "SR-1001",
                          resident: "John Doe",
                          category: "Plumbing",
                          submitted: "2023-06-15",
                          status: "open",
                        },
                        {
                          id: "SR-1002",
                          resident: "Jane Smith",
                          category: "Electrical",
                          submitted: "2023-06-14",
                          status: "in-progress",
                        },
                        {
                          id: "SR-1003",
                          resident: "Robert Johnson",
                          category: "HVAC",
                          submitted: "2023-06-12",
                          status: "completed",
                        },
                        {
                          id: "SR-1004",
                          resident: "Emily Davis",
                          category: "Landscaping",
                          submitted: "2023-06-10",
                          status: "open",
                        },
                        {
                          id: "SR-1005",
                          resident: "Michael Wilson",
                          category: "Security",
                          submitted: "2023-06-08",
                          status: "in-progress",
                        },
                      ].map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {request.id}
                          </TableCell>
                          <TableCell>{request.resident}</TableCell>
                          <TableCell>{request.category}</TableCell>
                          <TableCell>{request.submitted}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.status === "completed"
                                  ? "secondary"
                                  : request.status === "in-progress"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {request.status === "in-progress"
                                ? "In Progress"
                                : request.status === "completed"
                                  ? "Completed"
                                  : "Open"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>
                  Track and manage all community payments and transactions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search payments..." className="pl-8" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Payments</SelectItem>
                        <SelectItem value="dues">Monthly Dues</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="special">
                          Special Assessment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Payment
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Resident</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "TRX-5001",
                          resident: "John Doe",
                          type: "Monthly Dues",
                          amount: "$150.00",
                          date: "2023-06-01",
                          status: "completed",
                        },
                        {
                          id: "TRX-5002",
                          resident: "Jane Smith",
                          type: "Utilities",
                          amount: "$85.50",
                          date: "2023-06-02",
                          status: "completed",
                        },
                        {
                          id: "TRX-5003",
                          resident: "Robert Johnson",
                          type: "Special Assessment",
                          amount: "$250.00",
                          date: "2023-06-05",
                          status: "pending",
                        },
                        {
                          id: "TRX-5004",
                          resident: "Emily Davis",
                          type: "Monthly Dues",
                          amount: "$150.00",
                          date: "2023-06-01",
                          status: "completed",
                        },
                        {
                          id: "TRX-5005",
                          resident: "Michael Wilson",
                          type: "Utilities",
                          amount: "$92.75",
                          date: "2023-06-03",
                          status: "failed",
                        },
                      ].map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">
                            {payment.id}
                          </TableCell>
                          <TableCell>{payment.resident}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment.status === "completed"
                                  ? "default"
                                  : payment.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {payment.status === "completed"
                                ? "Completed"
                                : payment.status === "pending"
                                  ? "Pending"
                                  : "Failed"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Announcement Management</CardTitle>
                <CardDescription>
                  Create and manage community announcements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search announcements..."
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Announcement
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          title: "Community Pool Maintenance",
                          created: "2023-06-10",
                          published: "2023-06-12",
                          priority: "high",
                          status: "published",
                        },
                        {
                          id: 2,
                          title: "Monthly Community Meeting",
                          created: "2023-06-08",
                          published: "2023-06-09",
                          priority: "medium",
                          status: "published",
                        },
                        {
                          id: 3,
                          title: "New Recycling Guidelines",
                          created: "2023-06-05",
                          published: null,
                          priority: "medium",
                          status: "draft",
                        },
                        {
                          id: 4,
                          title: "Summer BBQ Event",
                          created: "2023-06-01",
                          published: "2023-06-02",
                          priority: "low",
                          status: "published",
                        },
                        {
                          id: 5,
                          title: "Parking Lot Repaving",
                          created: "2023-05-28",
                          published: null,
                          priority: "high",
                          status: "scheduled",
                        },
                      ].map((announcement) => (
                        <TableRow key={announcement.id}>
                          <TableCell className="font-medium">
                            {announcement.title}
                          </TableCell>
                          <TableCell>{announcement.created}</TableCell>
                          <TableCell>{announcement.published || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                announcement.priority === "high"
                                  ? "destructive"
                                  : announcement.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {announcement.priority === "high"
                                ? "High"
                                : announcement.priority === "medium"
                                  ? "Medium"
                                  : "Low"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                announcement.status === "published"
                                  ? "default"
                                  : announcement.status === "draft"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {announcement.status === "published"
                                ? "Published"
                                : announcement.status === "draft"
                                  ? "Draft"
                                  : "Scheduled"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Resident Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Resident</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new resident to the community.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Full Name
              </label>
              <Input id="name" className="col-span-3" placeholder="John Doe" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="unit" className="text-right">
                Unit Number
              </label>
              <Input id="unit" className="col-span-3" placeholder="A-101" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Phone
              </label>
              <Input
                id="phone"
                className="col-span-3"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select defaultValue="active">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddDialog(false)}>
              Add Resident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
