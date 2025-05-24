
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for categories (in a real app, this would come from an API)
const CATEGORIES = [
  {
    id: "1",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    description: "Beautiful 3D printed decor items for your home",
    subcategories: [
      { id: "101", name: "Wall Art", count: 12 },
      { id: "102", name: "Planters", count: 8 },
      { id: "103", name: "Lighting", count: 10 }
    ]
  },
  {
    id: "2",
    name: "Miniatures",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    description: "Detailed miniature models for collectors and enthusiasts",
    subcategories: [
      { id: "201", name: "Vehicles", count: 15 },
      { id: "202", name: "Figurines", count: 20 },
      { id: "203", name: "Landmarks", count: 8 }
    ]
  },
  {
    id: "3",
    name: "Tech Gadgets",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    description: "Functional 3D printed tech accessories and gadgets",
    subcategories: [
      { id: "301", name: "Phone Stands", count: 8 },
      { id: "302", name: "Cable Organizers", count: 6 },
      { id: "303", name: "Key Holders", count: 10 }
    ]
  }
];

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Geometric Plant Holder",
    price: 599,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
    subcategoryId: "102",
    isNew: true,
    attributes: {
      color: "White",
      size: "Medium",
      material: "PLA"
    }
  },
  {
    id: 2,
    name: "Wall Mounted Shelf",
    price: 799,
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
    subcategoryId: "101",
    attributes: {
      color: "Black",
      size: "Medium",
      material: "PLA"
    }
  },
  {
    id: 3,
    name: "Desk Lamp",
    price: 1299,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "1",
    subcategoryId: "103",
    isBestSeller: true,
    attributes: {
      color: "White",
      size: "Medium",
      material: "PLA"
    }
  },
  {
    id: 4,
    name: "Miniature Car",
    price: 699,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "2",
    subcategoryId: "201",
    attributes: {
      color: "Red",
      size: "Small",
      material: "Resin"
    }
  },
  {
    id: 5,
    name: "Phone Stand",
    price: 399,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    categoryId: "3",
    subcategoryId: "301",
    attributes: {
      color: "Black",
      size: "Small",
      material: "PLA"
    }
  }
];

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string, subcategoryId?: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Find the category by ID
    const foundCategory = CATEGORIES.find(cat => cat.id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory);
      
      // Filter products by category and subcategory if present
      const categoryProducts = PRODUCTS.filter(product => {
        if (subcategoryId) {
          return product.categoryId === categoryId && product.subcategoryId === subcategoryId;
        }
        return product.categoryId === categoryId;
      });
      
      setProducts(categoryProducts);
      
      // Load wishlisted products from localStorage
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlistedIds(JSON.parse(storedWishlist));
      }
    }
    
    // Add event listener for wishlist updates
    const handleWishlistUpdate = () => {
      const updatedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistedIds(updatedWishlist);
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [categoryId, subcategoryId]);

  const handleAddToCart = (product: any) => {
    // Get existing cart or initialize empty cart
    const existingCart = localStorage.getItem('cartItems');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if product already exists in cart
    const existingProduct = cartItems.find((item: any) => item.id === product.id);
    
    if (existingProduct) {
      // Update quantity if product exists
      existingProduct.quantity += 1;
    } else {
      // Add new product to cart
      cartItems.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save updated cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`
    });

    // Update the cart counter in header by dispatching an event
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleToggleWishlist = (productId: number) => {
    let newWishlist: number[];
    
    if (wishlistedIds.includes(productId)) {
      // Remove from wishlist
      newWishlist = wishlistedIds.filter(id => id !== productId);
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist"
      });
    } else {
      // Add to wishlist
      newWishlist = [...wishlistedIds, productId];
      toast({
        title: "Added to wishlist",
        description: "The item has been added to your wishlist"
      });
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    // Update state
    setWishlistedIds(newWishlist);
    
    // Dispatch event for wishlist count update
    const event = new CustomEvent('wishlistUpdated');
    window.dispatchEvent(event);
  };

  // If category not found, show error
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">Category not found</h1>
            <p className="mb-6 text-muted-foreground">The category you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find current subcategory if applicable
  const currentSubcategory = subcategoryId 
    ? category.subcategories.find((sub: any) => sub.id === subcategoryId)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-6 pb-16">
        <div className="container-avirva">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate(`/category/${category.id}`)}>{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {subcategoryId && currentSubcategory && (
              <BreadcrumbItem>
                <BreadcrumbLink>
                  {currentSubcategory.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
          
          {/* Category header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">
              {subcategoryId && currentSubcategory ? currentSubcategory.name : category.name}
            </h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
          
          {/* Subcategory links - only show when on main category page */}
          {!subcategoryId && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-3 text-foreground">Browse Subcategories</h2>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((subcategory: any) => (
                  <Button 
                    key={subcategory.id}
                    variant="outline"
                    onClick={() => navigate(`/category/${category.id}/subcategory/${subcategory.id}`)}
                    className="hover:bg-primary/10"
                  >
                    {subcategory.name} ({subcategory.count})
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Product grid */}
          <div>
            {/* Sort controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} products
              </p>
              <select className="text-sm border border-border rounded-md p-2 bg-background text-foreground">
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
            
            {products.length > 0 ? (
              <ProductGrid 
                products={products} 
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistedIds={wishlistedIds}
              />
            ) : (
              <div className="bg-card rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium mb-2 text-card-foreground">No products found</h3>
                <p className="text-muted-foreground mb-4">Try browsing other categories</p>
                <Button onClick={() => navigate('/')}>Return to Home</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
