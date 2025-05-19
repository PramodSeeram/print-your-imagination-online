
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  offerPrice,
  rating,
  imageUrl,
  isNew,
  isBestSeller
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow card-hover">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-64 object-cover"
          />
        </Link>
        
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="badge-primary">New</span>
          )}
          {isBestSeller && (
            <span className="badge-accent">Best Seller</span>
          )}
        </div>
        
        <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-lg text-gray-800 hover:text-teal transition-colors mb-1">{name}</h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{rating}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {offerPrice ? (
              <>
                <span className="font-semibold text-lg">₹{offerPrice}</span>
                <span className="text-gray-400 line-through text-sm">₹{price}</span>
              </>
            ) : (
              <span className="font-semibold text-lg">₹{price}</span>
            )}
          </div>
          
          <Button className="bg-teal hover:bg-teal-600">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
