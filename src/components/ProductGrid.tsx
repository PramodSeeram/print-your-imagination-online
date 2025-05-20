
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

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
  
  const handleAddToCart = (product: any, quantity: number = 1) => {
    if (onAddToCart) {
      // Create a copy of the product with quantity
      const productWithQuantity = {
        ...product,
        quantity
      };
      onAddToCart(productWithQuantity);
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
