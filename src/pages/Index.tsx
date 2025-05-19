
import HeroBanner from "@/components/HeroBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import CategoryBanner from "@/components/CategoryBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroBanner />
        
        <div className="container-avirva py-12">
          <ProductGrid products={NEW_LAUNCHES} title="New Launches" />
          
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title mb-0">Featured Categories</h2>
              <Button variant="outline" asChild>
                <Link to="/categories">View All Categories</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_CATEGORIES.map((category) => (
                <CategoryBanner key={category.id} {...category} />
              ))}
            </div>
          </div>
          
          <ProductGrid products={BEST_SELLERS} title="Best Sellers" />
        </div>
        
        <FeaturesSection />
        
        <div className="container-avirva py-12">
          <div className="bg-indigo text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Customized 3D Printing Solutions</h2>
              <p className="text-white/80 mb-4 max-w-xl">Need something special? We can help bring your ideas to life with our custom design and printing service.</p>
              <Button className="bg-white text-indigo hover:bg-gray-100">
                <Link to="/custom-order">Request Custom Order</Link>
              </Button>
            </div>
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-teal/20 backdrop-blur-sm rounded-full animate-spin-slow"></div>
              <img 
                src="https://images.unsplash.com/photo-1612812166620-a72266183c2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Custom 3D printing" 
                className="absolute inset-4 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <TestimonialSection />
        
        <div className="bg-gray-100 py-16">
          <div className="container-avirva">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Print Your Imagination</h2>
                <p className="text-gray-600 mb-8">Join thousands of happy customers who have transformed their homes and offices with our premium 3D printed products.</p>
                <Button className="bg-teal hover:bg-teal-600 text-lg py-6 px-8">
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
