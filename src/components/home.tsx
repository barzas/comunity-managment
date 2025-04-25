import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"resident" | "admin">("resident");
  const navigate = useNavigate();

  // Mock login function
  const handleLogin = (e: React.FormEvent, type: "resident" | "admin") => {
    e.preventDefault();
    setIsAuthenticated(true);
    setUserType(type);
  };

  // Mock signup function
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle user registration
    setIsAuthenticated(true);
    setUserType("resident");
  };

  // Mock logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Dashboard userType={userType} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Community Management System
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your community services in one place
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tabs defaultValue="resident" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="resident">Resident</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid gap-4 w-full">
                  <Button
                    className="w-full"
                    onClick={(e) => handleLogin(e, "resident")}
                  >
                    Login as Resident
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={(e) => handleLogin(e, "admin")}
                  >
                    Login as Admin
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your information to create a resident account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup}>
                  <div className="grid gap-4">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback className="bg-primary/10">
                          <UserIcon className="h-12 w-12 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-signup"
                          placeholder="name@example.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-signup"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="unit">Unit/Apartment Number</Label>
                      <Input id="unit" placeholder="A-101" />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2023 Community Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
