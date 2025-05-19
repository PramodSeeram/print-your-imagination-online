
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  // Mock user data
  const userData = {
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Bangalore, Karnataka, 560001"
  };

  // Mock orders data
  const orders = [
    {
      id: "#ORD-2305",
      date: "18 May 2023",
      total: "₹2,499",
      status: "Delivered"
    },
    {
      id: "#ORD-2304",
      date: "17 May 2023",
      total: "₹1,899",
      status: "Shipped"
    },
    {
      id: "#ORD-2303",
      date: "16 May 2023",
      total: "₹3,750",
      status: "Processing"
    }
  ];

  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Geometric Plant Holder",
      price: 599,
      imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "Family Name Plate",
      price: 999,
      imageUrl: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-avirva">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">My Account</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-indigo flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {userData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{userData.name}</h3>
                    <p className="text-gray-500 text-sm">{userData.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-5 w-5" /> Profile
                  </Button>
                  <Button 
                    variant={activeTab === "orders" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" /> Orders
                  </Button>
                  <Button 
                    variant={activeTab === "wishlist" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-5 w-5" /> Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" /> Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </Button>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow">
                {activeTab === "profile" && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" value={userData.name} className="w-full p-2 border rounded-md" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" value={userData.email} className="w-full p-2 border rounded-md" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="tel" value={userData.phone} className="w-full p-2 border rounded-md" readOnly />
                      </div>
                    </div>
                    
                    <h2 className="text-lg font-semibold mt-6 mb-4">Address</h2>
                    <textarea value={userData.address} className="w-full p-2 border rounded-md h-24" readOnly></textarea>
                    
                    <div className="mt-6">
                      <Button>Edit Profile</Button>
                    </div>
                  </div>
                )}
                
                {activeTab === "orders" && (
                  <div>
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-semibold">My Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-gray-700 bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 font-medium">Order ID</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Total</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.id} className="border-b">
                              <td className="px-4 py-3 font-medium">{order.id}</td>
                              <td className="px-4 py-3">{order.date}</td>
                              <td className="px-4 py-3">{order.total}</td>
                              <td className="px-4 py-3">
                                <span 
                                  className={`inline-block px-2 py-0.5 text-xs rounded ${getStatusClass(order.status)}`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === "wishlist" && (
                  <div>
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-semibold">My Wishlist</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex border rounded-lg overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover"
                          />
                          <div className="p-3 flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-lg font-semibold mt-1">₹{item.price}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" className="bg-teal hover:bg-teal-600">
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="sm">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === "settings" && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                    
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="general" className="py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                            <select className="w-full p-2 border rounded-md">
                              <option>English</option>
                              <option>हिंदी</option>
                              <option>தமிழ்</option>
                              <option>मराठी</option>
                            </select>
                          </div>
                          <Button>Save Changes</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="security" className="py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input type="password" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input type="password" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input type="password" className="w-full p-2 border rounded-md" />
                          </div>
                          <Button>Update Password</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notifications" className="py-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Email Notifications</h3>
                              <p className="text-sm text-gray-500">Receive order updates via email</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="email-notifications" defaultChecked className="sr-only" />
                              <label htmlFor="email-notifications" className="inline-block h-6 w-11 rounded-full bg-gray-300 cursor-pointer relative transition-colors duration-200 peer-checked:bg-green-500">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">WhatsApp Notifications</h3>
                              <p className="text-sm text-gray-500">Receive order updates via WhatsApp</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="whatsapp-notifications" defaultChecked className="sr-only" />
                              <label htmlFor="whatsapp-notifications" className="inline-block h-6 w-11 rounded-full bg-gray-300 cursor-pointer relative transition-colors duration-200 peer-checked:bg-green-500">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Marketing Communications</h3>
                              <p className="text-sm text-gray-500">Receive offers and promotional messages</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="marketing-communications" className="sr-only" />
                              <label htmlFor="marketing-communications" className="inline-block h-6 w-11 rounded-full bg-gray-300 cursor-pointer relative transition-colors duration-200 peer-checked:bg-green-500">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <Button>Save Preferences</Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
