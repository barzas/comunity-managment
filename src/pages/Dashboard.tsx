import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Home,
  FileText,
  CreditCard,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NotificationCenter from "@/components/NotificationCenter";
import ServiceRequestSystem from "@/components/ServiceRequestSystem";
import PaymentPortal from "@/components/PaymentPortal";
import AdminPanel from "@/components/AdminPanel";

interface DashboardProps {
  userType?: "resident" | "admin";
  userName?: string;
}

const Dashboard = ({
  userType = "resident",
  userName = "John Doe",
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = userType === "admin";

  const navigationItems = [
    { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      id: "requests",
      label: "Service Requests",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    ...(isAdmin
      ? [
          {
            id: "admin",
            label: "Admin Panel",
            icon: <Settings className="h-5 w-5" />,
          },
        ]
      : []),
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="py-4">
                  <div className="flex items-center mb-6">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                        alt={userName}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="space-y-1">
                    {navigationItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleTabChange(item.id)}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">Community Portal</h1>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                alt={userName}
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

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation - Hidden on mobile */}
        <aside className="hidden md:block w-64 border-r p-4 bg-background">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                  alt={userName}
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
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleTabChange(item.id)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-auto">
          <Card className="bg-background">
            <CardContent className="p-6">
              {activeTab === "home" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Welcome, {userName}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Access all your community services from this dashboard.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {navigationItems
                      .filter((item) => item.id !== "home")
                      .map((item) => (
                        <Card
                          key={item.id}
                          className="cursor-pointer hover:bg-accent/50 transition-colors"
                          onClick={() => handleTabChange(item.id)}
                        >
                          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                              {item.icon}
                            </div>
                            <h3 className="font-medium">{item.label}</h3>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === "notifications" && <NotificationCenter />}
              {activeTab === "requests" && <ServiceRequestSystem />}
              {activeTab === "payments" && <PaymentPortal />}
              {activeTab === "admin" && isAdmin && <AdminPanel />}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
