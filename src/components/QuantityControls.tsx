
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantityControlsProps {
  quantity: number;
  onIncrease: (e: React.MouseEvent) => void;
  onDecrease: (e: React.MouseEvent) => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onIncrease,
  onDecrease
}) => {
  return (
    <div className="flex items-center border border-slate-600 rounded-md w-full">
      <button 
        onClick={onDecrease}
        className="py-2 px-3 text-slate-300 hover:bg-slate-700 rounded-l-md"
      >
        <Minus className="h-4 w-4" />
      </button>
      <div className="py-2 px-4 bg-slate-700 text-slate-100 font-medium text-center flex-1">
        {quantity}
      </div>
      <button 
        onClick={onIncrease}
        className="py-2 px-3 text-slate-300 hover:bg-slate-700 rounded-r-md"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantityControls;
