import React, { useState, useEffect } from 'react';
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
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Tag,
  ChevronRight,
  Check,
  Package as PackageIcon,
  Truck,
  CheckCircle2,
  Undo,
  ArrowUp,
  ArrowDown,
  Loader2,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  orderId: string;
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
  status: 'confirming' | 'printing' | 'shipped' | 'delivered';
  placedAt: string;
  promoApplied: string | null;
  loyaltyPointsUsed: number;
  finalAmount: number;
  previousStatus?: string; // For undo functionality
}

const ORDER_STATUSES = [
  { value: 'confirming', label: 'Confirming', icon: <Loader2 className="h-4 w-4" /> },
  { value: 'printing', label: 'Printing', icon: <PackageIcon className="h-4 w-4" /> },
  { value: 'shipped', label: 'Shipped', icon: <Truck className="h-4 w-4" /> },
  { value: 'delivered', label: 'Delivered', icon: <CheckCircle2 className="h-4 w-4" /> },
];

// Mock orders data (in a real app this would come from an API)
const MOCK_ORDERS: Order[] = [
  {
    orderId: "ORD-123456",
    items: [
      {
        id: 1,
        name: "Geometric Plant Holder",
        price: 599,
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      }
    ],
    total: 1198,
    status: 'confirming',
    placedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "9876543210",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    promoApplied: null,
    loyaltyPointsUsed: 0,
    finalAmount: 1198
  },
  {
    orderId: "ORD-123457",
    items: [
      {
        id: 3,
        name: "Desk Lamp",
        price: 1299,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      }
    ],
    total: 1299,
    status: 'printing',
    placedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001"
    },
    promoApplied: "WELCOME10",
    loyaltyPointsUsed: 0,
    finalAmount: 1169
  },
  {
    orderId: "ORD-123458",
    items: [
      {
        id: 4,
        name: "Miniature Car",
        price: 699,
        quantity: 3,
        imageUrl: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 5,
        name: "Phone Stand",
        price: 399,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      }
    ],
    total: 2496,
    status: 'shipped',
    placedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    shippingAddress: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@example.com",
      phone: "5554443333",
      address: "789 Lake View",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    promoApplied: "SUMMER25",
    loyaltyPointsUsed: 150,
    finalAmount: 1722
  },
  {
    orderId: "ORD-123459",
    items: [
      {
        id: 2,
        name: "Wall Mounted Shelf",
        price: 799,
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      }
    ],
    total: 1598,
    status: 'delivered',
    placedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    shippingAddress: {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.b@example.com",
      phone: "7778889999",
      address: "101 Hill Road",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001"
    },
    promoApplied: "FREESHIP",
    loyaltyPointsUsed: 50,
    finalAmount: 1444
  }
];

const AdminOrders = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load orders from localStorage or use mock data
    const storedOrders = localStorage.getItem('adminOrders');
    
    if (storedOrders && JSON.parse(storedOrders).length > 0) {
      setOrders(JSON.parse(storedOrders));
    } else {
      // Use mock data if no stored orders
      setOrders(MOCK_ORDERS);
      // Save mock data to localStorage
      localStorage.setItem('adminOrders', JSON.stringify(MOCK_ORDERS));
    }
  }, []);
  
  const filteredOrders = orders.filter(order => {
    // Filter by search term
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    // Filter by promo code usage
    const matchesPromo = filterStatus !== 'promo' || order.promoApplied !== null;
    
    return matchesSearch && matchesStatus && matchesPromo;
  });

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleStatusChange = (orderId: string, newStatus: 'confirming' | 'printing' | 'shipped' | 'delivered') => {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return {
          ...order,
          previousStatus: order.status, // Store previous status for undo
          status: newStatus
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Update in localStorage
    localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
    
    // Update selected order if it's the one being changed
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        previousStatus: selectedOrder.status,
        status: newStatus
      });
    }
    
    toast({
      title: "Order status updated",
      description: `Order ${orderId} status changed to ${getStatusLabel(newStatus)}`
    });
  };

  const handleUndoStatus = (orderId: string) => {
    const orderToUpdate = orders.find(order => order.orderId === orderId);
    
    if (!orderToUpdate || !orderToUpdate.previousStatus) {
      toast({
        title: "Cannot undo",
        description: "No previous status available to revert to",
        variant: "destructive"
      });
      return;
    }
    
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: order.previousStatus as 'confirming' | 'printing' | 'shipped' | 'delivered',
          previousStatus: undefined // Clear the previous status after undo
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Update in localStorage
    localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
    
    // Update selected order if it's the one being changed
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: selectedOrder.previousStatus as 'confirming' | 'printing' | 'shipped' | 'delivered',
        previousStatus: undefined
      });
    }
    
    toast({
      title: "Status change undone",
      description: `Order ${orderId} status reverted to ${getStatusLabel(orderToUpdate.previousStatus)}`
    });
  };

  const getStatusLabel = (status: string): string => {
    const foundStatus = ORDER_STATUSES.find(s => s.value === status);
    return foundStatus ? foundStatus.label : status;
  };

  const getStatusIcon = (status: string) => {
    const foundStatus = ORDER_STATUSES.find(s => s.value === status);
    return foundStatus ? foundStatus.icon : <Check className="h-4 w-4" />;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirming':
        return 'bg-blue-100 text-blue-700';
      case 'printing':
        return 'bg-amber-100 text-amber-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotalItems = (items: OrderItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
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
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Support</p>
          <Link to="/admin/tickets" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Users className="h-5 w-5 mr-3" />
            Tickets
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
              <Button variant="outline" size="sm">Logout</Button>
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
                  placeholder="Search orders by ID or customer..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {filterStatus === 'all' ? 'All Orders' : getStatusLabel(filterStatus)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                      All Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {ORDER_STATUSES.map(status => (
                      <DropdownMenuItem 
                        key={status.value} 
                        onClick={() => setFilterStatus(status.value)}
                      >
                        <div className="flex items-center">
                          {status.icon}
                          <span className="ml-2">{status.label}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterStatus('promo')}>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4" />
                        <span className="ml-2">With Promo Code</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {showDetails && selectedOrder ? (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold">Order Details</h2>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {getStatusLabel(selectedOrder.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-500">
                      Order ID: {selectedOrder.orderId} - Placed on {formatDate(selectedOrder.placedAt)}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowDetails(false)}
                  >
                    Back to List
                  </Button>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Items</h3>
                    <div className="space-y-4">
                      {selectedOrder.items.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded-md" 
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Quantity: {item.quantity}</span>
                              <span>₹{item.price} each</span>
                            </div>
                            <div className="text-right font-medium mt-1">
                              ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-gray-500 mb-1">Contact</h4>
                        <p>{selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</p>
                        <p>{selectedOrder.shippingAddress.email}</p>
                        <p>{selectedOrder.shippingAddress.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-500 mb-1">Shipping Address</h4>
                        <p>{selectedOrder.shippingAddress.address}</p>
                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                        <p>{selectedOrder.shippingAddress.pincode}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Order Status</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                          
                          {ORDER_STATUSES.map((status, index) => {
                            const isActive = ORDER_STATUSES.findIndex(s => s.value === selectedOrder.status) >= index;
                            
                            return (
                              <div 
                                key={status.value}
                                className={`relative flex mb-6 ${isActive ? '' : 'opacity-40'}`}
                              >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 
                                  ${isActive ? 'bg-indigo' : 'bg-gray-300'}`}
                                >
                                  {status.icon}
                                </div>
                                <div className="ml-4">
                                  <h3 className={`text-lg font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {status.label}
                                  </h3>
                                  {status.value === 'confirming' && isActive && (
                                    <p className="text-gray-500 text-sm">
                                      Order placed on {formatDate(selectedOrder.placedAt)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="w-40">
                        <h4 className="text-sm font-medium mb-2">Update Status</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full">
                              {getStatusLabel(selectedOrder.status)}
                              <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {ORDER_STATUSES.map(status => (
                              <DropdownMenuItem 
                                key={status.value} 
                                onClick={() => handleStatusChange(selectedOrder.orderId, status.value as any)}
                                disabled={status.value === selectedOrder.status}
                              >
                                <div className="flex items-center">
                                  {status.icon}
                                  <span className="ml-2">{status.label}</span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {selectedOrder.previousStatus && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center justify-center w-full mt-2"
                            onClick={() => handleUndoStatus(selectedOrder.orderId)}
                          >
                            <Undo className="h-3.5 w-3.5 mr-1" />
                            Undo Change
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Order Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{selectedOrder.total}</span>
                      </div>
                      
                      {selectedOrder.promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            <span>{selectedOrder.promoApplied}</span>
                          </div>
                          <span>-₹{(selectedOrder.total - selectedOrder.finalAmount).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {selectedOrder.loyaltyPointsUsed > 0 && (
                        <div className="flex justify-between text-amber-600">
                          <div className="flex items-center">
                            <Coins className="h-4 w-4 mr-1" />
                            <span>Points used ({selectedOrder.loyaltyPointsUsed})</span>
                          </div>
                          <span>-₹{(selectedOrder.loyaltyPointsUsed * 0.1).toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-200 pt-3 font-semibold flex justify-between">
                        <span>Total</span>
                        <span>₹{selectedOrder.finalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-700 bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Order ID</th>
                      <th className="px-4 py-3 text-left font-medium">Customer</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-left font-medium">Items</th>
                      <th className="px-4 py-3 text-left font-medium">Total</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Promo</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.orderId} className="border-b">
                          <td className="px-4 py-3 font-medium">{order.orderId}</td>
                          <td className="px-4 py-3">{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{formatDate(order.placedAt)}</td>
                          <td className="px-4 py-3">{calculateTotalItems(order.items)} items</td>
                          <td className="px-4 py-3">₹{order.finalAmount.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(order.status)}>
                              <span className="flex items-center">
                                {getStatusIcon(order.status)}
                                <span className="ml-1">{getStatusLabel(order.status)}</span>
                              </span>
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            {order.promoApplied ? (
                              <Badge className="bg-green-100 text-green-700">
                                <span className="flex items-center">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {order.promoApplied}
                                </span>
                              </Badge>
                            ) : "—"}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleSelectOrder(order)}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleSelectOrder(order)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    disabled={order.status === 'confirming'}
                                    onClick={() => handleStatusChange(order.orderId, 'confirming')}
                                  >
                                    <div className="flex items-center">
                                      <Loader2 className="h-4 w-4 mr-2" />
                                      Mark as Confirming
                                    </div>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    disabled={order.status === 'printing'}
                                    onClick={() => handleStatusChange(order.orderId, 'printing')}
                                  >
                                    <div className="flex items-center">
                                      <PackageIcon className="h-4 w-4 mr-2" />
                                      Mark as Printing
                                    </div>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    disabled={order.status === 'shipped'}
                                    onClick={() => handleStatusChange(order.orderId, 'shipped')}
                                  >
                                    <div className="flex items-center">
                                      <Truck className="h-4 w-4 mr-2" />
                                      Mark as Shipped
                                    </div>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    disabled={order.status === 'delivered'}
                                    onClick={() => handleStatusChange(order.orderId, 'delivered')}
                                  >
                                    <div className="flex items-center">
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Mark as Delivered
                                    </div>
                                  </DropdownMenuItem>
                                  {order.previousStatus && (
                                    <>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => handleUndoStatus(order.orderId)}>
                                        <div className="flex items-center">
                                          <Undo className="h-4 w-4 mr-2" />
                                          Undo Status Change
                                        </div>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                          No orders found. Try adjusting your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-3 flex items-center justify-between border-t">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
                  <span className="font-medium">{orders.length}</span> orders
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ArrowUp className="h-4 w-4 mr-1" /> Older
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <ArrowDown className="h-4 w-4 mr-1" /> Newer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;
