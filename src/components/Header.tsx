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
  MessageSquare
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

// Mock products for initial search state with required Product properties
const PRODUCTS = [
  { id: 1, name: "Geometric Plant Holder", category: "Home Decor", price: 1299, rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1614955849439-67066da241ca?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Wall Mounted Shelf", category: "Home Decor", price: 999, rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Desk Lamp", category: "Home Decor", price: 799, rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "Miniature Car", category: "Miniatures", price: 599, rating: 4.7, imageUrl: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=300&q=80" },
  { id: 5, name: "Phone Stand", category: "Tech Gadgets", price: 499, rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7?auto=format&fit=crop&w=300&q=80" },
  { id: 6, name: "Cable Organizer", category: "Tech Gadgets", price: 299, rating: 4.1, imageUrl: "https://images.unsplash.com/photo-1533654975975-a3d977c294f1?auto=format&fit=crop&w=300&q=80" },
  { id: 7, name: "Wall Art Panels", category: "Home Decor", price: 1499, rating: 4.8, imageUrl: "https://images.unsplash.com/photo-1545304787-d9d3229f4e3a?auto=format&fit=crop&w=300&q=80" },
  { id: 8, name: "Desk Organizer", category: "Tech Gadgets", price: 699, rating: 4.4, imageUrl: "https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=300&q=80" }
];

const Header = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

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

  return (
    <header className="border-b bg-slate-900 border-slate-700">
      {/* Top Bar */}
      <div className="bg-emerald-700 text-white py-2 text-center text-sm">
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
                <Button variant="ghost" className="flex items-center space-x-1 text-slate-300 hover:text-emerald-400 hover:bg-slate-800">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-slate-800 border-slate-700">
                {CATEGORIES.map(category => (
                  <DropdownMenu key={category.id}>
                    <DropdownMenuTrigger className="w-full flex justify-between items-center px-4 py-2 hover:bg-slate-700 cursor-pointer text-slate-300">
                      <span>{category.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" className="bg-slate-800 border-slate-700">
                      <Link to={`/category/${category.id}`}>
                        <DropdownMenuItem className="font-medium text-slate-300 hover:bg-slate-700">
                          All {category.name}
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      {category.subcategories.map(subcategory => (
                        <Link 
                          key={subcategory.id} 
                          to={`/category/${category.id}/subcategory/${subcategory.id}`}
                        >
                          <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">{subcategory.name}</DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/tickets">
              <Button variant="ghost" className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800">Support</Button>
            </Link>

            <Link to="/collections">
              <Button variant="ghost" className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800">Collections</Button>
            </Link>
            
            {isLoggedIn && (
              <Link to="/orders">
                <Button variant="ghost" className="flex items-center text-slate-300 hover:text-emerald-400 hover:bg-slate-800">
                  <Package className="h-4 w-4 mr-1" />
                  <span>Orders</span>
                </Button>
              </Link>
            )}
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-slate-300">
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Search products</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Find the perfect 3D printed product for your needs.
                  </DialogDescription>
                </DialogHeader>
                <SearchBar allProducts={PRODUCTS} className="w-full" />
              </DialogContent>
            </Dialog>
            
            {/* Wishlist - Fixed navigation to wishlist page */}
            <Link to="/wishlist" className="relative hidden sm:flex">
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800">
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
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Account - Make sure it navigates to account page */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hidden sm:flex text-slate-300 hover:text-emerald-400 hover:bg-slate-800"
              onClick={() => navigate('/account')}
            >
              {isLoggedIn ? (
                <Avatar className="h-8 w-8 border border-slate-600">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                  <AvatarFallback className="bg-slate-700 text-slate-300">JD</AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5" />
              )}
              {isLoggedIn && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 border-2 border-slate-800 w-3 h-3 rounded-full"></span>
              )}
            </Button>
            
            {/* Mobile menu button - only show on mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-slate-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search - only show on mobile BELOW header */}
        <div className="mt-4 mb-2 md:hidden">
          <SearchBar allProducts={PRODUCTS} className="w-full" />
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 w-64 bg-slate-900 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 overflow-y-auto h-full flex flex-col">
            {/* Close button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 text-slate-300"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </Button>
            
            {/* User Section */}
            <div className="py-4 border-b border-slate-700 mb-4">
              {isLoggedIn ? (
                <div 
                  className="flex items-center space-x-3 cursor-pointer" 
                  onClick={() => {
                    navigate('/account');
                    closeMenu();
                  }}
                >
                  <Avatar className="border border-slate-600">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                    <AvatarFallback className="bg-slate-700 text-slate-300">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-100">John Doe</p>
                    <p className="text-xs text-slate-400">john.doe@example.com</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      navigate('/account');
                      closeMenu();
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
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
              <p className="text-sm font-medium text-slate-400 mb-2">Shop By Category</p>
              <ul className="space-y-1">
                {CATEGORIES.map(category => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      onClick={closeMenu}
                      className="block text-slate-300 hover:bg-slate-800 rounded-md px-3 py-2"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-slate-700 my-4"></div>
              
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/cart"
                    onClick={closeMenu}
                    className="block text-slate-300 hover:bg-slate-800 rounded-md px-3 py-2 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      <span>Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <Badge className="bg-emerald-600">{cartCount}</Badge>
                    )}
                  </Link>
                </li>
                
                <li>
                  <Link
                    to="/wishlist"
                    onClick={closeMenu}
                    className="block text-slate-300 hover:bg-slate-800 rounded-md px-3 py-2 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      <span>Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <Badge className="bg-emerald-600">{wishlistCount}</Badge>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/browsing-history"
                    onClick={closeMenu}
                    className="block text-slate-300 hover:bg-slate-800 rounded-md px-3 py-2 flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Browsing History</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/collections"
                    onClick={closeMenu}
                    className="block text-slate-300 hover:bg-slate-800 rounded-md px-3 py-2 flex items-center"
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
                      className="block text-slate-300 hover:bg-slate-800 rounded-md px-3 py-2 flex items-center"
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
                    className="block text-slate-300 hover:bg-slate-800 rounded-md px-3 py-2 flex items-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Support</span>
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Logout Button */}
            {isLoggedIn && (
              <Button 
                variant="outline" 
                className="w-full mt-4 border-slate-600 text-slate-300 hover:bg-slate-800"
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
