
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3,
  Home
} from 'lucide-react';

interface AdminMobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminMobileNavigation: React.FC<AdminMobileNavigationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 lg:hidden">
      <div className="flex flex-col h-full p-6">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X />
          </Button>
        </div>
        
        <nav className="flex-grow mt-6">
          <p className="text-xs text-gray-400 font-medium mb-3 uppercase">Dashboard</p>
          <Link 
            to="/admin" 
            className="flex items-center py-3 px-3 rounded-md bg-gray-800 text-white mb-2"
            onClick={onClose}
          >
            <LayoutGrid className="h-5 w-5 mr-3" />
            Overview
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Products</p>
          <Link 
            to="/admin/products" 
            className="flex items-center py-3 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-2"
            onClick={onClose}
          >
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link 
            to="/admin/categories" 
            className="flex items-center py-3 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-2"
            onClick={onClose}
          >
            <LayoutGrid className="h-5 w-5 mr-3" />
            Categories
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Orders</p>
          <Link 
            to="/admin/orders" 
            className="flex items-center py-3 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-2"
            onClick={onClose}
          >
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Customers</p>
          <Link 
            to="/admin/customers" 
            className="flex items-center py-3 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-2"
            onClick={onClose}
          >
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Analytics</p>
          <Link 
            to="/admin/analytics" 
            className="flex items-center py-3 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-2"
            onClick={onClose}
          >
            <BarChart3 className="h-5 w-5 mr-3" />
            Reports
          </Link>
          
          <div className="mt-6">
            <Link 
              to="/admin/settings" 
              className="flex items-center py-3 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={onClose}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <Link 
              to="/" 
              className="flex items-center py-3 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={onClose}
            >
              <Home className="h-5 w-5 mr-3" />
              Go to Website
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminMobileNavigation;
