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
  Bell,
  FileText,
  CreditCard,
  Settings,
  Users,
  MessageSquare,
  Calendar,
} from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import ServiceRequestSystem from "./ServiceRequestSystem";
import PaymentPortal from "./PaymentPortal";
import AdminPanel from "./AdminPanel";

interface DashboardContentProps {
  userRole?: "resident" | "admin";
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const DashboardContent = ({
  userRole = "resident",
  activeTab = "notifications",
  onTabChange = () => {},
}: DashboardContentProps) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    onTabChange(value);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {userRole === "admin"
            ? "Manage your community"
            : "Welcome to your community portal"}
        </p>
      </div>

      <Tabs
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto mb-6">
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger
            value="service-requests"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Service Requests</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Payments</span>
          </TabsTrigger>
          {userRole === "admin" && (
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Admin</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationCenter />
        </TabsContent>

        <TabsContent value="service-requests" className="space-y-4">
          <ServiceRequestSystem userRole={userRole} />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PaymentPortal />
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="admin" className="space-y-4">
            <AdminPanel />
          </TabsContent>
        )}
      </Tabs>

      {/* Dashboard Summary Cards - Only visible on larger screens */}
      {selectedTab === "notifications" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 hidden md:grid">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unread Notifications
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Community Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Upcoming this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Community Discussions
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Active threads</p>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === "service-requests" && userRole === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 hidden md:grid">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Requests
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +5 since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">
                -3 since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Today
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                +2 since yesterday
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 hidden md:grid">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Residents
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +3 since last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Service Requests
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                +8 since last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Due this month</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
