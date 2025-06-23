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
      name: 'HOME',
      id: 'home-decor',
      subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom']
    },
    {
      name: 'PRODUCT',
      id: 'tech-gadgets',
      subcategories: ['Smart Home', 'Audio', 'Accessories', 'Gaming']
    },
    {
      name: 'SHOP',
      id: 'miniatures',
      subcategories: ['Furniture', 'Accessories', 'Figurines', 'Vehicles']
    },
    {
      name: 'BLOG',
      id: 'blog',
      subcategories: ['Latest Posts', 'Beauty Tips', 'Tutorials', 'Reviews']
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    navigate(`/category/${categoryId}/subcategory/${subcategoryId.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <header className="bg-background sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-muted border-b border-border">
        <div className="container-avirva">
          <div className="flex justify-center items-center py-2">
            <span className="text-sm text-muted-foreground">Free shipping on all U.S. orders $50+</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background border-b border-border">
        <div className="container-avirva">
          <div className="flex items-center justify-between py-3">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 flex-1">
              {categories.slice(0, 2).map((category) => (
                <div key={category.id} className="relative group">
                  <button
                    className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-1 font-medium tracking-wide text-sm"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </button>
                  
                  {/* Hover dropdown */}
                  <div className="absolute left-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          className="block w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
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

            {/* Center Logo */}
            <div className="flex justify-center flex-1">
              <div className="text-center">
                <Link to="/" className="block">
                  <div className="font-playfair text-xl font-bold tracking-wider text-foreground">
                    GLOWING
                  </div>
                  <div className="text-xs tracking-[0.2em] text-muted-foreground font-medium">
                    BEAUTY STORE
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 flex-1 justify-center">
              {categories.slice(2).map((category) => (
                <div key={category.id} className="relative group">
                  <button
                    className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-1 font-medium tracking-wide text-sm"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </button>
                  
                  {/* Hover dropdown */}
                  <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          className="block w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
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

            {/* Right side actions - Fixed positioning */}
            <div className="flex items-center space-x-2 flex-1 justify-end">
              {/* Search button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary h-8 w-8 shrink-0"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary h-8 w-8 shrink-0">
                  <Heart className="h-4 w-4" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs bg-primary text-primary-foreground rounded-full">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary h-8 w-8 shrink-0">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs bg-foreground text-background rounded-full">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Profile */}
              <Link to="/account">
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary h-8 w-8 shrink-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground hover:text-primary h-8 w-8 shrink-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="pb-4">
              <SearchBar allProducts={allProducts} className="w-full" />
            </div>
          )}

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border py-4">
              <nav className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      className="block w-full text-left font-medium text-foreground hover:text-primary py-2 tracking-wide"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </button>
                    <div className="ml-4 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          className="block text-sm text-muted-foreground hover:text-primary py-1"
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
      </div>
    </header>
  );
};

export default Header;
