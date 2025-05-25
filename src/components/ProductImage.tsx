
import React from 'react';
import { Heart } from 'lucide-react';

interface ProductImageProps {
  imageUrl: string;
  name: string;
  isWishlisted: boolean;
  onImageClick: () => void;
  onToggleWishlist: (e: React.MouseEvent) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  name,
  isWishlisted,
  onImageClick,
  onToggleWishlist
}) => {
  return (
    <div className="relative">
      <div onClick={onImageClick} className="block aspect-square cursor-pointer">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      
      <button 
        onClick={onToggleWishlist} 
        className={`absolute top-2 right-2 p-2 rounded-full transition-colors
          ${isWishlisted 
            ? 'bg-red-500 text-white' 
            : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600'}
          `}
      >
        <Heart className="h-4 w-4" fill={isWishlisted ? "#ef4444" : "none"} />
      </button>
    </div>
  );
};

export default ProductImage;
