
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
  Save,
  User,
  CreditCard,
  Bell as BellIcon,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully"
    });
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case "account":
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Account Information</h3>
              <p className="text-sm text-gray-500">
                Update your account details and information.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input id="email" type="email" defaultValue="admin@avirva.com" />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
                <Input id="role" disabled defaultValue="Administrator" className="bg-gray-100" />
              </div>
              
              <div className="flex items-center justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        );
      case "password":
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Password Settings</h3>
              <p className="text-sm text-gray-500">
                Update your password to keep your account secure.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">Current Password</label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm New Password</label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <div className="flex items-center justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <p className="text-sm text-gray-500">
                Configure how you want to receive notifications.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Email Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Orders</p>
                    <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-gray-500">Get notified when products are low on stock</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer Reviews</p>
                    <p className="text-sm text-gray-500">Get notified about new customer reviews</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Updates</p>
                    <p className="text-sm text-gray-500">Receive marketing tips and updates</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">WhatsApp Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Status Updates</p>
                    <p className="text-sm text-gray-500">Send WhatsApp notifications for order status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delivery Notifications</p>
                    <p className="text-sm text-gray-500">Send WhatsApp notifications for deliveries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex items-center justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Billing Information</h3>
              <p className="text-sm text-gray-500">
                Manage your billing details and payment methods.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name</label>
                <Input id="companyName" defaultValue="AVIRVA 3D Printing" />
              </div>
              
              <div>
                <label htmlFor="gstNumber" className="block text-sm font-medium mb-1">GST Number</label>
                <Input id="gstNumber" defaultValue="29GGGGG1314R9Z6" />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Billing Address</label>
                <Input id="address" defaultValue="123 Main Street, Bangalore, Karnataka, 560001" />
              </div>
              
              <div className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Credit Card ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 01/25</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    toast({
                      title: "Edit payment method",
                      description: "Opening payment method editor"
                    });
                  }}
                >
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center justify-end">
                <Button 
                  variant="outline" 
                  className="mr-2" 
                  onClick={() => {
                    toast({
                      title: "Add payment method",
                      description: "Opening payment method form"
                    });
                  }}
                >
                  Add Payment Method
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
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
            <Link to="/admin/settings" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white">
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
              <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
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

        {/* Settings content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <nav>
                  <button
                    className={`w-full flex items-center py-3 px-4 text-left ${activeTab === "account" ? "bg-gray-100 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Account
                  </button>
                  
                  <button
                    className={`w-full flex items-center py-3 px-4 text-left ${activeTab === "password" ? "bg-gray-100 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("password")}
                  >
                    <Lock className="h-5 w-5 mr-3" />
                    Password
                  </button>
                  
                  <button
                    className={`w-full flex items-center py-3 px-4 text-left ${activeTab === "notifications" ? "bg-gray-100 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <BellIcon className="h-5 w-5 mr-3" />
                    Notifications
                  </button>
                  
                  <button
                    className={`w-full flex items-center py-3 px-4 text-left ${activeTab === "billing" ? "bg-gray-100 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setActiveTab("billing")}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    Billing
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Tab content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
