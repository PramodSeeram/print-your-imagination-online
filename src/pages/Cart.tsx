
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  quantity: number;
  imageUrl: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  imageUrl: string;
  rating: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock suggestions - people also bought
  const suggestions = [
    {
      id: 101,
      name: "Desk Organizer Set",
      price: 899,
      offerPrice: 699,
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
      rating: 4.5
    },
    {
      id: 102,
      name: "LED Strip Lights",
      price: 1299,
      offerPrice: 999,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&q=80",
      rating: 4.3
    }
  ];

  // Load cart items and wishlist from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    };

    const loadWishlistItems = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
      
      const wishlistProducts = allProducts.filter((product: any) => 
        wishlistIds.includes(product.id)
      );
      setWishlistItems(wishlistProducts.slice(0, 3)); // Show only 3 items
    };
    
    loadCartItems();
    loadWishlistItems();
    
    // Listen for cart updates
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

  const addToCartFromWishlist = (item: WishlistItem) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        ...item,
        quantity: 1
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`
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
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          <h1 className="text-3xl font-bold mb-6 text-slate-100">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium text-slate-300 mb-4">Your cart is empty</h2>
              <p className="text-slate-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800 rounded-lg shadow border border-slate-700">
                  <div className="p-6 border-b border-slate-700">
                    <h2 className="font-semibold text-lg text-slate-100">Cart Items ({cartItems.length})</h2>
                  </div>
                  
                  <div className="divide-y divide-slate-700">
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
                          <h3 className="font-medium text-slate-100">{item.name}</h3>
                          <p className="text-slate-400 text-sm mb-2">Item #{item.id}</p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-slate-600 rounded">
                              <button 
                                className="px-3 py-1 text-slate-300 hover:bg-slate-700"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 text-slate-100">{item.quantity}</span>
                              <button 
                                className="px-3 py-1 text-slate-300 hover:bg-slate-700"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <p className="font-medium text-slate-100">₹{(item.offerPrice || item.price) * item.quantity}</p>
                            
                            <button 
                              className="text-slate-400 hover:text-red-400 transition-colors"
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

                {/* People Also Bought */}
                <div className="bg-slate-800 rounded-lg shadow border border-slate-700">
                  <div className="p-6 border-b border-slate-700">
                    <h2 className="font-semibold text-lg text-slate-100">People Also Bought</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {suggestions.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-slate-700 rounded-lg">
                          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-grow">
                            <h4 className="font-medium text-slate-100 text-sm">{item.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-emerald-400 font-medium">₹{item.offerPrice}</span>
                              <span className="text-slate-400 text-sm line-through">₹{item.price}</span>
                            </div>
                            <Button 
                              size="sm" 
                              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-xs"
                              onClick={() => addToCartFromWishlist(item)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* From Your Wishlist */}
                {wishlistItems.length > 0 && (
                  <div className="bg-slate-800 rounded-lg shadow border border-slate-700">
                    <div className="p-6 border-b border-slate-700">
                      <h2 className="font-semibold text-lg text-slate-100 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-400" />
                        From Your Wishlist
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="flex flex-col gap-3 p-3 bg-slate-700 rounded-lg">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-24 object-cover rounded" />
                            <div>
                              <h4 className="font-medium text-slate-100 text-sm">{item.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-emerald-400 font-medium">₹{item.offerPrice || item.price}</span>
                                {item.offerPrice && (
                                  <span className="text-slate-400 text-sm line-through">₹{item.price}</span>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-xs"
                                onClick={() => addToCartFromWishlist(item)}
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800 rounded-lg shadow sticky top-24 border border-slate-700">
                  <div className="p-6 border-b border-slate-700">
                    <h2 className="font-semibold text-lg text-slate-100">Order Summary</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Subtotal</span>
                        <span className="font-medium text-slate-100">₹{subtotal}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-300">Shipping</span>
                        <span className="font-medium text-slate-100">
                          {shipping === 0 ? "Free" : `₹${shipping}`}
                        </span>
                      </div>
                      
                      {shipping === 0 && (
                        <div className="text-green-400 text-sm">
                          You've qualified for free shipping!
                        </div>
                      )}
                      
                      <div className="border-t border-slate-700 pt-4 mt-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-100">Total</span>
                          <span className="font-semibold text-slate-100">₹{total}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
                      onClick={proceedToCheckout}
                    >
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-slate-600 text-slate-300 hover:bg-slate-700"
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
