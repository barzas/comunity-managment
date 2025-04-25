import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  History,
  Receipt,
} from "lucide-react";

interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "processing" | "failed";
  paymentMethod: string;
}

interface PaymentPortalProps {
  userType?: "resident" | "admin";
  bills?: Bill[];
  transactions?: Transaction[];
}

const PaymentPortal: React.FC<PaymentPortalProps> = ({
  userType = "resident",
  bills = [
    {
      id: "1",
      title: "Monthly Maintenance",
      amount: 150,
      dueDate: "2023-06-15",
      status: "pending",
    },
    {
      id: "2",
      title: "Water Bill",
      amount: 45.5,
      dueDate: "2023-06-10",
      status: "pending",
    },
    {
      id: "3",
      title: "Electricity Bill",
      amount: 78.25,
      dueDate: "2023-06-05",
      status: "overdue",
    },
    {
      id: "4",
      title: "Internet Service",
      amount: 59.99,
      dueDate: "2023-05-28",
      status: "paid",
    },
  ],
  transactions = [
    {
      id: "1",
      date: "2023-05-28",
      description: "Internet Service Payment",
      amount: 59.99,
      status: "completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      date: "2023-05-15",
      description: "Monthly Maintenance",
      amount: 150,
      status: "completed",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "3",
      date: "2023-05-10",
      description: "Water Bill",
      amount: 45.5,
      status: "completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "4",
      date: "2023-04-28",
      description: "Internet Service Payment",
      amount: 59.99,
      status: "completed",
      paymentMethod: "Credit Card",
    },
  ],
}) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterResident, setFilterResident] = useState<string>("");

  const handlePayBill = (bill: Bill) => {
    setSelectedBill(bill);
    setPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = () => {
    // In a real app, this would process the payment
    setPaymentDialogOpen(false);
    setReceiptDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
      case "processing":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filterDate && !transaction.date.includes(filterDate)) return false;
    if (userType === "admin" && filterResident) {
      // In a real app, this would filter by resident
      // This is just a placeholder
      return true;
    }
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-background">
      <h1 className="text-2xl font-bold mb-6">Payment Portal</h1>

      <Tabs defaultValue="bills" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="bills">Current Bills</TabsTrigger>
          <TabsTrigger value="payments">Make Payment</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        {/* Bills Tab */}
        <TabsContent value="bills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2" /> Current Bills
              </CardTitle>
              <CardDescription>
                View all your current bills and payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">
                        {bill.title}
                      </TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(bill.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(bill.status)}</TableCell>
                      <TableCell className="text-right">
                        {bill.status !== "paid" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePayBill(bill)}
                          >
                            Pay Now
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Make Payment Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2" /> Make a Payment
              </CardTitle>
              <CardDescription>Select a bill to pay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bill-select">Select Bill</Label>
                <Select>
                  <SelectTrigger id="bill-select">
                    <SelectValue placeholder="Select a bill to pay" />
                  </SelectTrigger>
                  <SelectContent>
                    {bills
                      .filter((bill) => bill.status !== "paid")
                      .map((bill) => (
                        <SelectItem key={bill.id} value={bill.id}>
                          {bill.title} - ${bill.amount.toFixed(2)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === "credit-card" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank-transfer" && (
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="Enter your account number"
                  />
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="space-y-2">
                  <Label htmlFor="paypal-email">PayPal Email</Label>
                  <Input
                    id="paypal-email"
                    type="email"
                    placeholder="your-email@example.com"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!paymentMethod}
                onClick={handlePaymentSubmit}
              >
                Pay Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Transaction History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="mr-2" /> Transaction History
              </CardTitle>
              <CardDescription>
                View your payment history and download receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userType === "admin" && (
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="filter-date">Filter by Date:</Label>
                    <Input
                      id="filter-date"
                      type="date"
                      className="w-auto"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="filter-resident">Filter by Resident:</Label>
                    <Select onValueChange={setFilterResident}>
                      <SelectTrigger id="filter-resident" className="w-[200px]">
                        <SelectValue placeholder="All residents" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All residents</SelectItem>
                        <SelectItem value="1">John Doe</SelectItem>
                        <SelectItem value="2">Jane Smith</SelectItem>
                        <SelectItem value="3">Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Filter className="mr-2 h-4 w-4" /> Apply Filters
                  </Button>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
                      </TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {transaction.status === "completed" && (
                          <Button variant="ghost" size="sm">
                            <Download className="mr-2 h-4 w-4" /> Receipt
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTransactions.length} transactions
                </p>
              </div>
              {userType === "admin" && (
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export Report
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Confirmation Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Please review your payment details before confirming.
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-medium">Bill:</p>
                <p>{selectedBill.title}</p>
                <p className="font-medium">Amount:</p>
                <p>${selectedBill.amount.toFixed(2)}</p>
                <p className="font-medium">Due Date:</p>
                <p>{new Date(selectedBill.dueDate).toLocaleDateString()}</p>
                <p className="font-medium">Payment Method:</p>
                <p>
                  {paymentMethod === "credit-card"
                    ? "Credit Card"
                    : paymentMethod === "bank-transfer"
                      ? "Bank Transfer"
                      : paymentMethod === "paypal"
                        ? "PayPal"
                        : "Not selected"}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePaymentSubmit}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" /> Payment
              Successful
            </DialogTitle>
            <DialogDescription>
              Your payment has been processed successfully.
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Payment Receipt</h3>
                  <Receipt className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Transaction ID:
                    </span>
                    <span>
                      TXN-
                      {Math.random()
                        .toString(36)
                        .substring(2, 10)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bill:</span>
                    <span>{selectedBill.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid:</span>
                    <span className="font-semibold">
                      ${selectedBill.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payment Method:
                    </span>
                    <span>
                      {paymentMethod === "credit-card"
                        ? "Credit Card"
                        : paymentMethod === "bank-transfer"
                          ? "Bank Transfer"
                          : paymentMethod === "paypal"
                            ? "PayPal"
                            : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-500 font-semibold">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
            <Button onClick={() => setReceiptDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentPortal;
