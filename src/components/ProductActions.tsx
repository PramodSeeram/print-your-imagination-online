
import React from 'react';
import { Button } from '@/components/ui/button';
import QuantityControls from './QuantityControls';

interface ProductActionsProps {
  showQuantityControls: boolean;
  quantity: number;
  onInitialAddToCart: (e: React.MouseEvent) => void;
  onIncreaseQuantity: (e: React.MouseEvent) => void;
  onDecreaseQuantity: (e: React.MouseEvent) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  showQuantityControls,
  quantity,
  onInitialAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity
}) => {
  return (
    <>
      {!showQuantityControls ? (
        <Button 
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2"
          onClick={onInitialAddToCart}
        >
          Add to Cart
        </Button>
      ) : (
        <QuantityControls
          quantity={quantity}
          onIncrease={onIncreaseQuantity}
          onDecrease={onDecreaseQuantity}
        />
      )}
    </>
  );
};

export default ProductActions;
