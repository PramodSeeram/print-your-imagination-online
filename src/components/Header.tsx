
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, User, ChevronDown, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from './Logo';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = () => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);
        const totalQuantity = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartItemCount(totalQuantity);
      } else {
        setCartItemCount(0);
      }
    };

    const loadWishlistItems = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
    };

    const loadAllProducts = () => {
      const storedProducts = localStorage.getItem('allProducts');
      if (storedProducts) {
        setAllProducts(JSON.parse(storedProducts));
      } else {
        setAllProducts([]);
      }
    };

    loadCartItems();
    loadWishlistItems();
    loadAllProducts();

    const handleCartUpdate = () => {
      loadCartItems();
    };

    const handleWishlistUpdate = () => {
      loadWishlistItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  const categories = [
    {
      name: 'Home Decor',
      id: 'home-decor',
      subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom']
    },
    {
      name: 'Miniatures',
      id: 'miniatures',
      subcategories: ['Furniture', 'Accessories', 'Figurines', 'Vehicles']
    },
    {
      name: 'Tech Gadgets',
      id: 'tech-gadgets',
      subcategories: ['Smart Home', 'Audio', 'Accessories', 'Gaming']
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    navigate(`/category/${categoryId}/subcategory/${subcategoryId.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white border-b">
        <div className="container-avirva">
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-xs sm:text-sm gap-2 sm:gap-0">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <span className="hidden sm:inline">📧 info@avirva.com</span>
              <span>📞 +91 12345 67890</span>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="flex items-center">
                <span className="mr-1 sm:mr-2">🇮🇳</span>
                <span>INR</span>
              </div>
              <span className="hidden sm:inline">Free shipping above ₹599</span>
              <span className="sm:hidden">Free shipping ₹599+</span>
              <div className="hidden md:flex space-x-3">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Twitter</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-avirva">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation with Hover Effects */}
          <nav className="hidden lg:flex items-center space-x-8 ml-8">
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors py-2"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.name}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Hover dropdown */}
                <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                        onClick={() => handleSubcategoryClick(category.id, subcategory)}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SearchBar allProducts={allProducts} className="w-full" />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search button - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 hover:text-black"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-black">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-black text-white">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-black">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-black text-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Profile */}
            <Link to="/account">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-black">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <SearchBar allProducts={allProducts} className="w-full" />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    className="block w-full text-left font-medium text-gray-700 hover:text-black py-2"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </button>
                  <div className="ml-4 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        className="block text-sm text-gray-600 hover:text-black py-1"
                        onClick={() => handleSubcategoryClick(category.id, subcategory)}
                      >
                        {subcategory}
                      </button>
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
