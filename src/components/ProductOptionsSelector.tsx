
import React from 'react';

interface ProductOptionsSelectorProps {
  onSizeSelect?: (size: string) => void;
  onColorSelect?: (color: string) => void;
  selectedSize?: string;
  selectedColor?: string;
}

const ProductOptionsSelector: React.FC<ProductOptionsSelectorProps> = ({
  onSizeSelect,
  onColorSelect,
  selectedSize,
  selectedColor
}) => {
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Gray', 'Brown'];

  return (
    <div className="space-y-4">
      {/* Size Selection */}
      <div>
        <h4 className="text-sm font-medium text-black mb-2">Size</h4>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect?.(size)}
              className={`w-10 h-10 border border-gray-300 rounded text-sm font-medium transition-colors ${
                selectedSize === size
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h4 className="text-sm font-medium text-black mb-2">Color</h4>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorSelect?.(color)}
              className={`px-3 py-1 border border-gray-300 rounded text-xs font-medium transition-colors ${
                selectedColor === color
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black hover:border-black'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOptionsSelector;
