
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
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
}

const WishlistPage = () => {
  const [wishlistedItems, setWishlistedItems] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load wishlisted items from localStorage
    const loadWishlist = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      // For this example, we'll get product details from localStorage or mock data
      const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
      
      const items = wishlistIds.map((id: number) => {
        return allProducts.find((product: Product) => product.id === id) || null;
      }).filter(Boolean);
      
      setWishlistedItems(items);
    };
    
    loadWishlist();
    
    // Add event listener for wishlist updates
    window.addEventListener('wishlistUpdated', loadWishlist);
    
    // Cleanup
    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);
  
  const handleRemoveFromWishlist = (productId: number) => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = wishlistIds.filter((id: number) => id !== productId);
    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    setWishlistedItems(prev => prev.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from wishlist",
      description: "Product has been removed from your wishlist."
    });
    
    // Dispatch event for wishlist count update
    const event = new CustomEvent('wishlistUpdated');
    window.dispatchEvent(event);
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
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
    
    // Dispatch event for cart update
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
          </div>
          
          {wishlistedItems.length === 0 ? (
            <div className="bg-card rounded-lg shadow p-8 text-center">
              <Heart className="mx-auto h-16 w-16 text-muted mb-4" />
              <h2 className="text-xl font-medium mb-2 text-foreground">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add items you love to your wishlist. Review them anytime and easily move them to the cart.
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-primary hover:bg-primary/90"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedItems.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow bg-card text-card-foreground">
                  <div className="aspect-square relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">New</Badge>
                    )}
                    {product.isBestSeller && (
                      <Badge className="absolute top-2 left-[70px] bg-secondary text-secondary-foreground">Best Seller</Badge>
                    )}
                    <button 
                      className="absolute top-2 right-2 p-2 bg-background/80 dark:bg-background/50 rounded-full text-red-500"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 
                      className="font-medium text-foreground mb-2 cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="font-medium text-foreground">₹{product.offerPrice || product.price}</span>
                      {product.offerPrice && (
                        <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                      )}
                      {product.offerPrice && (
                        <span className="text-xs text-green-500 font-medium">
                          {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% off
                        </span>
                      )}
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 gap-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
