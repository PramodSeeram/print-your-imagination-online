
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
  const materials = [
    { name: 'Sheesham Wood', selected: true },
    { name: 'Mango Wood', selected: false },
    { name: 'Recycled Wood', selected: false },
    { name: 'Teak Wood', selected: false }
  ];

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <h4 className="text-sm font-medium text-black mb-3">Color:</h4>
        <div className="flex gap-3">
          {[
            { name: 'Beige', color: '#D4B8A3' },
            { name: 'Brown', color: '#8B4513' },
            { name: 'Gray', color: '#A8A8A8' },
            { name: 'Light Gray', color: '#D3D3D3' }
          ].map((colorOption, index) => (
            <button
              key={colorOption.name}
              onClick={() => onColorSelect?.(colorOption.name)}
              className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                index === 0 ? 'border-black' : 'border-gray-300 hover:border-black'
              }`}
              style={{ backgroundColor: colorOption.color }}
            >
              {index === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div>
        <h4 className="text-sm font-medium text-black mb-3">Material:</h4>
        <div className="grid grid-cols-2 gap-2">
          {materials.map((material) => (
            <div key={material.name} className="relative">
              <button
                className={`relative w-full px-3 py-2 text-xs border rounded transition-all ${
                  material.selected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-black hover:border-black'
                }`}
              >
                {material.name}
                {!material.selected && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div 
                      className="w-full h-0.5 bg-red-500 transform rotate-12 origin-center"
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-50%) rotate(-12deg)'
                      }}
                    ></div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h4 className="text-sm font-medium text-black mb-3">Size:</h4>
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
    </div>
  );
};

export default ProductOptionsSelector;
