
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Trash2, ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  viewedAt: string;
}

const BrowsingHistoryPage = () => {
  const [historyItems, setHistoryItems] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load browsing history from localStorage
    const loadHistory = () => {
      const history = JSON.parse(localStorage.getItem('browsingHistory') || '[]');
      
      // Sort by most recently viewed
      history.sort((a: Product, b: Product) => {
        return new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime();
      });
      
      setHistoryItems(history);
    };
    
    loadHistory();
  }, []);
  
  const clearBrowsingHistory = () => {
    localStorage.setItem('browsingHistory', JSON.stringify([]));
    setHistoryItems([]);
    
    toast({
      title: "Browsing history cleared",
      description: "Your browsing history has been cleared successfully."
    });
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
  };
  
  // Function to format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Browsing History</h1>
            {historyItems.length > 0 && (
              <Button 
                variant="outline"
                onClick={clearBrowsingHistory}
              >
                Clear History
              </Button>
            )}
          </div>
          
          {historyItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <Clock className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h2 className="text-xl font-medium mb-2">No browsing history</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Products you view will appear here so you can easily find them again.
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {historyItems.map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div 
                      className="aspect-square cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 
                        className="font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        {product.name}
                      </h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Viewed on {formatDate(product.viewedAt)}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-medium text-gray-900 dark:text-white">₹{product.offerPrice || product.price}</span>
                        {product.offerPrice && (
                          <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                        )}
                      </div>
                      <Button 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowsingHistoryPage;
