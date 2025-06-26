
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, ShoppingBag, Heart, LogOut, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from '@supabase/supabase-js';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_items: {
    quantity: number;
    price: number;
    products: {
      name: string;
    };
  }[];
}

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  addresses: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }[];
}

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      setLoading(true);
      
      // Fetch user profile with addresses
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          addresses (*)
        `)
        .eq('id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      } else if (profile) {
        setUserProfile(profile);
      }

      // Fetch user orders with order items and product details
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price,
            products (name)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else {
        setOrders(ordersData || []);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'processing':
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow py-8 bg-white">
          <div className="container-avirva">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Loading...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow py-8 bg-white">
          <div className="container-avirva">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Please log in to access your account</h1>
              <Button asChild>
                <Link to="/auth">Login</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = userProfile?.first_name && userProfile?.last_name 
    ? `${userProfile.first_name} ${userProfile.last_name}`
    : userProfile?.email || session.user.email || 'User';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-8 bg-white">
        <div className="container-avirva">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black">My Account</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">{displayName}</h3>
                    <p className="text-gray-600 text-sm">{userProfile?.email || session.user.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className={`w-full justify-start ${
                      activeTab === "profile" 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-5 w-5" /> Profile
                  </Button>
                  <Button 
                    variant={activeTab === "orders" ? "default" : "ghost"} 
                    className={`w-full justify-start ${
                      activeTab === "orders" 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" /> Orders
                  </Button>
                  <Button 
                    variant={activeTab === "wishlist" ? "default" : "ghost"} 
                    className={`w-full justify-start ${
                      activeTab === "wishlist" 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-5 w-5" /> Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === "support" ? "default" : "ghost"} 
                    className={`w-full justify-start ${
                      activeTab === "support" 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab("support")}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" /> Support
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className={`w-full justify-start ${
                      activeTab === "settings" 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" /> Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </Button>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow border border-gray-200">
                {activeTab === "profile" && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-black">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          value={userProfile?.first_name || ''} 
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" 
                          readOnly 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          value={userProfile?.last_name || ''} 
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" 
                          readOnly 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          value={userProfile?.email || session.user.email || ''} 
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" 
                          readOnly 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input 
                          type="tel" 
                          value={userProfile?.phone || ''} 
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" 
                          readOnly 
                        />
                      </div>
                    </div>
                    
                    {userProfile?.addresses && userProfile.addresses.length > 0 && (
                      <>
                        <h2 className="text-lg font-semibold mt-6 mb-4 text-black">Address</h2>
                        <div className="space-y-4">
                          {userProfile.addresses.map((address, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-md">
                              <p className="text-black">
                                {address.street}, {address.city}, {address.state} {address.postal_code}, {address.country}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    
                    <div className="mt-6">
                      <Button className="bg-black hover:bg-gray-800 text-white">Edit Profile</Button>
                    </div>
                  </div>
                )}
                
                {activeTab === "orders" && (
                  <div>
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-black">My Orders</h2>
                    </div>
                    {orders.length === 0 ? (
                      <div className="p-6 text-center">
                        <p className="text-gray-600">No orders found</p>
                        <Button asChild className="mt-4 bg-black hover:bg-gray-800 text-white">
                          <Link to="/">Start Shopping</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="text-gray-700 bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 font-medium">Order ID</th>
                              <th className="px-4 py-3 font-medium">Date</th>
                              <th className="px-4 py-3 font-medium">Items</th>
                              <th className="px-4 py-3 font-medium">Total</th>
                              <th className="px-4 py-3 font-medium">Status</th>
                              <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order) => (
                              <tr key={order.id} className="border-b border-gray-200">
                                <td className="px-4 py-3 font-medium text-black">#{order.id.slice(0, 8)}</td>
                                <td className="px-4 py-3 text-gray-700">{formatDate(order.created_at)}</td>
                                <td className="px-4 py-3 text-gray-700">
                                  {order.order_items?.length || 0} item(s)
                                </td>
                                <td className="px-4 py-3 text-gray-700">{formatPrice(order.total_amount)}</td>
                                <td className="px-4 py-3">
                                  <span 
                                    className={`inline-block px-2 py-0.5 text-xs rounded capitalize ${getStatusClass(order.status)}`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === "wishlist" && (
                  <div>
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-black">My Wishlist</h2>
                    </div>
                    <div className="p-6 text-center">
                      <p className="text-gray-600">Your wishlist is empty</p>
                      <Button asChild className="mt-4 bg-black hover:bg-gray-800 text-white">
                        <Link to="/">Browse Products</Link>
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === "support" && (
                  <div>
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-black">Customer Support</h2>
                    </div>
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-black mb-2">Need Help?</h3>
                        <p className="text-gray-600 mb-6">
                          Submit a support ticket and our team will get back to you as soon as possible.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                          <Link to="/tickets">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Create Support Ticket
                          </Link>
                        </Button>
                        
                        <div className="text-center text-sm text-gray-500">
                          <p>Or contact us directly:</p>
                          <p className="font-medium text-gray-700 mt-1">
                            support@avirva.com | +1 (800) 123-4567
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "settings" && (
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-black">Account Settings</h2>
                    
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="bg-gray-100 border border-gray-200">
                        <TabsTrigger value="general" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black">General</TabsTrigger>
                        <TabsTrigger value="security" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black">Security</TabsTrigger>
                        <TabsTrigger value="notifications" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black">Notifications</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="general" className="py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                            <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-black">
                              <option>English</option>
                              <option>हिंदी</option>
                              <option>தமிழ்</option>
                              <option>मराठी</option>
                            </select>
                          </div>
                          <Button className="bg-black hover:bg-gray-800 text-white">Save Changes</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="security" className="py-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input type="password" className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input type="password" className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input type="password" className="w-full p-2 border border-gray-300 rounded-md bg-white text-black" />
                          </div>
                          <Button className="bg-black hover:bg-gray-800 text-white">Update Password</Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="notifications" className="py-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-black">Email Notifications</h3>
                              <p className="text-sm text-gray-600">Receive order updates via email</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="email-notifications" defaultChecked className="sr-only" />
                              <label htmlFor="email-notifications" className="inline-block h-6 w-11 rounded-full bg-gray-300 cursor-pointer relative transition-colors duration-200 peer-checked:bg-black">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-black">WhatsApp Notifications</h3>
                              <p className="text-sm text-gray-600">Receive order updates via WhatsApp</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="whatsapp-notifications" defaultChecked className="sr-only" />
                              <label htmlFor="whatsapp-notifications" className="inline-block h-6 w-11 rounded-full bg-gray-300 cursor-pointer relative transition-colors duration-200 peer-checked:bg-black">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-black">Marketing Communications</h3>
                              <p className="text-sm text-gray-600">Receive offers and promotional messages</p>
                            </div>
                            <div className="form-switch">
                              <input type="checkbox" id="marketing-communications" className="sr-only" />
                              <label htmlFor="marketing-communications" className="inline-block h-6 w-11 rounded-full bg-gray-300 cursor-pointer relative transition-colors duration-200 peer-checked:bg-black">
                                <span className="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 peer-checked:translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                          
                          <Button className="bg-black hover:bg-gray-800 text-white">Save Preferences</Button>
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
