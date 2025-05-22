import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock cart data - in a real app this would come from a global state or context
const initialCartItems = [
  {
    id: 1,
    name: "Geometric Plant Holder",
    price: 599,
    quantity: 1,
    imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Cable Management System",
    price: 499,
    quantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1470350576089-539d5a852bf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  quantity: number;
  imageUrl: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    
    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem('cartItems');
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart));
      }
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + ((item.offerPrice || item.price) * item.quantity), 0);
  
  // Shipping is free above ₹599
  const shipping = subtotal >= 599 ? 0 : 99;
  
  // Total amount
  const total = subtotal + shipping;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Calculate and update total
    const newSubtotal = updatedCart.reduce((total, item) => total + ((item.offerPrice || item.price) * item.quantity), 0);
    localStorage.setItem('cartTotal', (newSubtotal + (newSubtotal >= 599 ? 0 : 99)).toString());
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Calculate and update total
    const newSubtotal = updatedCart.reduce((total, item) => total + ((item.offerPrice || item.price) * item.quantity), 0);
    localStorage.setItem('cartTotal', (newSubtotal + (newSubtotal >= 599 ? 0 : 99)).toString());
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before checkout",
      });
      return;
    }
    
    // Store cart data in localStorage for checkout page
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild className="bg-[#5D3FD3] hover:bg-[#4B32A5]">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-semibold text-lg">Cart Items ({cartItems.length})</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex p-6 gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Item #{item.id}</p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                              <button 
                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button 
                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <p className="font-medium text-gray-900 dark:text-gray-100">₹{(item.offerPrice || item.price) * item.quantity}</p>
                            
                            <button 
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow sticky top-24">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-semibold text-lg">Order Summary</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                        <span className="font-medium">₹{subtotal}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? "Free" : `₹${shipping}`}
                        </span>
                      </div>
                      
                      {shipping === 0 && (
                        <div className="text-green-600 dark:text-green-400 text-sm">
                          You've qualified for free shipping!
                        </div>
                      )}
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold">₹{total}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-[#5D3FD3] hover:bg-[#4B32A5] dark:bg-[#5D3FD3] dark:hover:bg-[#4B32A5]"
                      onClick={proceedToCheckout}
                    >
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-3"
                      asChild
                    >
                      <Link to="/">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
