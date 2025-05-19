
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3, 
  Home,
  Menu,
  Bell,
  ChevronDown,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash,
  Download,
  Upload,
  Eye,
  CheckCircle,
  Truck,
  Package as PackageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import { useToast } from "@/hooks/use-toast";

// Order status types
type OrderStatus = 'Processing' | 'Printing' | 'Shipped' | 'Delivered';
type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

interface Order {
  id: string;
  customer: string;
  amount: string;
  items: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
}

// Mock data for orders
const INITIAL_ORDERS: Order[] = [
  {
    id: "#ORD-2305",
    customer: "Rahul Mehta",
    amount: "₹2,499",
    items: 3,
    status: "Delivered",
    paymentStatus: "Paid",
    date: "18 May 2023"
  },
  {
    id: "#ORD-2304",
    customer: "Sneha Jain",
    amount: "₹1,899",
    items: 2,
    status: "Shipped",
    paymentStatus: "Paid",
    date: "17 May 2023"
  },
  {
    id: "#ORD-2303",
    customer: "Kiran Reddy",
    amount: "₹3,750",
    items: 4,
    status: "Processing",
    paymentStatus: "Paid",
    date: "16 May 2023"
  },
  {
    id: "#ORD-2302",
    customer: "Anish Varma",
    amount: "₹899",
    items: 1,
    status: "Delivered",
    paymentStatus: "Paid",
    date: "15 May 2023"
  },
  {
    id: "#ORD-2301",
    customer: "Meera Nair",
    amount: "₹1,250",
    items: 2,
    status: "Printing",
    paymentStatus: "Pending",
    date: "15 May 2023"
  }
];

const AdminOrders = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();
  
  const toggleOrderSelection = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };
  
  // Apply filters to orders
  const filteredOrders = orders.filter(order => {
    // First apply search filter
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply status filter
    const matchesStatus = 
      filterStatus === "all" || 
      order.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleExportOrders = () => {
    toast({
      title: "Export started",
      description: "Your orders data export is being prepared",
    });
  };

  const handleUpdateOrderStatus = (id: string, newStatus: OrderStatus) => {
    // Update the order status in the state
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    toast({
      title: "Status updated",
      description: `Order ${id} status changed to ${newStatus}`,
    });
  };

  const handleDeleteOrders = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No orders selected",
        description: "Please select at least one order to delete",
      });
      return;
    }

    // Remove the selected orders from the state
    const updatedOrders = orders.filter(order => !selectedOrders.includes(order.id));
    setOrders(updatedOrders);
    
    toast({
      title: "Orders deleted",
      description: `Successfully deleted ${selectedOrders.length} orders`,
    });
    setSelectedOrders([]);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Printing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusClass = (status: string) => {
    switch(status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get next status options based on current status
  const getNextStatusOptions = (currentStatus: OrderStatus) => {
    switch(currentStatus) {
      case 'Processing':
        return ['Printing', 'Shipped', 'Delivered'];
      case 'Printing':
        return ['Shipped', 'Delivered'];
      case 'Shipped':
        return ['Delivered'];
      case 'Delivered':
        return [];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - reuse from Admin.tsx */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <Logo withText={false} />
            <span className="ml-3 text-xl font-semibold">AVIRVA Admin</span>
          </div>
        </div>

        <nav className="flex-grow p-4">
          <p className="text-xs text-gray-400 font-medium mb-3 uppercase">Dashboard</p>
          <Link to="/admin" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Overview
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Products</p>
          <Link to="/admin/products" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link to="/admin/categories" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Categories
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Orders</p>
          <Link to="/admin/orders" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white mb-1">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Customers</p>
          <Link to="/admin/customers" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Analytics</p>
          <Link to="/admin/analytics" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <BarChart3 className="h-5 w-5 mr-3" />
            Reports
          </Link>
          
          <div className="mt-6">
            <Link to="/admin/settings" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
          
          <div className="mt-auto pt-6">
            <Link to="/" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
              <Home className="h-5 w-5 mr-3" />
              Go to Website
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <AdminMobileNavigation isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Admin header */}
        <header className="bg-white shadow-sm border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden mr-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Orders</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="hidden md:block border-l border-gray-300 h-6 mx-2" />
              <div className="hidden md:flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/45.jpg" 
                  alt="Admin user" 
                  className="h-8 w-8 rounded-full mr-2" 
                />
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-1">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Logged out successfully",
                    description: "You have been logged out of the admin panel"
                  });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Orders content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Action bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                {/* Status filter dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter by Status
                      <Badge className="ml-1" variant="outline">
                        {filterStatus === 'all' ? 'All' : filterStatus}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("processing")}>
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("printing")}>
                      Printing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("shipped")}>
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("delivered")}>
                      Delivered
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleExportOrders}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-700 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      <Checkbox
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 font-medium">Order ID</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Payment</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.amount}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`inline-block px-2 py-0.5 text-xs rounded ${getStatusClass(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span 
                          className={`inline-block px-2 py-0.5 text-xs rounded ${getPaymentStatusClass(order.paymentStatus)}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">{order.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              toast({
                                title: "View order",
                                description: `Opening details for ${order.id}`
                              });
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {/* Status update dropdown menu */}
                          {getNextStatusOptions(order.status).length > 0 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                >
                                  {order.status === "Processing" && <PackageIcon className="h-4 w-4 text-purple-500" />}
                                  {order.status === "Printing" && <Truck className="h-4 w-4 text-blue-500" />}
                                  {order.status === "Shipped" && <CheckCircle className="h-4 w-4 text-green-500" />}
                                  {order.status === "Delivered" && <Edit className="h-4 w-4" />}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {getNextStatusOptions(order.status).map((status) => (
                                  <DropdownMenuItem 
                                    key={status}
                                    onClick={() => handleUpdateOrderStatus(order.id, status as OrderStatus)}
                                  >
                                    Update to {status}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500"
                            onClick={() => {
                              toggleOrderSelection(order.id);
                              handleDeleteOrders();
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No orders found. Try a different search term.
              </div>
            )}
            
            {/* Bulk actions */}
            {selectedOrders.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {selectedOrders.length} orders selected
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Print invoices",
                        description: `Preparing invoices for ${selectedOrders.length} orders`
                      });
                    }}
                  >
                    Print Invoices
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeleteOrders}
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
                <span className="font-medium">{orders.length}</span> orders
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;
