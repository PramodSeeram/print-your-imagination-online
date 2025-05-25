
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProductBadgesProps {
  isNew?: boolean;
  isBestSeller?: boolean;
}

const ProductBadges: React.FC<ProductBadgesProps> = ({ isNew, isBestSeller }) => {
  if (!isNew && !isBestSeller) return null;

  return (
    <div className="absolute top-2 left-2 space-y-1">
      {isNew && <Badge className="bg-emerald-600 text-white">New</Badge>}
      {isBestSeller && <Badge className="bg-amber-600 text-white">Best Seller</Badge>}
    </div>
  );
};

export default ProductBadges;
