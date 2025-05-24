
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { useToast } from "@/hooks/use-toast";
import { MoveLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  keywords?: string[];
  category?: string;
}

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get search results from session storage or use empty array
    const storedResults = sessionStorage.getItem('searchResults');
    if (storedResults) {
      const results = JSON.parse(storedResults);
      setSearchResults(results);
      setFilteredResults(results);
      
      // Extract unique categories for filtering
      const uniqueCategories = Array.from(
        new Set(results.map((product: Product) => product.category).filter(Boolean))
      );
      setCategoryFilters(uniqueCategories as string[]);
    }

    // Get wishlisted items from localStorage
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistedIds(JSON.parse(storedWishlist));
    }
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      const updatedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistedIds(updatedWishlist);
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [searchQuery]);

  const handleFilterByCategory = (category: string) => {
    if (category === 'all') {
      setFilteredResults(searchResults);
    } else {
      setFilteredResults(searchResults.filter(product => product.category === category));
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1
      });
    }
    
    // Calculate cart total
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + ((item.offerPrice || item.price) * item.quantity), 0
    );
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());
    
    // Dispatch event to update cart count in header
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleToggleWishlist = (productId: number) => {
    const currentWishlist = [...wishlistedIds];
    const index = currentWishlist.indexOf(productId);
    
    if (index !== -1) {
      // Remove from wishlist
      currentWishlist.splice(index, 1);
      toast({
        title: "Removed from wishlist",
        description: "Product has been removed from your wishlist."
      });
    } else {
      // Add to wishlist
      currentWishlist.push(productId);
      toast({
        title: "Added to wishlist",
        description: "Product has been added to your wishlist."
      });
    }
    
    setWishlistedIds(currentWishlist);
    localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
    
    // Dispatch event for wishlist count update
    const event = new CustomEvent('wishlistUpdated');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in-up">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          {/* Back button and search header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <Button 
                variant="ghost" 
                className="mb-2 text-primary hover:text-primary/80 hover:bg-primary/10 -ml-2"
                onClick={() => navigate(-1)}
              >
                <MoveLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Search results for: <span className="text-primary">"{searchQuery}"</span>
              </h1>
            </div>
            
            {/* Category filters */}
            {categoryFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 animate-fade-in-up animate-delayed-1">
                <Button 
                  variant="outline" 
                  className="bg-primary/10 hover:bg-primary/20 border-primary/30"
                  onClick={() => handleFilterByCategory('all')}
                >
                  All Results
                </Button>
                {categoryFilters.map(category => (
                  <Button 
                    key={category} 
                    variant="outline" 
                    className="bg-primary/10 hover:bg-primary/20 border-primary/30"
                    onClick={() => handleFilterByCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          {filteredResults.length === 0 ? (
            <div className="bg-card rounded-lg shadow p-8 text-center animate-fade-in-up animate-delayed-1">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-medium mb-2 text-foreground">No products found</h2>
              <p className="text-muted-foreground">
                We couldn't find any products matching your search query.
                Try using different keywords or browsing our categories.
              </p>
              <Button 
                className="mt-4 bg-primary hover:bg-primary/90" 
                onClick={() => navigate('/')}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6 animate-fade-in-up animate-delayed-1">
                Found {filteredResults.length} product{filteredResults.length !== 1 ? 's' : ''}
              </p>
              <ProductGrid 
                products={filteredResults}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistedIds={wishlistedIds}
              />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
