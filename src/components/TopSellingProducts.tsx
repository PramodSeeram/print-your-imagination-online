
import React from 'react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: string;
  sold: number;
  imageUrl: string;
}

interface TopSellingProductsProps {
  products: Product[];
  onViewAllClick: () => void;
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({ products, onViewAllClick }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-semibold text-lg">Top Selling Products</h3>
      </div>
      <div className="p-6">
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{product.price}</span>
                  <span>{product.sold} sold</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-indigo hover:text-indigo-700"
            onClick={onViewAllClick}
          >
            View All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
