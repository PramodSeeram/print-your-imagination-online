
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import CategoryBanner from "@/components/CategoryBanner";
import { Button } from "@/components/ui/button";
import { Heart, Play, ChevronDown, ShoppingCart, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for products
const NEW_LAUNCHES = [
  {
    id: 1,
    name: "Geometric Plant Holder",
    price: 599,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isNew: true
  },
  {
    id: 2,
    name: "Phone Stand with Wireless Charger",
    price: 899,
    offerPrice: 799,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1661347998426-1a1a8cbb6ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isNew: true
  },
  {
    id: 3,
    name: "Customizable Desk Organizer",
    price: 699,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1544376798-76d0953d1506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isNew: true
  },
  {
    id: 4,
    name: "Mandala Wall Art",
    price: 1299,
    offerPrice: 999,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isNew: true
  }
];

const BEST_SELLERS = [
  {
    id: 5,
    name: "Miniature Taj Mahal",
    price: 799,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isBestSeller: true
  },
  {
    id: 6,
    name: "Cable Management System",
    price: 499,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1470350576089-539d5a852bf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isBestSeller: true
  },
  {
    id: 7,
    name: "Family Name Plate",
    price: 999,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isBestSeller: true
  },
  {
    id: 8,
    name: "Geometric Lamp Shade",
    price: 1499,
    offerPrice: 1299,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isBestSeller: true
  }
];

// Category banners
const FEATURED_CATEGORIES = [
  {
    id: 1,
    name: "Home Decor",
    description: "Transform your living space with unique 3D printed decor items",
    imageUrl: "https://images.unsplash.com/photo-1538944495092-48fff71fbb5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Tech Gadgets",
    description: "Practical and stylish accessories for your everyday tech",
    imageUrl: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Seasonal Collections",
    description: "Special items for festivals and celebrations",
    imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

// Featured products
const FEATURED_PRODUCTS = [
  {
    id: 9,
    name: "Modern Desk Lamp",
    price: 1299,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Architectural Vase",
    price: 899,
    offerPrice: 749,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Designer Book Ends",
    price: 699,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1544375111-bb23ba6652f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  }
];

interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({
        title: "Removed from wishlist",
        description: `Item has been removed from your wishlist`,
      });
    } else {
      setWishlist([...wishlist, productId]);
      toast({
        title: "Added to wishlist",
        description: `Item has been added to your wishlist`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section with improved design */}
        <section className="bg-gradient-to-b from-gray-50 to-white">
          <div className="container-avirva py-16 px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
                  Premium 3D Printing
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900">
                  Print Your <span className="text-indigo bg-clip-text">Imagination</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Discover our collection of premium 3D printed products that combine creativity, functionality and sustainability.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-indigo hover:bg-indigo-600 text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                    <Link to="/products">Shop Collection</Link>
                  </Button>
                  <Button variant="outline" className="text-indigo border-indigo hover:bg-indigo-50 text-lg py-6 px-8 rounded-full">
                    <Link to="/custom-order" className="flex items-center">
                      <Play className="mr-2 h-5 w-5 fill-indigo" /> How It Works
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-10 flex items-center gap-6">
                  <div className="flex -space-x-2">
                    <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Customer" className="h-8 w-8 rounded-full border-2 border-white" />
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="h-8 w-8 rounded-full border-2 border-white" />
                    <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Customer" className="h-8 w-8 rounded-full border-2 border-white" />
                    <span className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-white bg-indigo text-white text-xs font-medium">+2k</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-sm text-gray-600">Rated 4.9 by our customers</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-teal-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <img src={NEW_LAUNCHES[0].imageUrl} alt="3D Printed Product" className="rounded-lg shadow-lg transform translate-y-8" />
                    <img src={BEST_SELLERS[0].imageUrl} alt="3D Printed Product" className="rounded-lg shadow-lg" />
                    <img src={NEW_LAUNCHES[3].imageUrl} alt="3D Printed Product" className="rounded-lg shadow-lg" />
                    <img src={BEST_SELLERS[2].imageUrl} alt="3D Printed Product" className="rounded-lg shadow-lg transform translate-y-8" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 max-w-[200px]">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs font-medium text-green-600">Now Printing</span>
                    </div>
                    <p className="text-sm font-medium">Geometric Lamp Shade</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div className="bg-indigo h-1.5 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">75% Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured categories */}
        <section className="py-16 bg-gray-50">
          <div className="container-avirva">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
                <p className="text-gray-600">Browse our most popular categories</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/categories" className="flex items-center">
                  View All Categories <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_CATEGORIES.map((category) => (
                <CategoryBanner key={category.id} {...category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* New launches */}
        <section className="py-16">
          <div className="container-avirva">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">New Launches</h2>
                <p className="text-gray-600">Our latest innovative designs</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/new-launches" className="flex items-center">
                  View All <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </Button>
            </div>
            <ProductGrid 
              products={NEW_LAUNCHES} 
              onAddToCart={addToCart} 
              onToggleWishlist={toggleWishlist} 
              wishlistedIds={wishlist}
            />
          </div>
        </section>
        
        {/* Features section */}
        <FeaturesSection />
        
        {/* Best sellers */}
        <section className="py-16 bg-gray-50">
          <div className="container-avirva">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Best Sellers</h2>
                <p className="text-gray-600">Our most popular products</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/best-sellers" className="flex items-center">
                  View All <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </Button>
            </div>
            <ProductGrid 
              products={BEST_SELLERS} 
              onAddToCart={addToCart} 
              onToggleWishlist={toggleWishlist} 
              wishlistedIds={wishlist}
            />
          </div>
        </section>
        
        {/* Custom design CTA */}
        <section className="py-16">
          <div className="container-avirva">
            <div className="bg-gradient-to-r from-indigo to-indigo-600 text-white rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Customized 3D Printing Solutions</h2>
                  <p className="text-white/90 mb-8 max-w-lg">
                    Need something special? Our designers can bring your ideas to life with custom designs tailored to your needs. From prototypes to final products, we're here to help.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-full mr-4">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Expert Design Consultation</h3>
                        <p className="text-white/80 text-sm">Get professional help with your ideas</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-full mr-4">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Rapid Prototyping</h3>
                        <p className="text-white/80 text-sm">Quick iterations to perfect your design</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-full mr-4">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Premium Materials</h3>
                        <p className="text-white/80 text-sm">High-quality, durable materials for lasting results</p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-8 bg-white text-indigo hover:bg-gray-100 text-lg py-6 px-8 rounded-full shadow-lg">
                    <Link to="/custom-order">Request Custom Order</Link>
                  </Button>
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1612812166620-a72266183c2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Custom 3D printing" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <TestimonialSection />
        
        {/* Featured products mosaic */}
        <section className="py-16 bg-gray-50">
          <div className="container-avirva">
            <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={FEATURED_PRODUCTS[0].imageUrl} 
                  alt={FEATURED_PRODUCTS[0].name} 
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm text-white">{FEATURED_PRODUCTS[0].rating}</span>
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-bold">{FEATURED_PRODUCTS[0].name}</h3>
                  <p className="text-white/80 mb-4">₹{FEATURED_PRODUCTS[0].price}</p>
                  <div className="flex gap-2">
                    <Button 
                      className="bg-white text-indigo hover:bg-gray-100 gap-1"
                      onClick={() => addToCart(FEATURED_PRODUCTS[0])}
                    >
                      <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/20"
                      onClick={() => toggleWishlist(FEATURED_PRODUCTS[0].id)}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(FEATURED_PRODUCTS[0].id) ? 'fill-white' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {FEATURED_PRODUCTS.slice(1).map((product) => (
                  <div key={product.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-white/80">
                          {product.offerPrice ? (
                            <>
                              <span className="text-white">₹{product.offerPrice}</span>
                              <span className="line-through ml-2 text-sm">₹{product.price}</span>
                            </>
                          ) : (
                            <>₹{product.price}</>
                          )}
                        </p>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-white text-white hover:bg-white/20 h-8 w-8"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-white' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      className="absolute bottom-4 right-4 bg-white text-indigo hover:bg-gray-100"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter subscription */}
        <section className="py-16">
          <div className="container-avirva max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive offers, design inspiration and new product launches
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
              />
              <Button className="bg-indigo hover:bg-indigo-600 rounded-full py-3 px-6">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
