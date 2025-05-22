
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { useToast } from "@/hooks/use-toast";

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
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get search results from session storage or use empty array
    const storedResults = sessionStorage.getItem('searchResults');
    if (storedResults) {
      setSearchResults(JSON.parse(storedResults));
    }

    // Get wishlisted items from localStorage
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistedIds(JSON.parse(storedWishlist));
    }
  }, [searchQuery]);

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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          <h1 className="text-2xl font-bold mb-6">
            Search results for: <span className="text-[#5D3FD3]">"{searchQuery}"</span>
          </h1>
          
          {searchResults.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-gray-500">
                We couldn't find any products matching your search query.
                Try using different keywords or browsing our categories.
              </p>
            </div>
          ) : (
            <ProductGrid 
              products={searchResults}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistedIds={wishlistedIds}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
