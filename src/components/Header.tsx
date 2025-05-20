
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X, Ticket, ChevronDown, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  },
  {
    id: "4",
    name: "Seasonal Collections",
    subcategories: [
      { id: "401", name: "Diwali Specials" },
      { id: "402", name: "Christmas Decor" },
      { id: "403", name: "Back-to-School" }
    ]
  },
  {
    id: "5",
    name: "Gifts & Custom",
    subcategories: [
      { id: "501", name: "Personalized Nameplates" },
      { id: "502", name: "Desk Accessories" }
    ]
  }
];

// Mock products for search
const PRODUCTS = [
  {
    id: 1,
    name: "Geometric Plant Holder",
    category: "Home Decor",
    subcategory: "Planters",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Wall Mounted Shelf",
    category: "Home Decor",
    subcategory: "Wall Art",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Desk Lamp",
    category: "Home Decor",
    subcategory: "Lighting",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Miniature Car",
    category: "Miniatures",
    subcategory: "Vehicles",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Phone Stand",
    category: "Tech Gadgets",
    subcategory: "Phone Stands",
    price: 399,
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  }
];

// Recent popular searches
const POPULAR_SEARCHES = [
  "Plant holder",
  "Desk accessories",
  "Wall art",
  "Miniature figurines",
  "Phone stand"
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load cart items count from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      const items = JSON.parse(storedItems);
      setCartItemCount(items.length);
    }
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedItems = localStorage.getItem('cartItems');
      if (updatedItems) {
        const items = JSON.parse(updatedItems);
        setCartItemCount(items.length);
      } else {
        setCartItemCount(0);
      }
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      // Search in products
      const filtered = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filtered);
      
      // Generate suggestions based on query (product names, categories, subcategories)
      const allNames = PRODUCTS.map(p => p.name);
      const allCategories = CATEGORIES.map(c => c.name);
      const allSubcategories = CATEGORIES.flatMap(c => c.subcategories.map(sc => sc.name));
      
      const allOptions = [...allNames, ...allCategories, ...allSubcategories];
      
      const suggestions = allOptions
        .filter(option => 
          option.toLowerCase().includes(searchQuery.toLowerCase()) &&
          option.toLowerCase() !== searchQuery.toLowerCase()
        )
        .slice(0, 5);
      
      setSearchSuggestions(suggestions);
      setShowSearchResults(true);
    } else {
      setSearchSuggestions([]);
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results page with query
      setShowSearchResults(false);
      // Navigate to a search page (not implemented in this example)
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchItemClick = (productId: number) => {
    setShowSearchResults(false);
    setSearchQuery("");
    // Navigate to product page (not fully implemented in this example)
    // navigate(`/product/${productId}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const toggleMobileSearch = () => {
    setSearchMode(!searchMode);
    if (!searchMode) {
      setTimeout(() => {
        document.getElementById('mobileSearchInput')?.focus();
      }, 100);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-indigo text-white py-2 text-center text-sm">
        <p>Free shipping on orders above ₹599! Use code: FREESHIP</p>
      </div>
      
      {/* Main header */}
      <div className="container-avirva py-3">
        {searchMode ? (
          <div className="md:hidden mb-2">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                id="mobileSearchInput"
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="button" 
                variant="ghost"
                size="sm"
                onClick={toggleMobileSearch}
              >
                Cancel
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-8">
              <button 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <Logo />
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                {CATEGORIES.map(category => (
                  <div key={category.id} className="group relative">
                    <Link 
                      to={`/category/${category.id}`}
                      className="font-medium text-gray-800 hover:text-teal transition-colors py-2"
                    >
                      {category.name}
                    </Link>
                    {category.subcategories.length > 0 && (
                      <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md p-3 hidden group-hover:block animate-fade-in z-20">
                        <div className="grid gap-1">
                          {category.subcategories.map(sub => (
                            <Link 
                              key={sub.id}
                              to={`/category/${category.id}/subcategory/${sub.id}`}
                              className="text-gray-700 hover:text-teal hover:bg-gray-50 px-3 py-2 rounded-md transition-colors text-sm"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="bg-transparent border-none outline-none text-sm w-40 lg:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        if (searchQuery.trim().length >= 1) {
                          setShowSearchResults(true);
                        }
                      }}
                    />
                    <Button type="submit" variant="ghost" className="p-0 h-auto">
                      <Search className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </form>
                
                {/* Search Results Dropdown */}
                {showSearchResults && (
                  <div className="absolute top-full mt-1 bg-white rounded-md shadow-lg w-full lg:w-96 overflow-hidden z-30">
                    {/* Search query suggestions */}
                    {searchSuggestions.length > 0 && (
                      <div className="p-2 border-b">
                        <p className="text-xs text-gray-500 px-2 py-1">Suggested searches</p>
                        <div className="space-y-1">
                          {searchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className="flex items-center hover:bg-gray-50 rounded-md px-2 py-1.5 w-full text-left"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <Search className="h-3.5 w-3.5 text-gray-400 mr-2" />
                              <span className="text-sm">{suggestion}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Product results */}
                    {searchResults.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto">
                        {searchResults.map(product => (
                          <button
                            key={product.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 w-full text-left border-b"
                            onClick={() => handleSearchItemClick(product.id)}
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{product.name}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span>{product.category}</span>
                                <ChevronRight className="h-3 w-3" />
                                <span>{product.subcategory}</span>
                              </div>
                              <p className="text-sm">₹{product.price}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : searchQuery.trim().length > 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <p>No results found for "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="p-2 border-b">
                        <p className="text-xs text-gray-500 px-2 py-1">Popular searches</p>
                        <div className="space-y-1">
                          {POPULAR_SEARCHES.map((search, index) => (
                            <button
                              key={index}
                              className="flex items-center hover:bg-gray-50 rounded-md px-2 py-1.5 w-full text-left"
                              onClick={() => handleSuggestionClick(search)}
                            >
                              <Search className="h-3.5 w-3.5 text-gray-400 mr-2" />
                              <span className="text-sm">{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Icons */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleMobileSearch}
                  className="md:hidden"
                >
                  <Search className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <Link to="/account">
                      <DropdownMenuItem className="cursor-pointer">
                        Account
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/tickets">
                      <DropdownMenuItem className="cursor-pointer">
                        <Ticket className="h-4 w-4 mr-2" />
                        Support Tickets
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/admin">
                      <DropdownMenuItem className="cursor-pointer">
                        Admin Dashboard
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none text-sm flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" className="p-0 h-auto">
                <Search className="h-5 w-5 text-gray-500" />
              </Button>
            </form>
            <nav className="flex flex-col space-y-4">
              {CATEGORIES.map(category => (
                <div key={category.id} className="space-y-2">
                  <Link 
                    to={`/category/${category.id}`}
                    className="font-medium text-gray-800 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-1">
                    {category.subcategories.map(sub => (
                      <Link 
                        key={sub.id}
                        to={`/category/${category.id}/subcategory/${sub.id}`}
                        className="text-gray-600 block text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Link 
                  to="/tickets"
                  className="flex items-center text-gray-800 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Ticket className="h-5 w-5 mr-2" />
                  Support Tickets
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Add the Input component
const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`bg-transparent border-none outline-none text-sm ${className}`}
      {...props}
    />
  );
};

export default Header;
