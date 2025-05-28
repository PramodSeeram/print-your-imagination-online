
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Heart,
  Package,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
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
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
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
  const [showSearchDialog, setShowSearchDialog] = useState<boolean>(false);
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
    <header className="border-b bg-white border-stone-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-stone-900 text-white py-2 text-center text-sm">
        <p>Quick sale: 20% off products purchased today</p>
      </div>
      
      {/* Main Header */}
      <div className="container-avirva py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-playfair text-2xl md:text-3xl font-medium tracking-tight text-stone-900">
              AVIRVA
            </div>
          </Link>
          
          {/* Navigation - Desktop with Hover Effects */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home with Hover Menu */}
            <div className="relative group">
              <Link 
                to="/" 
                className="text-stone-600 hover:text-stone-900 font-medium py-2 transition-colors duration-200"
              >
                Home
              </Link>
              <div className="absolute top-full left-0 w-48 bg-white border border-stone-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/" className="block px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-stone-900">
                    Homepage
                  </Link>
                </div>
              </div>
            </div>

            {/* Shop with Hover Menu */}
            <div className="relative group">
              <span className="text-stone-600 hover:text-stone-900 font-medium py-2 cursor-pointer transition-colors duration-200">
                Shop
              </span>
              <div className="absolute top-full left-0 w-64 bg-white border border-stone-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {CATEGORIES.map(category => (
                    <div key={category.id} className="relative group/sub">
                      <div className="flex justify-between items-center px-4 py-2 hover:bg-stone-50 cursor-pointer text-stone-600">
                        <span>{category.name}</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <div className="absolute left-full top-0 w-48 bg-white border border-stone-200 rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                        <div className="py-2">
                          <Link to={`/category/${category.id}`} className="block px-4 py-2 font-medium text-stone-600 hover:bg-stone-50">
                            All {category.name}
                          </Link>
                          <div className="border-t border-stone-200 my-1"></div>
                          {category.subcategories.map(subcategory => (
                            <Link 
                              key={subcategory.id} 
                              to={`/category/${category.id}/subcategory/${subcategory.id}`}
                              className="block px-4 py-2 text-stone-600 hover:bg-stone-50"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product with Hover Menu */}
            <div className="relative group">
              <span className="text-stone-600 hover:text-stone-900 font-medium py-2 cursor-pointer transition-colors duration-200">
                Product
              </span>
              <div className="absolute top-full left-0 w-48 bg-white border border-stone-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/products" className="block px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-stone-900">
                    All Products
                  </Link>
                  <Link to="/new-arrivals" className="block px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-stone-900">
                    New Arrivals
                  </Link>
                  <Link to="/bestsellers" className="block px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-stone-900">
                    Best Sellers
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Right Side - Search, Language, Cart, Profile */}
          <div className="flex items-center space-x-4">
            {/* Language & Currency - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <img src="https://flagcdn.com/16x12/us.png" alt="USD" className="w-4 h-3" />
                <span className="text-stone-600">USD</span>
                <ChevronDown className="h-3 w-3 text-stone-400" />
              </div>
              <div className="flex items-center space-x-1 text-stone-600">
                <span>English</span>
                <ChevronDown className="h-3 w-3 text-stone-400" />
              </div>
            </div>

            {/* Search Icon */}
            <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-stone-600 hover:text-stone-900">
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl bg-white border-stone-200">
                <DialogHeader>
                  <DialogTitle className="text-stone-900 font-playfair">Search products</DialogTitle>
                  <DialogDescription className="text-stone-600">
                    Find the perfect product for your needs.
                  </DialogDescription>
                </DialogHeader>
                <SearchBar allProducts={PRODUCTS} className="w-full" />
              </DialogContent>
            </Dialog>
            
            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon" className="text-stone-600 hover:text-stone-900">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-stone-600 hover:text-stone-900">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Account */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-stone-600 hover:text-stone-900"
              onClick={() => navigate('/account')}
            >
              {isLoggedIn ? (
                <Avatar className="h-8 w-8 border border-stone-200">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                  <AvatarFallback className="bg-stone-100 text-stone-600">JD</AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5" />
              )}
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-stone-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 w-80 bg-white transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 overflow-y-auto h-full flex flex-col">
            {/* Close button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 text-stone-600"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </Button>
            
            {/* User Section */}
            <div className="py-6 border-b border-stone-200 mb-6">
              {isLoggedIn ? (
                <div 
                  className="flex items-center space-x-3 cursor-pointer" 
                  onClick={() => {
                    navigate('/account');
                    closeMenu();
                  }}
                >
                  <Avatar className="border border-stone-200">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                    <AvatarFallback className="bg-stone-100 text-stone-600">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-stone-900">John Doe</p>
                    <p className="text-sm text-stone-500">john.doe@example.com</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button 
                    className="bg-stone-900 hover:bg-stone-800 text-white rounded-full"
                    onClick={() => {
                      navigate('/account');
                      closeMenu();
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-stone-300 text-stone-600 hover:bg-stone-50 rounded-full"
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
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="block text-stone-900 font-medium py-2 text-lg"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <div className="text-stone-900 font-medium py-2 text-lg">Shop</div>
                  <ul className="ml-4 mt-2 space-y-2">
                    {CATEGORIES.map(category => (
                      <li key={category.id}>
                        <Link
                          to={`/category/${category.id}`}
                          onClick={closeMenu}
                          className="block text-stone-600 hover:text-stone-900 py-1"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-stone-900 font-medium py-2 text-lg">Product</div>
                </li>
              </ul>
              
              <div className="border-t border-stone-200 my-6 pt-6">
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/cart"
                      onClick={closeMenu}
                      className="flex items-center justify-between text-stone-600 hover:text-stone-900 py-2"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-3" />
                        <span>Cart</span>
                      </div>
                      {cartCount > 0 && (
                        <Badge className="bg-stone-900 text-white">{cartCount}</Badge>
                      )}
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      to="/wishlist"
                      onClick={closeMenu}
                      className="flex items-center justify-between text-stone-600 hover:text-stone-900 py-2"
                    >
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 mr-3" />
                        <span>Wishlist</span>
                      </div>
                      {wishlistCount > 0 && (
                        <Badge className="bg-stone-900 text-white">{wishlistCount}</Badge>
                      )}
                    </Link>
                  </li>

                  {isLoggedIn && (
                    <li>
                      <Link
                        to="/orders"
                        onClick={closeMenu}
                        className="flex items-center text-stone-600 hover:text-stone-900 py-2"
                      >
                        <Package className="h-5 w-5 mr-3" />
                        <span>My Orders</span>
                      </Link>
                    </li>
                  )}
                  
                  <li>
                    <Link
                      to="/tickets"
                      onClick={closeMenu}
                      className="flex items-center text-stone-600 hover:text-stone-900 py-2"
                    >
                      <MessageSquare className="h-5 w-5 mr-3" />
                      <span>Support</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            
            {/* Logout Button */}
            {isLoggedIn && (
              <Button 
                variant="outline" 
                className="w-full mt-4 border-stone-300 text-stone-600 hover:bg-stone-50 rounded-full"
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
