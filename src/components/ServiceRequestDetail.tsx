import React, { useState } from "react";
import { format } from "date-fns";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Paperclip,
  Send,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: "resident" | "admin" | "technician";
  };
  content: string;
  timestamp: Date;
  isInternal?: boolean;
}

interface StatusUpdate {
  id: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  timestamp: Date;
  updatedBy: string;
  note?: string;
}

interface ServiceRequestDetailProps {
  requestId?: string;
  title?: string;
  description?: string;
  category?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  status?: "pending" | "in-progress" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
  assignedTo?: string;
  location?: string;
  comments?: Comment[];
  statusHistory?: StatusUpdate[];
  isAdmin?: boolean;
}

const ServiceRequestDetail: React.FC<ServiceRequestDetailProps> = ({
  requestId = "SR-2023-0042",
  title = "Water Leak in Kitchen Sink",
  description = "There is a slow but constant leak under the kitchen sink. The cabinet below is getting water damage.",
  category = "Plumbing",
  priority = "medium",
  status = "in-progress",
  createdAt = new Date(2023, 5, 15, 9, 30),
  updatedAt = new Date(2023, 5, 16, 14, 45),
  assignedTo = "John Plumber",
  location = "Apartment 304",
  isAdmin = false,
  comments = [
    {
      id: "1",
      author: {
        name: "Jane Resident",
        role: "resident",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      content:
        "The leak seems to be getting worse. Please send someone as soon as possible.",
      timestamp: new Date(2023, 5, 15, 14, 30),
    },
    {
      id: "2",
      author: {
        name: "Admin User",
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      },
      content:
        "We have assigned John from maintenance to look at this tomorrow morning.",
      timestamp: new Date(2023, 5, 15, 16, 45),
    },
    {
      id: "3",
      author: {
        name: "John Plumber",
        role: "technician",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      content:
        "I checked the sink and identified a loose connection. I've tightened it and replaced the worn gasket. Please monitor for any further leaks.",
      timestamp: new Date(2023, 5, 16, 11, 20),
    },
    {
      id: "4",
      author: {
        name: "Admin User",
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      },
      content: "This will require a follow-up visit to check for water damage.",
      timestamp: new Date(2023, 5, 16, 13, 15),
      isInternal: true,
    },
  ],
  statusHistory = [
    {
      id: "1",
      status: "pending",
      timestamp: new Date(2023, 5, 15, 9, 30),
      updatedBy: "System",
    },
    {
      id: "2",
      status: "in-progress",
      timestamp: new Date(2023, 5, 15, 16, 45),
      updatedBy: "Admin User",
      note: "Assigned to maintenance team",
    },
  ],
}) => {
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200"
          >
            High
          </Badge>
        );
      case "urgent":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Urgent
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // In a real app, this would send the comment to an API
      console.log("Submitting comment:", newComment);
      setNewComment("");
    }
  };

  const handleUpdateStatus = (newStatus: string) => {
    // In a real app, this would update the status via an API
    console.log("Updating status to:", newStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <span>Request ID: {requestId}</span>
                <span>•</span>
                <span>Created: {format(createdAt, "MMM d, yyyy")}</span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getPriorityBadge(priority)}
              {getStatusBadge(status)}
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus("in-progress")}
                    >
                      Mark In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus("completed")}
                    >
                      Mark Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus("cancelled")}
                    >
                      Cancel Request
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mx-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-sm text-gray-900">{description}</p>

                <h3 className="text-sm font-medium text-gray-500 mt-4">
                  Location
                </h3>
                <p className="mt-1 text-sm text-gray-900">{location}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1 text-sm text-gray-900">{category}</p>

                <h3 className="text-sm font-medium text-gray-500 mt-4">
                  Assigned To
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {assignedTo || "Not assigned"}
                </p>

                <h3 className="text-sm font-medium text-gray-500 mt-4">
                  Last Updated
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {format(updatedAt, "MMM d, yyyy h:mm a")}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="p-6 pt-4">
            <div className="space-y-4">
              {comments
                .filter((comment) => !comment.isInternal || isAdmin)
                .map((comment) => (
                  <div
                    key={comment.id}
                    className={`flex gap-3 ${comment.isInternal ? "bg-amber-50 p-3 rounded-md" : ""}`}
                  >
                    <Avatar>
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {format(comment.timestamp, "MMM d, yyyy h:mm a")}
                          </span>
                        </div>
                        {comment.isInternal && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-amber-100 text-amber-800 border-amber-200"
                          >
                            Internal Note
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}

              <Separator className="my-4" />

              <div>
                <h3 className="text-sm font-medium mb-2">Add Comment</h3>
                <div className="flex flex-col gap-2">
                  <Textarea
                    placeholder="Type your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    {isAdmin && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Paperclip className="h-4 w-4" />
                        Attach File
                      </Button>
                    )}
                    <div className="flex gap-2 ml-auto">
                      {isAdmin && (
                        <Button variant="outline" size="sm">
                          Mark as Internal
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={handleSubmitComment}
                        className="gap-1"
                      >
                        <Send className="h-4 w-4" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="p-6 pt-4">
            <div className="space-y-4">
              {statusHistory.map((update) => (
                <div key={update.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {update.status === "pending" && (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                    {update.status === "in-progress" && (
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    )}
                    {update.status === "completed" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {update.status === "cancelled" && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      Status changed to {update.status.replace("-", " ")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(update.timestamp, "MMM d, yyyy h:mm a")} by{" "}
                      {update.updatedBy}
                    </div>
                    {update.note && (
                      <div className="text-sm mt-1">{update.note}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline">Back to Requests</Button>
          {status !== "completed" && status !== "cancelled" && (
            <div className="flex gap-2">
              {isAdmin ? (
                <Button variant="default">Update Status</Button>
              ) : (
                <Button variant="default">Add Comment</Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServiceRequestDetail;
