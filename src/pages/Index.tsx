import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategoryBanner from "@/components/CategoryBanner";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import ProductGrid from "@/components/ProductGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, X } from 'lucide-react';
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
  const [browsingHistory, setBrowsingHistory] = useState<{
    category: string;
    items: Product[];
  }[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
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
    const mockProducts = [{
      id: 1,
      name: "Handcrafted Wooden Wall Decor",
      price: 1999,
      offerPrice: 1499,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1614955849439-67066da241ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isNew: true,
      keywords: ["wooden", "wall", "decor", "handcrafted", "home"],
      category: "Home Decor"
    }, {
      id: 2,
      name: "Hand-painted Ceramic Vase",
      price: 899,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isBestSeller: true,
      keywords: ["ceramic", "vase", "hand-painted", "decor", "pottery"],
      category: "Home Decor"
    }, {
      id: 3,
      name: "Handwoven Cotton Rug",
      price: 2499,
      offerPrice: 1999,
      rating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1615529482396-63f8b0d0944b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      keywords: ["cotton", "rug", "handwoven", "floor", "covering"],
      category: "Home Decor"
    }, {
      id: 4,
      name: "Terracotta Plant Pot Set",
      price: 1299,
      offerPrice: 999,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isNew: true,
      keywords: ["terracotta", "pot", "plant", "garden", "set"],
      category: "Home Decor"
    }, {
      id: 5,
      name: "Brass Decor Set",
      price: 2999,
      offerPrice: 2399,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isBestSeller: true,
      keywords: ["brass", "decor", "metal", "luxurious", "set"],
      category: "Home Decor"
    }, {
      id: 6,
      name: "Bamboo Storage Baskets",
      price: 699,
      rating: 4.3,
      imageUrl: "https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      keywords: ["bamboo", "storage", "basket", "organization", "eco-friendly"],
      category: "Home Decor"
    }, {
      id: 7,
      name: "Macrame Wall Hanging",
      price: 1199,
      offerPrice: 899,
      rating: 4.4,
      imageUrl: "https://images.unsplash.com/photo-1545304787-d9d3229f4e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isNew: true,
      keywords: ["macrame", "wall", "hanging", "boho", "decor"],
      category: "Home Decor"
    }, {
      id: 8,
      name: "Marble Coaster Set",
      price: 799,
      offerPrice: 599,
      rating: 4.1,
      imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isBestSeller: true,
      keywords: ["marble", "coaster", "drink", "tableware", "set"],
      category: "Home Decor"
    }];

    // Store all products in localStorage for wishlist/cart to use
    localStorage.setItem('allProducts', JSON.stringify(mockProducts));

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
    setBrowsingHistory([{
      category: 'Laptops',
      items: [{
        id: 101,
        name: "Dell Inspiron Laptop",
        price: 45999,
        rating: 4.3,
        imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        keywords: ["laptop", "dell", "inspiron", "computer", "electronics"]
      }, {
        id: 102,
        name: "HP Pavilion Laptop",
        price: 52999,
        offerPrice: 49999,
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        keywords: ["laptop", "hp", "pavilion", "computer", "electronics"]
      }]
    }, {
      category: 'Hand Blenders',
      items: [{
        id: 201,
        name: "Phillips Hand Blender",
        price: 2999,
        offerPrice: 2499,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1507914997799-a3d0222c403a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        keywords: ["blender", "phillips", "kitchen", "appliance", "cooking"]
      }]
    }]);
  }, []);
  const handleAddToCart = (product: any) => {
    // Get existing cart items or initialize empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      cartItems[existingItemIndex].quantity += product.quantity || 1;
    } else {
      // Add new product to cart with the correct structure
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        offerPrice: product.offerPrice,
        quantity: product.quantity || 1,
        imageUrl: product.imageUrl
      });
    }

    // Calculate cart total
    const total = cartItems.reduce((sum: number, item: any) => sum + (item.offerPrice || item.price) * item.quantity, 0);

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());

    // Dispatch event to update cart count in header
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
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

    // Dispatch event for wishlist count update
    const event = new CustomEvent('wishlistUpdated');
    window.dispatchEvent(event);
  };
  return <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow bg-background">
        {/* Hero Section - Slideshow */}
        <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
          <HeroBanner />
        </section>

        <div className="container-avirva py-16">
          {/* Categories Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From home to contract, get inspired and design!
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[{
              name: "Bathroom",
              image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=400&q=80"
            }, {
              name: "Chair",
              image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80"
            }, {
              name: "Decor",
              image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80"
            }, {
              name: "Lamp",
              image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=400&q=80"
            }, {
              name: "Table",
              image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=400&q=80"
            }].map(category => <Card key={category.name} className="group cursor-pointer overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 bg-card">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-card-foreground">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </section>

          {/* Featured Collections */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="relative overflow-hidden h-80 border border-border shadow-sm bg-card">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" alt="Elevate Your Space" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-8">
                  <div className="text-primary-foreground">
                    <h3 className="font-playfair text-2xl font-medium mb-2">Trending</h3>
                    <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-6" onClick={() => navigate('/category/1')}>
                      Shop Now
                    </Button>
                  </div>
                </div>
              </Card>
              
              <div className="space-y-6">
                <Card className="relative overflow-hidden h-36 border border-border shadow-sm bg-card">
                  <img src="https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=80" alt="Harmony in Design" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center p-6">
                    <div className="text-primary-foreground">
                      <h3 className="font-playfair text-xl font-medium mb-2">Most Sold</h3>
                      <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-4 py-1 text-sm" onClick={() => navigate('/category/2')}>
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="relative overflow-hidden h-36 border border-border shadow-sm bg-card">
                  <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80" alt="Curated Living" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center p-6">
                    <div className="text-primary-foreground">
                      <h3 className="font-playfair text-xl font-medium mb-2">Discounts</h3>
                      <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-4 py-1 text-sm" onClick={() => navigate('/category/3')}>
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Bestseller Section */}
          <section className="mb-20">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-playfair text-2xl font-medium text-foreground">Bestseller</h2>
                <p className="text-muted-foreground">Experience featured products at our store</p>
              </div>
              <Button variant="link" className="text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <ProductGrid title="" products={bestSellers} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlistedIds={wishlistedIds} />
          </section>
          
          {/* New Arrivals Section with Bold Title */}
          <section className="mb-20">
            <div className="text-center mb-8">
              <h2 className="font-bold text-3xl text-foreground mb-2">New Arrivals</h2>
            </div>
            <ProductGrid title="" products={newArrivals} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlistedIds={wishlistedIds} />
          </section>
          
          {/* Special Offers Section with Bold Title */}
          <section className="mb-20">
            <div className="text-center mb-8">
              <h2 className="font-bold text-3xl text-foreground mb-2">Special Offers</h2>
            </div>
            <ProductGrid title="" products={deals} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlistedIds={wishlistedIds} />
          </section>
          
          <FeaturesSection />
          <TestimonialSection />
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Index;