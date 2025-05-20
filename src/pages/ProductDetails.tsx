
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock product data - in a real app this would come from an API
const PRODUCTS = [
  {
    id: "1",
    name: "Geometric Plant Holder",
    price: 599,
    rating: 4.5,
    description: "A beautifully designed geometric plant holder that adds modern elegance to your home decor. Perfect for small to medium sized plants and crafted with precision 3D printing.",
    imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
    subcategoryId: "102",
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531985064462-144587530ecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    attributes: {
      available_colors: ["White", "Black", "Blue", "Green"],
      available_materials: ["PLA", "ABS", "PETG", "Resin"],
      weight: "250g",
      dimensions: "15 x 15 x 10 cm"
    }
  },
  {
    id: "2",
    name: "Wall Mounted Shelf",
    price: 799,
    rating: 4.2,
    description: "An elegant wall-mounted shelf perfect for displaying your favorite items. The lightweight yet sturdy design makes it easy to install and can hold up to 2 kg of weight.",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
    subcategoryId: "101",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486701797-0f33f61038df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    attributes: {
      available_colors: ["Black", "White", "Walnut"],
      available_materials: ["PLA", "Wood-infused PLA"],
      weight: "350g",
      dimensions: "30 x 15 x 5 cm"
    }
  },
  {
    id: "3",
    name: "Desk Lamp",
    price: 1299,
    rating: 4.8,
    description: "A modern desk lamp with a sleek design that provides warm, comfortable lighting for your workspace. Features a touch-sensitive base for easy operation.",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
    subcategoryId: "103",
    isBestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    attributes: {
      available_colors: ["White", "Black"],
      available_materials: ["PLA", "ABS"],
      weight: "450g",
      dimensions: "20 x 15 x 35 cm"
    }
  },
  {
    id: "4",
    name: "Miniature Car",
    price: 699,
    rating: 4.6,
    description: "A highly detailed miniature car model, perfect for collectors. Features moving wheels and intricate design elements.",
    imageUrl: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "2",
    subcategoryId: "201",
    images: [
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    attributes: {
      available_colors: ["Red", "Blue", "Black", "Silver"],
      available_materials: ["Resin", "PLA"],
      weight: "150g",
      dimensions: "10 x 5 x 3 cm"
    }
  },
  {
    id: "5",
    name: "Phone Stand",
    price: 399,
    rating: 4.3,
    description: "A practical phone stand designed to hold your device at the perfect viewing angle. Compatible with most smartphone models.",
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "3",
    subcategoryId: "301",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    attributes: {
      available_colors: ["Black", "White", "Gray", "Blue"],
      available_materials: ["PLA", "TPU", "ABS"],
      weight: "100g",
      dimensions: "8 x 6 x 10 cm"
    }
  }
];

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundProduct = PRODUCTS.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        // Set default selections
        if (foundProduct.attributes.available_colors?.length) {
          setSelectedColor(foundProduct.attributes.available_colors[0]);
        }
        if (foundProduct.attributes.available_materials?.length) {
          setSelectedMaterial(foundProduct.attributes.available_materials[0]);
        }
      }
      setIsLoading(false);
      
      // Check if product is in wishlist
      const wishlist = localStorage.getItem('wishlist');
      if (wishlist) {
        const wishlistItems = JSON.parse(wishlist);
        setIsWishlisted(wishlistItems.includes(productId));
      }
    }, 500);
  }, [productId]);

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedMaterial) {
      toast({
        title: "Please select options",
        description: "Please select color and material before adding to cart",
        variant: "destructive"
      });
      return;
    }

    // Get existing cart or initialize empty cart
    const existingCart = localStorage.getItem('cartItems');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    // Create cart item with selected options
    const cartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedMaterial,
      itemTotal: product.price * quantity
    };
    
    // Check if same product with same options exists
    const existingItemIndex = cartItems.findIndex((item: any) => 
      item.id === product.id && 
      item.selectedColor === selectedColor && 
      item.selectedMaterial === selectedMaterial
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      cartItems[existingItemIndex].quantity += quantity;
      cartItems[existingItemIndex].itemTotal = cartItems[existingItemIndex].price * cartItems[existingItemIndex].quantity;
    } else {
      // Add new product to cart
      cartItems.push(cartItem);
    }
    
    // Save updated cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success toast
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedColor}, ${selectedMaterial}) added to your cart`
    });

    // Update the cart counter in header by dispatching an event
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    const wishlist = localStorage.getItem('wishlist');
    let wishlistItems = wishlist ? JSON.parse(wishlist) : [];
    
    if (isWishlisted) {
      // Remove from wishlist
      wishlistItems = wishlistItems.filter((id: string) => id !== productId);
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist"
      });
    } else {
      // Add to wishlist
      if (!wishlistItems.includes(productId)) {
        wishlistItems.push(productId);
      }
      toast({
        title: "Added to wishlist",
        description: "The item has been added to your wishlist"
      });
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    // Update state
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">Loading product details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container-avirva">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate(`/category/${product.categoryId}`)}>
                {product.categoryId === "1" ? "Home Decor" : 
                 product.categoryId === "2" ? "Miniatures" : "Tech Gadgets"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden border">
                <img 
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail images */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((img: string, index: number) => (
                  <div 
                    key={index} 
                    className={`w-20 h-20 rounded border overflow-hidden cursor-pointer ${selectedImage === img ? 'border-indigo-500 border-2' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product details */}
            <div className="space-y-5">
              <div>
                {/* Badges */}
                <div className="flex space-x-2 mb-2">
                  {product.isNew && <Badge className="bg-indigo text-white">New</Badge>}
                  {product.isBestSeller && <Badge className="bg-amber-500 text-white">Best Seller</Badge>}
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="ml-1 text-sm">{product.rating} / 5</span>
                  </div>
                  <span className="text-sm text-gray-500">24 Reviews</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-2xl font-bold">₹{product.price}</span>
                {product.offerPrice && (
                  <>
                    <span className="text-gray-400 line-through">₹{product.price}</span>
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% off
                    </span>
                  </>
                )}
              </div>
              
              <div>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              {/* Color selection */}
              <div>
                <h3 className="text-sm font-medium mb-2">Select Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.attributes.available_colors.map((color: string) => (
                    <Button
                      key={color}
                      variant="outline"
                      className={`px-3 py-1 h-auto ${selectedColor === color 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300'}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Material selection */}
              <div>
                <h3 className="text-sm font-medium mb-2">Select Material</h3>
                <div className="flex flex-wrap gap-2">
                  {product.attributes.available_materials.map((material: string) => (
                    <Button
                      key={material}
                      variant="outline"
                      className={`px-3 py-1 h-auto ${selectedMaterial === material 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300'}`}
                      onClick={() => setSelectedMaterial(material)}
                    >
                      {material}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Product details */}
              <div className="border-t border-b py-4 my-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{product.attributes.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium">{product.attributes.dimensions}</p>
                  </div>
                </div>
              </div>
              
              {/* Quantity and add to cart */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="py-2 px-3 text-gray-600 hover:bg-gray-50"
                    onClick={handleDecreaseQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button 
                    className="py-2 px-3 text-gray-600 hover:bg-gray-50"
                    onClick={handleIncreaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button 
                  className="flex-1 bg-indigo hover:bg-indigo-600"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
                
                <Button 
                  variant="outline"
                  className={`p-2 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
                  onClick={handleToggleWishlist}
                >
                  <Heart className="h-5 w-5" fill={isWishlisted ? "#ef4444" : "none"} />
                </Button>
              </div>
              
              <Button 
                className="w-full bg-teal hover:bg-teal-600"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
          
          {/* Additional product information */}
          <div className="mt-12">
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <div className="prose max-w-none">
                <p>
                  This {product.name} is a premium 3D printed product made with high-quality materials.
                  Our products are made to order, ensuring attention to detail and customization according to your preferences.
                </p>
                <p className="mt-4">
                  All AVIRVA products come with a 30-day satisfaction guarantee. If you're not completely
                  satisfied with your purchase, you can return it for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
