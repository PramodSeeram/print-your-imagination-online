
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Download
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

  const handleViewAllOrders = () => {
    navigate('/admin/orders');
  };

  const handleViewAllProducts = () => {
    navigate('/admin/products');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white">
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
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
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
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </header>

        {/* Admin content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Action buttons */}
          <div className="mb-8 flex flex-wrap gap-3">
            <Button className="flex items-center gap-2 bg-teal hover:bg-teal-600">
              <PlusCircle className="h-4 w-4" />
              Add New Product
            </Button>
            <Button className="flex items-center gap-2 bg-indigo hover:bg-indigo-600">
              <Calendar className="h-4 w-4" />
              Schedule Promotion
            </Button>
            <Button className="flex items-center gap-2 bg-saffron hover:bg-saffron-600">
              <Percent className="h-4 w-4" />
              Create Discount
            </Button>
            <Button variant="outline" className="flex items-center gap-2 ml-auto">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AdminStatCard
              title="Total Sales"
              value="₹1,24,568"
              trendValue="12.5%"
              trend="from last month"
              trendIsPositive={true}
              icon={BarChart3}
              iconBgClass="bg-teal-100"
              iconColorClass="text-teal-600"
            />
            <AdminStatCard
              title="Orders"
              value="284"
              trendValue="8.2%"
              trend="from last month"
              trendIsPositive={true}
              icon={ShoppingBag}
              iconBgClass="bg-indigo-100"
              iconColorClass="text-indigo-600"
            />
            <AdminStatCard
              title="Products"
              value="156"
              trendValue="24"
              trend="new this month"
              trendIsPositive={true}
              icon={Package}
              iconBgClass="bg-saffron-100"
              iconColorClass="text-saffron-600"
            />
            <AdminStatCard
              title="Customers"
              value="2,156"
              trendValue="186"
              trend="new this month"
              trendIsPositive={true}
              icon={Users}
              iconBgClass="bg-purple-100"
              iconColorClass="text-purple-600"
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
