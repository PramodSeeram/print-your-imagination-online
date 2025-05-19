
import React from 'react';
import ProductCard from './ProductCard';

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

interface ProductGridProps {
  products: Product[];
  title?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: number) => void;
  wishlistedIds?: number[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  onAddToCart, 
  onToggleWishlist,
  wishlistedIds = []
}) => {
  return (
    <section className="py-8">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            onAddToCart={() => onAddToCart && onAddToCart(product)}
            onToggleWishlist={() => onToggleWishlist && onToggleWishlist(product.id)}
            isWishlisted={wishlistedIds.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
