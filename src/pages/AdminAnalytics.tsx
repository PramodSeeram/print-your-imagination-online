
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
  Download,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import AdminStatCard from '@/components/AdminStatCard';
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for sales chart
const SALES_DATA = [
  { name: 'Jan', sales: 24000 },
  { name: 'Feb', sales: 18000 },
  { name: 'Mar', sales: 29000 },
  { name: 'Apr', sales: 32000 },
  { name: 'May', sales: 45000 },
  { name: 'Jun', sales: 52000 },
  { name: 'Jul', sales: 49000 },
];

// Mock data for product performance
const PRODUCT_PERFORMANCE = [
  { name: 'Desk Organizer', sales: 152, revenue: 106000 },
  { name: 'Taj Mahal Miniature', sales: 127, revenue: 101000 },
  { name: 'Name Plate', sales: 98, revenue: 98000 },
  { name: 'Plant Holder', sales: 87, revenue: 53000 },
  { name: 'Lamp Shade', sales: 75, revenue: 112000 },
];

// Mock data for regional sales
const REGIONAL_SALES = [
  { name: 'North', sales: 35 },
  { name: 'South', sales: 28 },
  { name: 'East', sales: 18 },
  { name: 'West', sales: 19 },
];

const AdminAnalytics = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your analytics data export is being prepared",
    });
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
          <Link to="/admin/customers" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Analytics</p>
          <Link to="/admin/analytics" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white mb-1">
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
              <h1 className="text-xl font-semibold text-gray-800">Analytics</h1>
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

        {/* Analytics content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Action bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-wrap gap-4 items-center justify-between">
            <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
            <div className="flex gap-3 flex-wrap">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  toast({
                    title: "Date range selected",
                    description: "Showing data for the selected date range"
                  });
                }}
              >
                <Calendar className="h-4 w-4" />
                Last 30 Days
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AdminStatCard
              title="Total Revenue"
              value="₹4,85,620"
              trendValue="15.3%"
              trend="from last month"
              trendIsPositive={true}
              icon={BarChart3}
              iconBgClass="bg-teal-100"
              iconColorClass="text-teal-600"
            />
            <AdminStatCard
              title="Orders"
              value="684"
              trendValue="8.4%"
              trend="from last month"
              trendIsPositive={true}
              icon={ShoppingBag}
              iconBgClass="bg-indigo-100"
              iconColorClass="text-indigo-600"
            />
            <AdminStatCard
              title="Average Order Value"
              value="₹710"
              trendValue="2.1%"
              trend="from last month"
              trendIsPositive={true}
              icon={BarChart3}
              iconBgClass="bg-saffron-100"
              iconColorClass="text-saffron-600"
            />
            <AdminStatCard
              title="New Customers"
              value="149"
              trendValue="12.8%"
              trend="from last month"
              trendIsPositive={true}
              icon={Users}
              iconBgClass="bg-purple-100"
              iconColorClass="text-purple-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Trend */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Sales Trend</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      toast({
                        title: "Detailed view",
                        description: "Viewing detailed sales analytics"
                      });
                    }}
                  >
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6" style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={SALES_DATA}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Regional Sales */}
            <div>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Regional Sales</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      toast({
                        title: "Detailed view",
                        description: "Viewing detailed regional analytics"
                      });
                    }}
                  >
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6" style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={REGIONAL_SALES}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Sales']} />
                      <Bar dataKey="sales" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Product Performance */}
          <div className="bg-white rounded-lg shadow mt-6">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Product Performance</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  toast({
                    title: "Detailed view",
                    description: "Viewing detailed product performance analytics"
                  });
                }}
              >
                View Details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-700 bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 font-medium">Units Sold</th>
                      <th className="px-4 py-3 font-medium">Revenue</th>
                      <th className="px-4 py-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCT_PERFORMANCE.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                        <td className="px-4 py-3">{product.sales}</td>
                        <td className="px-4 py-3">₹{product.revenue.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          {/* Simplified trend indicator */}
                          {index < 2 ? (
                            <span className="text-green-600">↑ Growing</span>
                          ) : index === 2 ? (
                            <span className="text-blue-600">→ Stable</span>
                          ) : (
                            <span className="text-yellow-600">↓ Declining</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalytics;
