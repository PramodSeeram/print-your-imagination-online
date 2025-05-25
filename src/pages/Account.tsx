
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
        return 'bg-green-500/20 text-green-400';
      case 'Shipped':
        return 'bg-blue-500/20 text-blue-400';
      case 'Processing':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      
      <main className="flex-grow py-8 bg-slate-950">
        <div className="container-avirva">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-100">My Account</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-slate-800 rounded-lg shadow p-6 border border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {userData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-100">{userData.name}</h3>
                    <p className="text-slate-400 text-sm">{userData.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start text-slate-100 hover:bg-slate-700"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-5 w-5" /> Profile
                  </Button>
                  <Button 
                    variant={activeTab === "orders" ? "default" : "ghost"} 
                    className="w-full justify-start text-slate-100 hover:bg-slate-700"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" /> Orders
                  </Button>
                  <Button 
                    variant={activeTab === "wishlist" ? "default" : "ghost"} 
                    className="w-full justify-start text-slate-100 hover:bg-slate-700"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-5 w-5" /> Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start text-slate-100 hover:bg-slate-700"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" /> Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </Button>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <div className="bg-slate-800 rounded-lg shadow border border-slate-700">
                {activeTab === "profile" && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-slate-100">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                        <input type="text" value={userData.name} className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-slate-100" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input type="email" value={userData.email} className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-slate-100" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
                        <input type="tel" value={userData.phone} className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-slate-100" readOnly />
                      </div>
                    </div>
                    
                    <h2 className="text-lg font-semibold mt-6 mb-4 text-slate-100">Address</h2>
                    <textarea value={userData.address} className="w-full p-2 border border-slate-600 rounded-md h-24 bg-slate-700 text-slate-100" readOnly></textarea>
                    
                    <div className="mt-6">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Edit Profile</Button>
                    </div>
                  </div>
                )}
                
                {activeTab === "orders" && (
                  <div>
                    <div className="p-6 border-b border-slate-700">
                      <h2 className="text-lg font-semibold text-slate-100">My Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-slate-300 bg-slate-700/50">
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
                            <tr key={order.id} className="border-b border-slate-700">
                              <td className="px-4 py-3 font-medium text-slate-100">{order.id}</td>
                              <td className="px-4 py-3 text-slate-300">{order.date}</td>
                              <td className="px-4 py-3 text-slate-300">{order.total}</td>
                              <td className="px-4 py-3">
                                <span 
                                  className={`inline-block px-2 py-0.5 text-xs rounded ${getStatusClass(order.status)}`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
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
                    <div className="p-6 border-b border-slate-700">
                      <h2 className="text-lg font-semibold text-slate-100">My Wishlist</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex border border-slate-600 rounded-lg overflow-hidden bg-slate-700">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover"
                          />
                          <div className="p-3 flex-1">
                            <h3 className="font-medium text-slate-100">{item.name}</h3>
                            <p className="text-lg font-semibold mt-1 text-slate-200">₹{item.price}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-600">
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
                    <h2 className="text-lg font-semibold mb-4 text-slate-100">Account Settings</h2>
                    
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="bg-slate-700 border-slate-600">
                        <TabsTrigger value="general" className="text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">General</TabsTrigger>
                        <TabsTrigger value="security" className="text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">Security</TabsTrigger>
                        <TabsTrigger value="notifications" className="text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">Notifications</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="general" className="py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Language</label>
                            <select className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-slate-100">
                              <option>English</option>
                              <option>हिंदी</option>
                              <option>தமிழ்</option>
                              <option>मराठी</option>
                            </select>
                          </div>
                          <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="security" className="py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                            <input type="password" className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-slate-100" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                            <input type="password" className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-slate-100" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                            <input type="password" className="w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-slate-100" />
                          </div>
                          <Button className="bg-emerald-600 hover:bg-emerald-700">Update Password</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notifications" className="py-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-slate-100">Email Notifications</h3>
                              <p className="text-sm text-slate-400">Receive order updates via email</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="email-notifications" defaultChecked className="sr-only" />
                              <label htmlFor="email-notifications" className="inline-block h-6 w-11 rounded-full bg-slate-600 cursor-pointer relative transition-colors duration-200 peer-checked:bg-emerald-500">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-slate-100">WhatsApp Notifications</h3>
                              <p className="text-sm text-slate-400">Receive order updates via WhatsApp</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="whatsapp-notifications" defaultChecked className="sr-only" />
                              <label htmlFor="whatsapp-notifications" className="inline-block h-6 w-11 rounded-full bg-slate-600 cursor-pointer relative transition-colors duration-200 peer-checked:bg-emerald-500">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-slate-100">Marketing Communications</h3>
                              <p className="text-sm text-slate-400">Receive offers and promotional messages</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="marketing-communications" className="sr-only" />
                              <label htmlFor="marketing-communications" className="inline-block h-6 w-11 rounded-full bg-slate-600 cursor-pointer relative transition-colors duration-200 peer-checked:bg-emerald-500">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <Button className="bg-emerald-600 hover:bg-emerald-700">Save Preferences</Button>
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
