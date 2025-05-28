
import React from 'react';

interface Option {
  label: string;
  value: string;
  available: boolean;
}

interface ProductOptionsSelectorProps {
  title: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  type: 'color' | 'material' | 'size';
}

const ProductOptionsSelector: React.FC<ProductOptionsSelectorProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  type
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-black">{title}:</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => option.available && onSelect(option.value)}
            disabled={!option.available}
            className={`
              relative px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200
              ${
                selectedValue === option.value
                  ? 'border-black bg-black text-white'
                  : option.available
                  ? 'border-gray-300 bg-white text-black hover:border-gray-400'
                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {option.label}
            {!option.available && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-gray-400 rotate-45 transform" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductOptionsSelector;
