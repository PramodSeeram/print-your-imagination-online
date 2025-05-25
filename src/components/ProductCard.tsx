
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  onAddToCart?: (quantity: number) => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  offerPrice,
  rating,
  imageUrl,
  isNew,
  isBestSeller,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({
        id,
        name,
        price,
        offerPrice,
        rating,
        imageUrl,
        isNew,
        isBestSeller,
        quantity
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
      description: `${name} has been added to your cart.`,
    });
    
    if (onAddToCart) {
      onAddToCart(quantity);
    }
    
    setShowQuantityControls(true);
  };

  const handleInitialAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart with quantity 1 first
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        id,
        name,
        price,
        offerPrice,
        rating,
        imageUrl,
        isNew,
        isBestSeller,
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
      description: `${name} has been added to your cart.`,
    });
    
    if (onAddToCart) {
      onAddToCart(1);
    }
    
    setShowQuantityControls(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist();
      
      // Get the product details
      const product = {
        id,
        name,
        price,
        offerPrice,
        rating,
        imageUrl,
        isNew,
        isBestSeller
      };
      
      // Get current wishlist
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const productIndex = wishlist.indexOf(id);
      
      // Update allProducts in localStorage for wishlist page
      const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
      const existingProduct = allProducts.find((p: any) => p.id === id);
      
      if (!existingProduct) {
        allProducts.push(product);
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
      }
      
      // Dispatch event for wishlist count update
      const event = new CustomEvent('wishlistUpdated');
      window.dispatchEvent(event);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);

    // Add to browsing history
    const timestamp = new Date().toISOString();
    const historyItem = {
      id,
      name,
      price,
      offerPrice,
      rating,
      imageUrl,
      viewedAt: timestamp
    };
    const browsingHistory = JSON.parse(localStorage.getItem('browsingHistory') || '[]');

    // Remove existing entry for this product if it exists
    const filteredHistory = browsingHistory.filter((item: any) => item.id !== id);

    // Add this item as the most recent
    filteredHistory.unshift(historyItem);

    // Limit history to 20 items
    const limitedHistory = filteredHistory.slice(0, 20);
    localStorage.setItem('browsingHistory', JSON.stringify(limitedHistory));
  };

  return (
    <div className="group bg-slate-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-slate-700">
      <div className="relative">
        <div onClick={handleProductClick} className="block aspect-square cursor-pointer">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {isNew && <Badge className="bg-emerald-600 text-white">New</Badge>}
          {isBestSeller && <Badge className="bg-amber-600 text-white">Best Seller</Badge>}
        </div>
        
        {/* Wishlist button */}
        <button onClick={handleToggleWishlist} 
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors
            ${isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600'}
            `}>
          <Heart className="h-4 w-4" fill={isWishlisted ? "#ef4444" : "none"} />
        </button>
      </div>
      
      <div className="p-4">
        <div onClick={handleProductClick} className="block cursor-pointer">
          <h3 className="font-medium text-slate-100 mb-1 line-clamp-2">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" />
              <span className="text-sm text-slate-300">{rating}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-medium text-slate-100">₹{offerPrice || price}</span>
            {offerPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-400 line-through">₹{price}</span>
                <span className="text-xs text-green-400 font-medium">
                  {Math.round((price - offerPrice) / price * 100)}% off
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Add to Cart Button or Quantity Controls */}
        {!showQuantityControls ? (
          <Button 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2"
            onClick={handleInitialAddToCart}>
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-slate-600 rounded-md flex-1">
              <button 
                onClick={handleDecreaseQuantity}
                className="py-2 px-3 text-slate-300 hover:bg-slate-700 rounded-l-md"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="py-2 px-4 bg-slate-700 text-slate-100 font-medium text-center flex-1">
                {quantity}
              </div>
              <button 
                onClick={handleIncreaseQuantity}
                className="py-2 px-3 text-slate-300 hover:bg-slate-700 rounded-r-md"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4"
              onClick={handleAddToCart}
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
