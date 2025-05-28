
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import ProductBadges from './ProductBadges';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  onAddToCart?: (quantity: number) => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  offerPrice,
  rating,
  imageUrl,
  isNew,
  isBestSeller,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateCartInStorage = (newQuantity: number) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = newQuantity;
    } else {
      cartItems.push({
        id,
        name,
        price,
        offerPrice,
        rating,
        imageUrl,
        isNew,
        isBestSeller,
        quantity: newQuantity
      });
    }
    
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + ((item.offerPrice || item.price) * item.quantity), 0
    );
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());
    
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartInStorage(newQuantity);
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartInStorage(newQuantity);
    }
  };

  const handleInitialAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        id,
        name,
        price,
        offerPrice,
        rating,
        imageUrl,
        isNew,
        isBestSeller,
        quantity: 1
      });
    }
    
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + ((item.offerPrice || item.price) * item.quantity), 0
    );
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());
    
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
    
    if (onAddToCart) {
      onAddToCart(1);
    }
    
    setShowQuantityControls(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist();
      
      const product = {
        id,
        name,
        price,
        offerPrice,
        rating,
        imageUrl,
        isNew,
        isBestSeller
      };
      
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
      const existingProduct = allProducts.find((p: any) => p.id === id);
      
      if (!existingProduct) {
        allProducts.push(product);
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
      }
      
      const event = new CustomEvent('wishlistUpdated');
      window.dispatchEvent(event);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);

    const timestamp = new Date().toISOString();
    const historyItem = {
      id,
      name,
      price,
      offerPrice,
      rating,
      imageUrl,
      viewedAt: timestamp
    };
    const browsingHistory = JSON.parse(localStorage.getItem('browsingHistory') || '[]');
    const filteredHistory = browsingHistory.filter((item: any) => item.id !== id);
    filteredHistory.unshift(historyItem);
    const limitedHistory = filteredHistory.slice(0, 20);
    localStorage.setItem('browsingHistory', JSON.stringify(limitedHistory));
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-stone-100">
      <ProductImage
        imageUrl={imageUrl}
        name={name}
        isWishlisted={isWishlisted}
        onImageClick={handleProductClick}
        onToggleWishlist={handleToggleWishlist}
      />
      
      <ProductBadges isNew={isNew} isBestSeller={isBestSeller} />
      
      <div className="p-4">
        <ProductInfo
          name={name}
          rating={rating}
          price={price}
          offerPrice={offerPrice}
          onInfoClick={handleProductClick}
        />
        
        <ProductActions
          showQuantityControls={showQuantityControls}
          quantity={quantity}
          onInitialAddToCart={handleInitialAddToCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
        />
      </div>
    </div>
  );
};

export default ProductCard;
