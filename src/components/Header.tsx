
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

// Mock data for categories
const CATEGORIES = [
  {
    id: 1,
    name: "Home Decor",
    subcategories: [
      { id: 1, name: "Wall Art" },
      { id: 2, name: "Planters" },
      { id: 3, name: "Lighting" }
    ]
  },
  {
    id: 2,
    name: "Miniatures",
    subcategories: [
      { id: 4, name: "Vehicles" },
      { id: 5, name: "Figurines" },
      { id: 6, name: "Landmarks" }
    ]
  },
  {
    id: 3,
    name: "Tech Gadgets",
    subcategories: [
      { id: 7, name: "Phone Stands" },
      { id: 8, name: "Cable Organizers" },
      { id: 9, name: "Key Holders" }
    ]
  },
  {
    id: 4,
    name: "Seasonal Collections",
    subcategories: [
      { id: 10, name: "Diwali Specials" },
      { id: 11, name: "Christmas Decor" },
      { id: 12, name: "Back-to-School" }
    ]
  },
  {
    id: 5,
    name: "Gifts & Custom",
    subcategories: [
      { id: 13, name: "Personalized Nameplates" },
      { id: 14, name: "Desk Accessories" }
    ]
  }
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-indigo text-white py-2 text-center text-sm">
        <p>Free shipping on orders above ₹599! Use code: FREESHIP</p>
      </div>
      
      {/* Main header */}
      <div className="container-avirva py-3">
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
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none text-sm w-40 lg:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            
            {/* Icons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 md:hidden" />
              </Button>
              <Link to="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none text-sm flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-500" />
            </div>
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
