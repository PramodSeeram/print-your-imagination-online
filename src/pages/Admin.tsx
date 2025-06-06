
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  LayoutGrid,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  Home,
  Bell,
  Menu,
  ChevronDown,
  PlusCircle,
  Calendar,
  Percent,
  Upload,
  Download,
  MessageSquare
} from 'lucide-react';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import AdminStatCard from '@/components/AdminStatCard';
import RecentOrdersTable from '@/components/RecentOrdersTable';
import TopSellingProducts from '@/components/TopSellingProducts';

// Mock data for recent orders
const RECENT_ORDERS = [
  {
    id: "#ORD-2305",
    customer: "Rahul Mehta",
    amount: "₹2,499",
    status: "Delivered" as const,
    date: "18 May 2023"
  },
  {
    id: "#ORD-2304",
    customer: "Sneha Jain",
    amount: "₹1,899",
    status: "Shipped" as const,
    date: "17 May 2023"
  },
  {
    id: "#ORD-2303",
    customer: "Kiran Reddy",
    amount: "₹3,750",
    status: "Processing" as const,
    date: "16 May 2023"
  },
  {
    id: "#ORD-2302",
    customer: "Anish Varma",
    amount: "₹899",
    status: "Delivered" as const,
    date: "15 May 2023"
  },
  {
    id: "#ORD-2301",
    customer: "Meera Nair",
    amount: "₹1,250",
    status: "Delivered" as const,
    date: "15 May 2023"
  }
];

// Mock data for top selling products
const TOP_SELLING_PRODUCTS = [
  {
    id: "1",
    name: "Customizable Desk Organizer",
    price: "₹699",
    sold: 152,
    imageUrl: "https://images.unsplash.com/photo-1544376798-76d0953d1506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Miniature Taj Mahal",
    price: "₹799",
    sold: 127,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Family Name Plate",
    price: "₹999",
    sold: 98,
    imageUrl: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    name: "Geometric Plant Holder",
    price: "₹599",
    sold: 87,
    imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    name: "Geometric Lamp Shade",
    price: "₹1,499",
    sold: 75,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

const Admin = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewAllOrders = () => {
    navigate('/admin/orders');
  };

  const handleViewAllProducts = () => {
    navigate('/admin/products');
  };

  const handleAddNewProduct = () => {
    navigate('/admin/products');
  };

  const handleSchedulePromotion = () => {
    toast({
      title: "Schedule Promotion",
      description: "Promotion scheduling feature coming soon!",
    });
  };

  const handleCreateDiscount = () => {
    toast({
      title: "Create Discount",
      description: "Discount creation feature coming soon!",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Data",
      description: "Exporting admin data...",
    });
    // Simulate export functionality
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Data has been exported successfully!",
      });
    }, 2000);
  };

  const handleImport = () => {
    toast({
      title: "Import Data",
      description: "Import feature coming soon!",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications.",
    });
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-black text-white">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <Logo withText={false} />
            <span className="ml-3 text-xl font-semibold">AVIRVA Admin</span>
          </div>
        </div>

        <nav className="flex-grow p-4">
          <p className="text-xs text-gray-400 font-medium mb-3 uppercase">Dashboard</p>
          <Link to="/admin" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white mb-1">
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
          <Link to="/admin/customers" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Support</p>
          <Link to="/admin/tickets" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <MessageSquare className="h-5 w-5 mr-3" />
            Tickets
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Analytics</p>
          <Link to="/admin/analytics" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <BarChart3 className="h-5 w-5 mr-3" />
            Reports
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Content</p>
          <Link to="/admin/slideshow" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Slideshow
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
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
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
              <h1 className="text-xl font-semibold text-black">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={handleNotifications}
              >
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
                  <span className="text-sm text-black mr-1">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Admin content */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto bg-gray-50">
          {/* Action buttons */}
          <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
            <Button 
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white"
              onClick={handleAddNewProduct}
            >
              <PlusCircle className="h-4 w-4" />
              Add New Product
            </Button>
            <Button 
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white"
              onClick={handleSchedulePromotion}
            >
              <Calendar className="h-4 w-4" />
              Schedule Promotion
            </Button>
            <Button 
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white"
              onClick={handleCreateDiscount}
            >
              <Percent className="h-4 w-4" />
              Create Discount
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 ml-auto border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleImport}
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <AdminStatCard
              title="Total Sales"
              value="₹1,24,568"
              trendValue="12.5%"
              trend="from last month"
              trendIsPositive={true}
              icon={BarChart3}
              iconBgClass="bg-gray-100"
              iconColorClass="text-gray-600"
            />
            <AdminStatCard
              title="Orders"
              value="284"
              trendValue="8.2%"
              trend="from last month"
              trendIsPositive={true}
              icon={ShoppingBag}
              iconBgClass="bg-gray-100"
              iconColorClass="text-gray-600"
            />
            <AdminStatCard
              title="Products"
              value="156"
              trendValue="24"
              trend="new this month"
              trendIsPositive={true}
              icon={Package}
              iconBgClass="bg-gray-100"
              iconColorClass="text-gray-600"
            />
            <AdminStatCard
              title="Tickets"
              value="42"
              trendValue="7"
              trend="open tickets"
              trendIsPositive={false}
              icon={MessageSquare}
              iconBgClass="bg-gray-100"
              iconColorClass="text-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentOrdersTable 
                orders={RECENT_ORDERS} 
                onViewAllClick={handleViewAllOrders} 
              />
            </div>
            
            <div>
              <TopSellingProducts 
                products={TOP_SELLING_PRODUCTS} 
                onViewAllClick={handleViewAllProducts} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
