import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  Megaphone,
  Filter,
  Search,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: "low" | "medium" | "high";
  isRead: boolean;
  sender?: {
    name: string;
    avatar?: string;
    department?: string;
  };
  type: "alert" | "announcement";
}

interface NotificationCenterProps {
  isAdmin?: boolean;
  notifications?: NotificationProps[];
  onMarkAsRead?: (id: string) => void;
  onCreateAnnouncement?: (
    announcement: Omit<NotificationProps, "id" | "timestamp" | "isRead">,
  ) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isAdmin = false,
  notifications = defaultNotifications,
  onMarkAsRead = () => {},
  onCreateAnnouncement = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredNotifications = notifications.filter((notification) => {
    // Filter by tab
    if (activeTab === "alerts" && notification.type !== "alert") return false;
    if (activeTab === "announcements" && notification.type !== "announcement")
      return false;
    if (activeTab === "unread" && notification.isRead) return false;

    // Filter by search query
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleMarkAsRead = (id: string) => {
    onMarkAsRead(id);
  };

  const handleSendMessage = () => {
    // Here you would typically send the message to a backend
    // For now, we'll just clear the input
    setMessage("");
    setShowMessageInput(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "announcement":
        return <Megaphone className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Center</CardTitle>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button variant="outline" className="gap-1">
                <Megaphone className="h-4 w-4" />
                Create Announcement
              </Button>
            )}
            <Button
              variant="outline"
              className="gap-1"
              onClick={() => setShowMessageInput(!showMessageInput)}
            >
              <Send className="h-4 w-4" />
              {showMessageInput ? "Cancel Message" : "New Message"}
            </Button>
          </div>
        </div>
        <CardDescription>
          View and manage your community notifications
        </CardDescription>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts
              <Badge variant="outline" className="ml-2">
                {notifications.filter((n) => n.type === "alert").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="announcements">
              Announcements
              <Badge variant="outline" className="ml-2">
                {notifications.filter((n) => n.type === "announcement").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="outline" className="ml-2">
                {notifications.filter((n) => !n.isRead).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[500px] pr-4">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${notification.isRead ? "bg-white" : "bg-muted/20"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0">
                            {notification.sender?.avatar ? (
                              <Avatar>
                                <AvatarImage
                                  src={notification.sender.avatar}
                                  alt={notification.sender.name}
                                />
                                <AvatarFallback>
                                  {notification.sender.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                {getTypeIcon(notification.type)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {notification.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {notification.sender?.name}
                              {notification.sender?.department &&
                                ` • ${notification.sender.department}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={getPriorityColor(notification.priority)}
                          >
                            {notification.priority}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{notification.message}</p>
                      <div className="flex justify-end">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    No notifications found
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery
                      ? "Try adjusting your search or filters"
                      : "You're all caught up!"}
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>

      {showMessageInput && (
        <CardFooter className="border-t pt-4">
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">New Message</div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

// Default mock data
const defaultNotifications: NotificationProps[] = [
  {
    id: "1",
    title: "Water Outage Scheduled",
    message:
      "There will be a scheduled water outage on Friday from 10am to 2pm for maintenance work.",
    timestamp: "2 hours ago",
    priority: "high",
    isRead: false,
    sender: {
      name: "Maintenance Department",
      department: "Utilities",
    },
    type: "alert",
  },
  {
    id: "2",
    title: "Community Picnic This Weekend",
    message:
      "Join us for the annual community picnic this Saturday at the central park. Food and drinks will be provided.",
    timestamp: "1 day ago",
    priority: "medium",
    isRead: true,
    sender: {
      name: "Events Committee",
      department: "Community Affairs",
    },
    type: "announcement",
  },
  {
    id: "3",
    title: "New Recycling Guidelines",
    message:
      "Please review the updated recycling guidelines. Changes will take effect starting next month.",
    timestamp: "3 days ago",
    priority: "low",
    isRead: false,
    sender: {
      name: "Environmental Services",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=env123",
    },
    type: "announcement",
  },
  {
    id: "4",
    title: "Security Alert: Suspicious Activity",
    message:
      "There have been reports of suspicious individuals in the north parking area. Please ensure your vehicles are locked.",
    timestamp: "12 hours ago",
    priority: "high",
    isRead: false,
    sender: {
      name: "Security Team",
      department: "Community Safety",
    },
    type: "alert",
  },
  {
    id: "5",
    title: "Pool Maintenance Complete",
    message:
      "The community pool maintenance is now complete. The pool is open for regular hours starting tomorrow.",
    timestamp: "4 days ago",
    priority: "medium",
    isRead: true,
    sender: {
      name: "Facilities Management",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fac456",
    },
    type: "announcement",
  },
];

export default NotificationCenter;
