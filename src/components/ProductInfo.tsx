
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
    <div onClick={onInfoClick} className="block cursor-pointer">
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
  );
};

export default ProductInfo;
