
import React from 'react';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  rating: number;
  price: number;
  offerPrice?: number;
  onInfoClick: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  rating,
  price,
  offerPrice,
  onInfoClick
}) => {
  return (
    <div className="cursor-pointer" onClick={onInfoClick}>
      <h3 className="font-medium text-black mb-2 text-sm line-clamp-2 min-h-[2.5rem]">
        {name}
      </h3>
      
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating) 
                  ? 'fill-black text-black' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-black font-semibold">
          ₹{offerPrice || price}
        </span>
        {offerPrice && (
          <>
            <span className="text-gray-500 text-sm line-through">
              ₹{price}
            </span>
            <span className="text-green-600 text-xs font-medium">
              {Math.round(((price - offerPrice) / price) * 100)}% off
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
