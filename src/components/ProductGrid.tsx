
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  title?: string;
  products: Array<{
    id: number;
    name: string;
    price: number;
    offerPrice?: number;
    rating: number;
    imageUrl: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    keywords?: string[];
  }>;
  onAddToCart?: (product: any) => void;
  onToggleWishlist?: (productId: number) => void;
  wishlistedIds?: number[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title, 
  products, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistedIds = [] 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAddToCart = (product: any, quantity: number = 1) => {
    // Get existing cart items or initialize empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        offerPrice: product.offerPrice,
        quantity: quantity,
        imageUrl: product.imageUrl
      });
    }
    
    // Calculate cart total
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + ((item.offerPrice || item.price) * item.quantity), 0
    );
    
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
    
    // If parent component provided onAddToCart callback, call it too
    if (onAddToCart) {
      onAddToCart({...product, quantity});
    }
  };

  return (
    <div className="py-8">
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <Button 
            variant="link" 
            className="text-indigo-600 flex items-center"
            onClick={() => navigate(`/category/${title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product}
            onAddToCart={(quantity) => handleAddToCart(product, quantity)}
            onToggleWishlist={() => onToggleWishlist && onToggleWishlist(product.id)}
            isWishlisted={wishlistedIds.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
