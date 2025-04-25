import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Upload,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  authorAvatar?: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  avatar?: string;
}

const ServiceRequestSystem = ({ isAdmin = false }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [newRequestDialogOpen, setNewRequestDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null,
  );
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Mock data
  const mockRequests: ServiceRequest[] = [
    {
      id: "1",
      title: "Leaking Faucet in Kitchen",
      description:
        "The kitchen sink faucet has been leaking for two days. Water is pooling under the sink.",
      status: "pending",
      priority: "medium",
      category: "Plumbing",
      createdAt: "2023-06-15T10:30:00Z",
      updatedAt: "2023-06-15T10:30:00Z",
      comments: [],
    },
    {
      id: "2",
      title: "AC Not Cooling",
      description:
        "The air conditioner in the living room is running but not cooling the room.",
      status: "in-progress",
      priority: "high",
      category: "HVAC",
      createdAt: "2023-06-14T08:15:00Z",
      updatedAt: "2023-06-16T14:20:00Z",
      assignedTo: "Cool Air Services",
      comments: [
        {
          id: "c1",
          author: "John Technician",
          content: "Scheduled for inspection tomorrow at 10 AM.",
          timestamp: "2023-06-16T14:20:00Z",
          authorAvatar: "JT",
        },
      ],
    },
    {
      id: "3",
      title: "Broken Light Fixture",
      description:
        "The ceiling light in the hallway is not working even after changing the bulb.",
      status: "completed",
      priority: "low",
      category: "Electrical",
      createdAt: "2023-06-10T16:45:00Z",
      updatedAt: "2023-06-12T11:30:00Z",
      assignedTo: "Quick Electric",
      comments: [
        {
          id: "c2",
          author: "Sarah Electrician",
          content: "Fixed the wiring issue in the fixture. All working now.",
          timestamp: "2023-06-12T11:30:00Z",
          authorAvatar: "SE",
        },
      ],
    },
    {
      id: "4",
      title: "Clogged Drain in Bathroom",
      description: "The bathroom sink is draining very slowly.",
      status: "cancelled",
      priority: "medium",
      category: "Plumbing",
      createdAt: "2023-06-08T09:20:00Z",
      updatedAt: "2023-06-09T13:15:00Z",
      comments: [
        {
          id: "c3",
          author: "Resident",
          content:
            "I was able to fix this myself with a plunger. Please cancel the request.",
          timestamp: "2023-06-09T13:15:00Z",
          authorAvatar: "R",
        },
      ],
    },
  ];

  const serviceProviders: ServiceProvider[] = [
    { id: "sp1", name: "Quick Plumbing", category: "Plumbing", avatar: "QP" },
    { id: "sp2", name: "Cool Air Services", category: "HVAC", avatar: "CA" },
    { id: "sp3", name: "Quick Electric", category: "Electrical", avatar: "QE" },
    {
      id: "sp4",
      name: "Green Landscaping",
      category: "Landscaping",
      avatar: "GL",
    },
    {
      id: "sp5",
      name: "Security Systems Inc",
      category: "Security",
      avatar: "SS",
    },
    { id: "sp6", name: "Clean Pool Services", category: "Pool", avatar: "CP" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            <Clock className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            <XCircle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">High</Badge>
        );
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleViewDetails = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setDetailsDialogOpen(true);
  };

  const filteredRequests = mockRequests.filter((request) => {
    if (activeTab === "all") return true;
    return request.status === activeTab;
  });

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
          <p className="text-gray-500">Submit and track maintenance requests</p>
        </div>
        {!isAdmin && (
          <Button onClick={() => setNewRequestDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Request
          </Button>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <ScrollArea className="h-[calc(100vh-300px)] pr-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {request.title}
                        </CardTitle>
                        {getStatusBadge(request.status)}
                      </div>
                      <CardDescription className="flex items-center justify-between mt-1">
                        <span>ID: {request.id}</span>
                        <span>{formatDate(request.createdAt)}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between mb-2">
                        <Badge variant="outline">{request.category}</Badge>
                        {getPriorityBadge(request.priority)}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {request.description}
                      </p>
                      {request.assignedTo && (
                        <div className="mt-2 flex items-center">
                          <span className="text-xs text-gray-500 mr-1">
                            Assigned to:
                          </span>
                          <span className="text-xs font-medium">
                            {request.assignedTo}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {request.comments.length} comments
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No requests found</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-md">
                    {activeTab === "all"
                      ? "You haven't submitted any service requests yet."
                      : `You don't have any ${activeTab} requests.`}
                  </p>
                  {!isAdmin && (
                    <Button
                      className="mt-4"
                      onClick={() => setNewRequestDialogOpen(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create New Request
                    </Button>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* New Request Dialog */}
      <Dialog
        open={newRequestDialogOpen}
        onOpenChange={setNewRequestDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Service Request</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit a new service request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" placeholder="Brief description of the issue" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="landscaping">Landscaping</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="pool">Pool</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="provider" className="text-sm font-medium">
                Service Provider
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service provider" />
                </SelectTrigger>
                <SelectContent>
                  {serviceProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name} ({provider.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Detailed description of the issue"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="h-6 w-6 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop files here or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Supports images and PDF files up to 5MB
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Files
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewRequestDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedRequest.title}</span>
                {getStatusBadge(selectedRequest.status)}
              </DialogTitle>
              <DialogDescription className="flex justify-between">
                <span>Request ID: {selectedRequest.id}</span>
                <span>Created: {formatDate(selectedRequest.createdAt)}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <Badge variant="outline">{selectedRequest.category}</Badge>
                {getPriorityBadge(selectedRequest.priority)}
              </div>

              <div className="grid gap-2">
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
                  {selectedRequest.description}
                </p>
              </div>

              {selectedRequest.assignedTo && (
                <div className="grid gap-2">
                  <h4 className="text-sm font-medium">Assigned To</h4>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>
                        {selectedRequest.assignedTo.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedRequest.assignedTo}</span>
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <h4 className="text-sm font-medium">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="mr-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                        <Calendar className="h-4 w-4 text-blue-700" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Request Created</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                    </div>
                  </div>
                  {selectedRequest.updatedAt !== selectedRequest.createdAt && (
                    <div className="flex">
                      <div className="mr-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                          <Clock className="h-4 w-4 text-blue-700" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(selectedRequest.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <h4 className="text-sm font-medium">
                  Comments ({selectedRequest.comments.length})
                </h4>
                {selectedRequest.comments.length > 0 ? (
                  <div className="space-y-3 max-h-40 overflow-y-auto p-2">
                    {selectedRequest.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {comment.authorAvatar ||
                              comment.author.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              {comment.author}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(comment.timestamp)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No comments yet
                  </p>
                )}
                <Separator className="my-2" />
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Add a comment..."
                    className="min-h-[60px]"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              {isAdmin && (
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Assign Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceProviders.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setDetailsDialogOpen(false)}
                >
                  Close
                </Button>
                <Button>Add Comment</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ServiceRequestSystem;
