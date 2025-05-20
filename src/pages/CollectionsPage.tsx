
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

// Mock collection data
const COLLECTIONS = [
  {
    id: "1",
    name: "Home Decor",
    description: "Stylish 3D printed items to enhance your living space",
    imageUrl: "https://images.unsplash.com/photo-1615529482396-63f8b0d0944b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    name: "Miniature Models",
    description: "Detailed replica models for collectors and enthusiasts",
    imageUrl: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    name: "Tech Accessories",
    description: "Practical gadgets and accessories for your electronics",
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "4",
    name: "Office Organizers",
    description: "Keep your workspace tidy with these functional pieces",
    imageUrl: "https://images.unsplash.com/photo-1507914997799-a3d0222c403a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Holiday Decorations",
    description: "Seasonal items to celebrate special occasions",
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Gardening Accessories",
    description: "Planters, tools and more for your green space",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
];

const CollectionsPage = () => {
  const navigate = useNavigate();
  const featuredCollections = COLLECTIONS.filter(collection => collection.featured);
  const regularCollections = COLLECTIONS.filter(collection => !collection.featured);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          <h1 className="text-2xl font-bold mb-6">Our Collections</h1>
          
          {/* Featured Collections */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCollections.map(collection => (
                <Card 
                  key={collection.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => navigate(`/category/${collection.id}`)}
                >
                  <div className="aspect-[16/9]">
                    <img 
                      src={collection.imageUrl} 
                      alt={collection.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-800/30">
                    <h3 className="font-bold text-lg mb-1">{collection.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{collection.description}</p>
                    <Button 
                      className="gap-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                      Explore Collection <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* All Collections */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {COLLECTIONS.map(collection => (
                <Card 
                  key={collection.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(`/category/${collection.id}`)}
                >
                  <div className="aspect-video">
                    <img 
                      src={collection.imageUrl} 
                      alt={collection.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">{collection.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{collection.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CollectionsPage;
