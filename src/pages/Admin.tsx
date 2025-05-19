
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  Home
} from 'lucide-react';
import Logo from '@/components/Logo';

const Admin = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white">
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Admin header */}
        <header className="bg-white shadow-sm border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div>
              <span className="text-gray-600 mr-3">Admin User</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </header>

        {/* Admin content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total Sales</p>
                  <h3 className="text-2xl font-bold">₹1,24,568</h3>
                  <p className="text-green-500 text-xs mt-1">+12.5% from last month</p>
                </div>
                <div className="bg-teal-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Orders</p>
                  <h3 className="text-2xl font-bold">284</h3>
                  <p className="text-green-500 text-xs mt-1">+8.2% from last month</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Products</p>
                  <h3 className="text-2xl font-bold">156</h3>
                  <p className="text-green-500 text-xs mt-1">+24 new this month</p>
                </div>
                <div className="bg-saffron-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-saffron-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Customers</p>
                  <h3 className="text-2xl font-bold">2,156</h3>
                  <p className="text-green-500 text-xs mt-1">+186 new this month</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-semibold text-lg">Recent Orders</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-gray-700 bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 font-medium">Order ID</th>
                        <th className="px-4 py-2 font-medium">Customer</th>
                        <th className="px-4 py-2 font-medium">Amount</th>
                        <th className="px-4 py-2 font-medium">Status</th>
                        <th className="px-4 py-2 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">#ORD-2305</td>
                        <td className="px-4 py-2">Rahul Mehta</td>
                        <td className="px-4 py-2">₹2,499</td>
                        <td className="px-4 py-2"><span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Delivered</span></td>
                        <td className="px-4 py-2">18 May 2023</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">#ORD-2304</td>
                        <td className="px-4 py-2">Sneha Jain</td>
                        <td className="px-4 py-2">₹1,899</td>
                        <td className="px-4 py-2"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Shipped</span></td>
                        <td className="px-4 py-2">17 May 2023</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">#ORD-2303</td>
                        <td className="px-4 py-2">Kiran Reddy</td>
                        <td className="px-4 py-2">₹3,750</td>
                        <td className="px-4 py-2"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">Processing</span></td>
                        <td className="px-4 py-2">16 May 2023</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">#ORD-2302</td>
                        <td className="px-4 py-2">Anish Varma</td>
                        <td className="px-4 py-2">₹899</td>
                        <td className="px-4 py-2"><span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Delivered</span></td>
                        <td className="px-4 py-2">15 May 2023</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium text-gray-900">#ORD-2301</td>
                        <td className="px-4 py-2">Meera Nair</td>
                        <td className="px-4 py-2">₹1,250</td>
                        <td className="px-4 py-2"><span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Delivered</span></td>
                        <td className="px-4 py-2">15 May 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm" className="text-indigo hover:text-indigo-700">
                    View All Orders
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-semibold text-lg">Top Selling Products</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1544376798-76d0953d1506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                        alt="Desk Organizer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-900">Customizable Desk Organizer</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹699</span>
                        <span>152 sold</span>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                        alt="Miniature Taj Mahal"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-900">Miniature Taj Mahal</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹799</span>
                        <span>127 sold</span>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                        alt="Family Name Plate"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-900">Family Name Plate</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹999</span>
                        <span>98 sold</span>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                        alt="Geometric Plant Holder"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-900">Geometric Plant Holder</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹599</span>
                        <span>87 sold</span>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                        alt="Geometric Lamp Shade"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-gray-900">Geometric Lamp Shade</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹1,499</span>
                        <span>75 sold</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm" className="text-indigo hover:text-indigo-700">
                    View All Products
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
