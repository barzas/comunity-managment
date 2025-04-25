import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Calendar,
  CreditCard,
  Home,
  Settings,
  User,
  Users,
  BarChart2,
  Wrench,
  FileText,
} from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  userType?: "resident" | "admin";
  userName?: string;
}

const Dashboard = ({
  userType = "resident",
  userName = "John Doe",
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card p-4">
        <div className="flex items-center gap-2 mb-8">
          <Home className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Community Hub</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("overview")}
          >
            <Home className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
            <Badge className="ml-auto" variant="secondary">
              5
            </Badge>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("services")}
          >
            <Wrench className="mr-2 h-4 w-4" />
            Service Requests
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("payments")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </Button>

          {userType === "admin" && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setActiveTab("residents")}
              >
                <Users className="mr-2 h-4 w-4" />
                Residents
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setActiveTab("reports")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>

        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
              />
              <AvatarFallback>
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {userType}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="md:hidden flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Community Hub</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="md:hidden">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">
              {userType === "resident"
                ? "Resident Dashboard"
                : "Admin Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              {userType === "resident"
                ? "Welcome back! Here's what's happening in your community."
                : "Manage your community and monitor activities."}
            </p>
          </div>

          {/* Overview Content */}
          {activeTab === "overview" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {userType === "resident"
                      ? "Notifications"
                      : "Total Residents"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {userType === "resident" ? "5" : "124"}
                    </div>
                    {userType === "resident" ? (
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Users className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {userType === "resident"
                      ? "+2 new since yesterday"
                      : "+3 new this month"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {userType === "resident"
                      ? "Service Requests"
                      : "Open Service Requests"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {userType === "resident" ? "2" : "18"}
                    </div>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {userType === "resident"
                      ? "1 in progress"
                      : "5 high priority"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {userType === "resident"
                      ? "Next Payment"
                      : "Payment Collection"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                      {userType === "resident" ? "$150" : "78%"}
                    </div>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {userType === "resident" ? "Due in 5 days" : "Target: 85%"}
                  </p>
                  {userType === "admin" && (
                    <Progress value={78} className="mt-2" />
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    {userType === "resident"
                      ? "Your latest community updates and activities"
                      : "Latest community activities and updates"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userType === "resident" ? (
                      // Resident activity items
                      <>
                        <div className="flex items-start gap-4 border-b pb-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Bell className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Community Announcement
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Annual community meeting scheduled for next Friday
                              at 6 PM.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 border-b pb-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Wrench className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Service Request Updated
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Your plumbing request #1234 has been assigned to a
                              technician.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Yesterday
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Payment Reminder</p>
                            <p className="text-sm text-muted-foreground">
                              Your monthly maintenance fee of $150 is due in 5
                              days.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              2 days ago
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Admin activity items
                      <>
                        <div className="flex items-start gap-4 border-b pb-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">New Resident</p>
                            <p className="text-sm text-muted-foreground">
                              Sarah Johnson has been registered as a new
                              resident in Block C.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Today, 10:45 AM
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 border-b pb-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Wrench className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">High Priority Request</p>
                            <p className="text-sm text-muted-foreground">
                              Water leak reported in Building A, Apartment 302.
                              Requires immediate attention.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Today, 8:30 AM
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Payment Received</p>
                            <p className="text-sm text-muted-foreground">
                              15 residents have completed their monthly payments
                              today.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Yesterday
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Admin Stats */}
              {userType === "admin" && (
                <Card className="md:col-span-2 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Community Overview</CardTitle>
                    <CardDescription>
                      Key metrics and statistics for your community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Service Request Types
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Plumbing</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} />
                          <div className="flex justify-between text-sm">
                            <span>Electrical</span>
                            <span>28%</span>
                          </div>
                          <Progress value={28} />
                          <div className="flex justify-between text-sm">
                            <span>General Maintenance</span>
                            <span>30%</span>
                          </div>
                          <Progress value={30} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Resident Engagement
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>App Usage</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} />
                          <div className="flex justify-between text-sm">
                            <span>Event Participation</span>
                            <span>48%</span>
                          </div>
                          <Progress value={48} />
                          <div className="flex justify-between text-sm">
                            <span>Feedback Submission</span>
                            <span>37%</span>
                          </div>
                          <Progress value={37} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Upcoming Events</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm">Community Meeting</p>
                              <p className="text-xs text-muted-foreground">
                                Friday, 6:00 PM
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm">Maintenance Day</p>
                              <p className="text-xs text-muted-foreground">
                                Next Monday, All Day
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm">Garden Cleanup</p>
                              <p className="text-xs text-muted-foreground">
                                Next Saturday, 9:00 AM
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab === "notifications" && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <p className="text-muted-foreground">
                Notification center content will be displayed here.
              </p>
            </div>
          )}

          {activeTab === "services" && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Service Requests</h2>
              <p className="text-muted-foreground">
                Service request system content will be displayed here.
              </p>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Payment Portal</h2>
              <p className="text-muted-foreground">
                Payment portal content will be displayed here.
              </p>
            </div>
          )}

          {activeTab === "residents" && userType === "admin" && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Resident Management
              </h2>
              <p className="text-muted-foreground">
                Resident management content will be displayed here.
              </p>
            </div>
          )}

          {activeTab === "reports" && userType === "admin" && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Reports</h2>
              <p className="text-muted-foreground">
                Reports and analytics content will be displayed here.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-muted-foreground">
                Settings and preferences content will be displayed here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
