
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
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
  const [popoverOpen, setPopoverOpen] = useState(false);
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
    if (onAddToCart) {
      onAddToCart(quantity);
      setQuantity(1); // Reset quantity after adding to cart
      setPopoverOpen(false); // Close popover after adding to cart
    }
  };

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(1); // Add 1 item quickly without opening popover
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist();
      
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
    <div className="group bg-card dark:bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div onClick={handleProductClick} className="block aspect-square cursor-pointer">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          {isBestSeller && <Badge className="bg-secondary text-secondary-foreground">Best Seller</Badge>}
        </div>
        
        {/* Wishlist button */}
        <button onClick={handleToggleWishlist} 
          className={`absolute top-2 right-2 p-2 rounded-full 
            ${isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-background/80 dark:bg-background/50 text-foreground hover:bg-muted'}
            transition-colors`}>
          <Heart className="h-4 w-4" fill={isWishlisted ? "#ef4444" : "none"} />
        </button>
      </div>
      
      <div className="p-4">
        <div onClick={handleProductClick} className="block cursor-pointer">
          <h3 className="font-medium text-foreground mb-1 line-clamp-2">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" />
              <span className="text-sm text-foreground/80">{rating}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-medium text-foreground">₹{offerPrice || price}</span>
            {offerPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground line-through">₹{price}</span>
                <span className="text-xs text-green-500 font-medium">
                  {Math.round((price - offerPrice) / price * 100)}% off
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="default" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}>
                <span>Add to Cart</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-48 p-0 bg-card text-foreground" align="center">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Select Quantity</span>
                </div>
                <div className="flex items-center justify-between border border-border rounded-md mb-3">
                  <button className="py-2 px-3 text-foreground hover:bg-muted" onClick={handleDecreaseQuantity}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-medium">{quantity}</span>
                  <button className="py-2 px-3 text-foreground hover:bg-muted" onClick={handleIncreaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-xs text-muted-foreground mb-3 text-center">
                  Total: ₹{(offerPrice || price) * quantity}
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Quick add button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-background dark:bg-transparent border-primary hover:bg-primary/10"
            onClick={handleQuickAddToCart}
          >
            <ShoppingCart className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
