
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Heart,
  LogIn,
  Package,
  ChevronDown,
  ChevronRight,
  Bell,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileMenu } from '@/hooks/use-mobile-menu';
import { useTheme } from '@/hooks/use-theme';

// Mock data for categories
const CATEGORIES = [
  {
    id: "1",
    name: "Home Decor",
    subcategories: [
      { id: "101", name: "Wall Art" },
      { id: "102", name: "Planters" },
      { id: "103", name: "Lighting" }
    ]
  },
  {
    id: "2",
    name: "Miniatures",
    subcategories: [
      { id: "201", name: "Vehicles" },
      { id: "202", name: "Figurines" },
      { id: "203", name: "Landmarks" }
    ]
  },
  {
    id: "3",
    name: "Tech Gadgets",
    subcategories: [
      { id: "301", name: "Phone Stands" },
      { id: "302", name: "Cable Organizers" },
      { id: "303", name: "Key Holders" }
    ]
  }
];

// Mock products for initial search state - real search happens in SearchBar component
const PRODUCTS = [
  { id: 1, name: "Geometric Plant Holder", category: "Home Decor" },
  { id: 2, name: "Wall Mounted Shelf", category: "Home Decor" },
  { id: 3, name: "Desk Lamp", category: "Home Decor" },
  { id: 4, name: "Miniature Car", category: "Miniatures" },
  { id: 5, name: "Phone Stand", category: "Tech Gadgets" },
  { id: 6, name: "Cable Organizer", category: "Tech Gadgets" },
  { id: 7, name: "Wall Art Panels", category: "Home Decor" },
  { id: 8, name: "Desk Organizer", category: "Tech Gadgets" }
];

const Header = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Load cart items count from localStorage
    const loadCartCount = () => {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        const items = JSON.parse(cartItems);
        setCartCount(items.length);
      }
    };
    
    // Load wishlist count from localStorage
    const loadWishlistCount = () => {
      const wishlist = localStorage.getItem('wishlist');
      if (wishlist) {
        const items = JSON.parse(wishlist);
        setWishlistCount(items.length);
      }
    };
    
    loadCartCount();
    loadWishlistCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', loadCartCount);
    window.addEventListener('wishlistUpdated', loadWishlistCount);
    
    // Check if user is logged in (mock)
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    setIsLoggedIn(userLoggedIn === 'true');
    
    return () => {
      window.removeEventListener('cartUpdated', loadCartCount);
      window.removeEventListener('wishlistUpdated', loadWishlistCount);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="border-b bg-background">
      {/* Top Bar */}
      <div className="bg-indigo text-white py-2 text-center text-sm dark:bg-indigo-800">
        <p>Free shipping on all orders above ₹999. Use code FREESHIP at checkout.</p>
      </div>
      
      {/* Main Header */}
      <div className="container-avirva py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
          
          {/* Search - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block relative flex-1 max-w-md mx-8">
            <SearchBar allProducts={PRODUCTS} className="w-full" />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {CATEGORIES.map(category => (
                  <DropdownMenu key={category.id}>
                    <DropdownMenuTrigger className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <span>{category.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right">
                      <Link to={`/category/${category.id}`}>
                        <DropdownMenuItem className="font-medium">
                          All {category.name}
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      {category.subcategories.map(subcategory => (
                        <Link 
                          key={subcategory.id} 
                          to={`/category/${category.id}/subcategory/${subcategory.id}`}
                        >
                          <DropdownMenuItem>{subcategory.name}</DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/tickets">
              <Button variant="ghost">Support</Button>
            </Link>

            <Link to="/collections">
              <Button variant="ghost">Collections</Button>
            </Link>
            
            {isLoggedIn && (
              <Link to="/orders">
                <Button variant="ghost" className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  <span>Orders</span>
                </Button>
              </Link>
            )}
            
            {/* Theme toggle button */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Dialog (removed duplicate search) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search products</DialogTitle>
                  <DialogDescription>
                    Find the perfect 3D printed product for your needs.
                  </DialogDescription>
                </DialogHeader>
                <SearchBar allProducts={PRODUCTS} className="w-full" />
              </DialogContent>
            </Dialog>
            
            {/* Wishlist - Fixed navigation to wishlist page */}
            <Link to="/wishlist" className="relative hidden sm:flex">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative hidden sm:flex">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Account Dropdown - Fixed navigation to account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isLoggedIn ? (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative hidden sm:flex"
                    onClick={() => navigate('/account')}
                  >
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="absolute -top-1 -right-1 bg-teal-400 border-2 border-white dark:border-gray-800 w-3 h-3 rounded-full"></span>
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hidden sm:flex"
                    onClick={() => navigate('/account')}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/account')}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>Orders</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wishlist')}>Wishlist</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/browsing-history')}>Browsing History</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/tickets')}>Support Tickets</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.setItem('userLoggedIn', 'false');
                        setIsLoggedIn(false);
                        navigate('/');
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/account')}>
                      <LogIn className="h-4 w-4 mr-2" /> Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/account?register=true')}>
                      Create Account
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search - shown below header on mobile */}
        <div className="mt-4 mb-2 md:hidden">
          <SearchBar allProducts={PRODUCTS} className="w-full" />
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 w-64 bg-background transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 overflow-y-auto h-full flex flex-col">
            {/* Close button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </Button>
            
            {/* User Section */}
            <div className="py-4 border-b mb-4">
              {isLoggedIn ? (
                <div 
                  className="flex items-center space-x-3 cursor-pointer" 
                  onClick={() => {
                    navigate('/account');
                    closeMenu();
                  }}
                >
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={() => {
                      navigate('/account');
                      closeMenu();
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      navigate('/account?register=true');
                      closeMenu();
                    }}
                  >
                    Create Account
                  </Button>
                </div>
              )}
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2 dark:text-gray-400">Shop By Category</p>
              <ul className="space-y-1">
                {CATEGORIES.map(category => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      onClick={closeMenu}
                      className="block text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="border-t my-4"></div>
              
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/cart"
                    onClick={closeMenu}
                    className="block text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      <span>Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <Badge>{cartCount}</Badge>
                    )}
                  </Link>
                </li>
                
                <li>
                  <Link
                    to="/wishlist"
                    onClick={closeMenu}
                    className="block text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      <span>Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <Badge>{wishlistCount}</Badge>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/browsing-history"
                    onClick={closeMenu}
                    className="block text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Browsing History</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/collections"
                    onClick={closeMenu}
                    className="block text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Collections</span>
                  </Link>
                </li>
                
                {isLoggedIn && (
                  <li>
                    <Link
                      to="/orders"
                      onClick={closeMenu}
                      className="block text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 flex items-center"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      <span>My Orders</span>
                    </Link>
                  </li>
                )}
                
                <li>
                  <Link
                    to="/tickets"
                    onClick={closeMenu}
                    className="block text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 flex items-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Support</span>
                  </Link>
                </li>

                <li className="px-3 py-2">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                </li>
              </ul>
            </nav>
            
            {/* Logout Button */}
            {isLoggedIn && (
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => {
                  localStorage.setItem('userLoggedIn', 'false');
                  setIsLoggedIn(false);
                  closeMenu();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
