
import React, { useState, useEffect } from 'react';
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
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  user_id?: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_items?: {
    quantity: number;
    price: number;
    products: {
      name: string;
    };
  }[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  stock_quantity: number | null;
}

const Admin = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent orders
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
        .order('created_at', { ascending: false })
        .limit(5);

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else {
        setRecentOrders(ordersData || []);
      }

      // Fetch top products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(5);

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        setTopProducts(productsData || []);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Transform products data for TopSellingProducts component
  const transformedProducts = topProducts.map(product => ({
    id: product.id,
    name: product.name,
    price: `₹${product.price}`,
    sold: product.stock_quantity || 0,
    imageUrl: product.image_url || "https://images.unsplash.com/photo-1544376798-76d0953d1506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }));

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-primary text-primary-foreground">
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center">
            <Logo withText={false} />
            <span className="ml-3 text-xl font-semibold text-primary-foreground">AVIRVA Admin</span>
          </div>
        </div>

        <nav className="flex-grow p-4">
          <p className="text-xs text-primary-foreground/60 font-medium mb-3 uppercase">Dashboard</p>
          <Link to="/admin" className="flex items-center py-2 px-3 rounded-md bg-secondary text-secondary-foreground mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Overview
          </Link>
          
          <p className="text-xs text-primary-foreground/60 font-medium mt-6 mb-3 uppercase">Products</p>
          <Link to="/admin/products" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground mb-1">
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link to="/admin/categories" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Categories
          </Link>
          
          <p className="text-xs text-primary-foreground/60 font-medium mt-6 mb-3 uppercase">Orders</p>
          <Link to="/admin/orders" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground mb-1">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          
          <p className="text-xs text-primary-foreground/60 font-medium mt-6 mb-3 uppercase">Customers</p>
          <Link to="/admin/customers" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground mb-1">
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          
          <p className="text-xs text-primary-foreground/60 font-medium mt-6 mb-3 uppercase">Support</p>
          <Link to="/admin/tickets" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground mb-1">
            <MessageSquare className="h-5 w-5 mr-3" />
            Tickets
          </Link>
          
          <p className="text-xs text-primary-foreground/60 font-medium mt-6 mb-3 uppercase">Analytics</p>
          <Link to="/admin/analytics" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground mb-1">
            <BarChart3 className="h-5 w-5 mr-3" />
            Reports
          </Link>
          
          <p className="text-xs text-primary-foreground/60 font-medium mt-6 mb-3 uppercase">Content</p>
          <Link to="/admin/slideshow" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Slideshow
          </Link>
          
          <div className="mt-6">
            <Link to="/admin/settings" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
          
          <div className="mt-auto pt-6">
            <Link to="/" className="flex items-center py-2 px-3 rounded-md text-primary-foreground/80 hover:bg-secondary hover:text-secondary-foreground">
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
        <header className="bg-background shadow-sm border-b border-border px-6 py-3">
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
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
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
                  <span className="text-sm text-foreground mr-1">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-border text-foreground hover:bg-muted"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Admin content */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto bg-muted/30">
          {/* Action buttons */}
          <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
            <Button 
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleAddNewProduct}
            >
              <PlusCircle className="h-4 w-4" />
              Add New Product
            </Button>
            <Button 
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={handleSchedulePromotion}
            >
              <Calendar className="h-4 w-4" />
              Schedule Promotion
            </Button>
            <Button 
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={handleCreateDiscount}
            >
              <Percent className="h-4 w-4" />
              Create Discount
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 ml-auto border-border text-foreground hover:bg-muted"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-border text-foreground hover:bg-muted"
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
              value="₹0"
              trendValue="0%"
              trend="from last month"
              trendIsPositive={true}
              icon={BarChart3}
              iconBgClass="bg-gray-100"
              iconColorClass="text-gray-600"
            />
            <AdminStatCard
              title="Orders"
              value={recentOrders.length.toString()}
              trendValue="0"
              trend="from last month"
              trendIsPositive={true}
              icon={ShoppingBag}
              iconBgClass="bg-gray-100"
              iconColorClass="text-gray-600"
            />
            <AdminStatCard
              title="Products"
              value={topProducts.length.toString()}
              trendValue="0"
              trend="new this month"
              trendIsPositive={true}
              icon={Package}
              iconBgClass="bg-gray-100"
              iconColorClass="text-gray-600"
            />
            <AdminStatCard
              title="Tickets"
              value="0"
              trendValue="0"
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
                orders={recentOrders} 
                onViewAllClick={handleViewAllOrders} 
              />
            </div>
            
            <div>
              <TopSellingProducts 
                products={transformedProducts} 
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
