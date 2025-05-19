
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
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import { useToast } from "@/hooks/use-toast";

// Mock data for customers
const CUSTOMERS = [
  {
    id: "1",
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+91 98765 43210",
    orders: 8,
    totalSpent: "₹12,450",
    lastOrder: "18 May 2023",
    status: "Active",
    joinDate: "10 Jan 2023"
  },
  {
    id: "2",
    name: "Sneha Jain",
    email: "sneha.jain@example.com",
    phone: "+91 87654 32109",
    orders: 5,
    totalSpent: "₹8,750",
    lastOrder: "22 Apr 2023",
    status: "Active",
    joinDate: "15 Feb 2023"
  },
  {
    id: "3",
    name: "Kiran Reddy",
    email: "kiran.r@example.com",
    phone: "+91 76543 21098",
    orders: 12,
    totalSpent: "₹24,800",
    lastOrder: "30 Apr 2023",
    status: "Active",
    joinDate: "05 Dec 2022"
  },
  {
    id: "4",
    name: "Anish Varma",
    email: "anish.v@example.com",
    phone: "+91 65432 10987",
    orders: 3,
    totalSpent: "₹4,250",
    lastOrder: "10 Mar 2023",
    status: "Inactive",
    joinDate: "22 Feb 2023"
  },
  {
    id: "5",
    name: "Meera Nair",
    email: "meera.n@example.com",
    phone: "+91 54321 09876",
    orders: 7,
    totalSpent: "₹11,300",
    lastOrder: "05 May 2023",
    status: "Active",
    joinDate: "18 Jan 2023"
  }
];

const AdminCustomers = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const { toast } = useToast();
  
  const toggleCustomerSelection = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedCustomers.length === CUSTOMERS.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(CUSTOMERS.map(customer => customer.id));
    }
  };
  
  const filteredCustomers = CUSTOMERS.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendEmail = () => {
    if (selectedCustomers.length === 0) {
      toast({
        title: "No customers selected",
        description: "Please select at least one customer to send an email",
      });
      return;
    }

    toast({
      title: "Email campaign started",
      description: `Preparing to send emails to ${selectedCustomers.length} customers`,
    });
  };

  const handleExportCustomers = () => {
    toast({
      title: "Export started",
      description: "Your customer data export is being prepared",
    });
  };

  const handleCustomerStatusChange = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    toast({
      title: "Status updated",
      description: `Customer status changed to ${newStatus}`,
    });
  };

  const handleDeleteCustomers = () => {
    if (selectedCustomers.length === 0) {
      toast({
        title: "No customers selected",
        description: "Please select at least one customer to delete",
      });
      return;
    }

    toast({
      title: "Customers deleted",
      description: `Successfully deleted ${selectedCustomers.length} customers`,
    });
    setSelectedCustomers([]);
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
          <Link to="/admin/orders" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Customers</p>
          <Link to="/admin/customers" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white mb-1">
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
              <h1 className="text-xl font-semibold text-gray-800">Customers</h1>
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

        {/* Customers content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Action bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    toast({
                      title: "Filter applied",
                      description: "Showing filtered customer results"
                    });
                  }}
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleExportCustomers}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button 
                  className="flex items-center gap-2 bg-teal hover:bg-teal-600"
                  onClick={() => {
                    toast({
                      title: "Add customer",
                      description: "Opening customer creation form"
                    });
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Customer
                </Button>
              </div>
            </div>
          </div>

          {/* Customers table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-700 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      <Checkbox
                        checked={selectedCustomers.length === CUSTOMERS.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Orders</th>
                    <th className="px-4 py-3 font-medium">Total Spent</th>
                    <th className="px-4 py-3 font-medium">Last Order</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b">
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={() => toggleCustomerSelection(customer.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{customer.name}</span>
                          <span className="text-xs text-gray-500">{customer.email}</span>
                          <span className="text-xs text-gray-500">{customer.phone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{customer.orders}</td>
                      <td className="px-4 py-3">{customer.totalSpent}</td>
                      <td className="px-4 py-3">{customer.lastOrder}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`inline-block px-2 py-0.5 text-xs rounded ${
                            customer.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              toast({
                                title: "Edit customer",
                                description: `Opening details for ${customer.name}`
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleCustomerStatusChange(customer.id, customer.status)}
                          >
                            <Mail className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500"
                            onClick={() => {
                              toggleCustomerSelection(customer.id);
                              handleDeleteCustomers();
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
            
            {filteredCustomers.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No customers found. Try a different search term.
              </div>
            )}
            
            {/* Bulk actions */}
            {selectedCustomers.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {selectedCustomers.length} customers selected
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSendEmail}
                  >
                    Send Email
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeleteCustomers}
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredCustomers.length}</span> of{" "}
                <span className="font-medium">{CUSTOMERS.length}</span> customers
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  onClick={() => {
                    toast({
                      title: "Previous page",
                      description: "Loading previous page of customers"
                    });
                  }}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  onClick={() => {
                    toast({
                      title: "Next page",
                      description: "Loading next page of customers"
                    });
                  }}
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

export default AdminCustomers;
