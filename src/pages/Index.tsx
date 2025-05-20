
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategoryBanner from "@/components/CategoryBanner";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  keywords?: string[];
}

const Index = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Product[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<Product[]>([]);
  const [browsingHistory, setBrowsingHistory] = useState<{category: string, items: Product[]}[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load wishlisted item ids from localStorage
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistedIds(JSON.parse(storedWishlist));
    }
    
    // Load loyalty points if available
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoyaltyPoints(user.loyaltyPoints || Math.floor(Math.random() * 500) + 100); // Mock loyalty points
    } else {
      // Create a mock user profile if it doesn't exist
      const mockUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        loyaltyPoints: Math.floor(Math.random() * 500) + 100
      };
      localStorage.setItem('userProfile', JSON.stringify(mockUser));
      setLoyaltyPoints(mockUser.loyaltyPoints);
    }

    // Mock products fetch from API
    const mockProducts = [
      {
        id: 1,
        name: "Handcrafted Wooden Wall Decor",
        price: 1999,
        offerPrice: 1499,
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1614955849439-67066da241ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        isNew: true,
        keywords: ["wooden", "wall", "decor", "handcrafted", "home"]
      },
      {
        id: 2,
        name: "Hand-painted Ceramic Vase",
        price: 899,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        isBestSeller: true,
        keywords: ["ceramic", "vase", "hand-painted", "decor", "pottery"]
      },
      {
        id: 3,
        name: "Handwoven Cotton Rug",
        price: 2499,
        offerPrice: 1999,
        rating: 4.2,
        imageUrl: "https://images.unsplash.com/photo-1615529482396-63f8b0d0944b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        keywords: ["cotton", "rug", "handwoven", "floor", "covering"]
      },
      {
        id: 4,
        name: "Terracotta Plant Pot Set",
        price: 1299,
        offerPrice: 999,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        isNew: true,
        keywords: ["terracotta", "pot", "plant", "garden", "set"]
      },
      {
        id: 5,
        name: "Brass Decor Set",
        price: 2999,
        offerPrice: 2399,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        isBestSeller: true,
        keywords: ["brass", "decor", "metal", "luxurious", "set"]
      },
      {
        id: 6,
        name: "Bamboo Storage Baskets",
        price: 699,
        rating: 4.3,
        imageUrl: "https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        keywords: ["bamboo", "storage", "basket", "organization", "eco-friendly"]
      },
      {
        id: 7,
        name: "Macrame Wall Hanging",
        price: 1199,
        offerPrice: 899,
        rating: 4.4,
        imageUrl: "https://images.unsplash.com/photo-1545304787-d9d3229f4e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        isNew: true,
        keywords: ["macrame", "wall", "hanging", "boho", "decor"]
      },
      {
        id: 8,
        name: "Marble Coaster Set",
        price: 799,
        offerPrice: 599,
        rating: 4.1,
        imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        isBestSeller: true,
        keywords: ["marble", "coaster", "drink", "tableware", "set"]
      }
    ];
    
    // Set all products for search functionality
    setAllProducts(mockProducts);
    
    // Set new arrivals (products with isNew flag)
    setNewArrivals(mockProducts.filter(p => p.isNew));
    
    // Set best sellers (products with isBestSeller flag)
    setBestSellers(mockProducts.filter(p => p.isBestSeller));
    
    // Set deals (products with offerPrice)
    setDeals(mockProducts.filter(p => p.offerPrice));
    
    // Generate some recently viewed products
    const viewedProducts = [...mockProducts].sort(() => 0.5 - Math.random()).slice(0, 5);
    setRecentlyViewedProducts(viewedProducts);
    
    // Generate browsing history by categories
    setBrowsingHistory([
      {
        category: 'Laptops',
        items: [
          {
            id: 101,
            name: "Dell Inspiron Laptop",
            price: 45999,
            rating: 4.3,
            imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            keywords: ["laptop", "dell", "inspiron", "computer", "electronics"]
          },
          {
            id: 102,
            name: "HP Pavilion Laptop",
            price: 52999,
            offerPrice: 49999,
            rating: 4.5,
            imageUrl: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            keywords: ["laptop", "hp", "pavilion", "computer", "electronics"]
          }
        ]
      },
      {
        category: 'Hand Blenders',
        items: [
          {
            id: 201,
            name: "Phillips Hand Blender",
            price: 2999,
            offerPrice: 2499,
            rating: 4.6,
            imageUrl: "https://images.unsplash.com/photo-1507914997799-a3d0222c403a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            keywords: ["blender", "phillips", "kitchen", "appliance", "cooking"]
          }
        ]
      }
    ]);

  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1
      });
    }
    
    // Calculate cart total
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + ((item.offerPrice || item.price) * item.quantity), 0
    );
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleToggleWishlist = (productId: number) => {
    const currentWishlist = [...wishlistedIds];
    const index = currentWishlist.indexOf(productId);
    
    if (index !== -1) {
      // Remove from wishlist
      currentWishlist.splice(index, 1);
      toast({
        title: "Removed from wishlist",
        description: "Product has been removed from your wishlist."
      });
    } else {
      // Add to wishlist
      currentWishlist.push(productId);
      toast({
        title: "Added to wishlist",
        description: "Product has been added to your wishlist."
      });
    }
    
    setWishlistedIds(currentWishlist);
    localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Add search bar above HeroBanner */}
        <div className="bg-indigo-700 py-4">
          <div className="container-avirva">
            <SearchBar allProducts={allProducts} className="max-w-2xl mx-auto" />
          </div>
        </div>
        
        <HeroBanner />
        
        <div className="container-avirva py-6">
          {/* Loyalty Points Card */}
          <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-5 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Your Loyalty Points</h3>
                <p className="text-sm opacity-90 mb-2">Collect points with every purchase</p>
                <div className="text-3xl font-bold">{loyaltyPoints} points</div>
              </div>
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                View Rewards
              </Button>
            </div>
          </div>
          
          {/* Continue Shopping Section - based on Amazon-like layout */}
          {recentlyViewedProducts.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Pick up where you left off</h2>
                <Button variant="link" className="text-indigo-600" onClick={() => navigate('/account')}>
                  See more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {recentlyViewedProducts.slice(0, 5).map(product => (
                  <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/product/${product.id}`)}>
                    <CardContent className="p-3">
                      <div className="aspect-square mb-2">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Browsing History - Amazon-like Category Row */}
          {browsingHistory.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Keep shopping for</h2>
                <Button variant="link" className="text-indigo-600">
                  View your browsing history <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {browsingHistory.map((category, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{category.category}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {category.items.map(item => (
                          <div 
                            key={item.id} 
                            className="cursor-pointer"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            <div className="aspect-square bg-gray-100 mb-1">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs text-gray-600">{category.items.length} viewed</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Hero Banner with Categories */}
          <CategoryBanner 
            id={1}
            name="Home Decor Collection"
            description="Discover our curated selection of beautiful home decor pieces to elevate your living space."
            imageUrl="https://images.unsplash.com/photo-1615529482396-63f8b0d0944b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          />
          
          {/* New Arrivals */}
          <ProductGrid 
            title="New Arrivals" 
            products={newArrivals}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistedIds={wishlistedIds}
          />
          
          {/* Best Sellers */}
          <ProductGrid 
            title="Best Sellers" 
            products={bestSellers}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistedIds={wishlistedIds}
          />
          
          {/* Deals */}
          <ProductGrid 
            title="Deals of the Week" 
            products={deals}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistedIds={wishlistedIds}
          />
          
          {/* Features Section */}
          <FeaturesSection />
          
          {/* Testimonials */}
          <TestimonialSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
