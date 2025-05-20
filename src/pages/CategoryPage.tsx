
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
    ],
    filters: {
      colors: ["White", "Black", "Blue", "Green", "Red"],
      sizes: ["Small", "Medium", "Large"],
      materials: ["PLA", "ABS", "PETG", "Resin"]
    }
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
    ],
    filters: {
      colors: ["White", "Black", "Bronze", "Silver"],
      sizes: ["Tiny", "Small", "Medium"],
      materials: ["PLA", "Resin", "Metal-infused"]
    }
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
    ],
    filters: {
      colors: ["Black", "Gray", "White", "Blue"],
      sizes: ["Small", "Medium"],
      materials: ["PLA", "ABS", "TPU"]
    }
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
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
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
      setFilteredProducts(categoryProducts);
      
      // Load wishlisted products from localStorage
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlistedIds(JSON.parse(storedWishlist));
      }
    }
  }, [categoryId, subcategoryId]);

  const handleColorChange = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeChange = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleMaterialChange = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by color
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        selectedColors.includes(product.attributes.color)
      );
    }
    
    // Filter by size
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        selectedSizes.includes(product.attributes.size)
      );
    }
    
    // Filter by material
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product => 
        selectedMaterials.includes(product.attributes.material)
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, priceRange, selectedColors, selectedSizes, selectedMaterials]);

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
  };

  // If category not found, show error
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="mb-6">The category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-6 pb-16">
        <div className="container-avirva">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${category.id}`}>{category.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {subcategoryId && currentSubcategory && (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${category.id}/subcategory/${subcategoryId}`}>
                    {currentSubcategory.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
          
          {/* Category header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {subcategoryId && currentSubcategory ? currentSubcategory.name : category.name}
            </h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
          
          {/* Mobile filter button */}
          <div className="lg:hidden mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)} 
              className="w-full flex items-center justify-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                
                {/* Price Range */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  <Slider 
                    value={priceRange} 
                    min={0} 
                    max={2000} 
                    step={100} 
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Subcategories */}
                {!subcategoryId && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Subcategories</h4>
                    <ul className="space-y-1">
                      {category.subcategories.map((subcategory: any) => (
                        <li key={subcategory.id}>
                          <Link 
                            to={`/category/${category.id}/subcategory/${subcategory.id}`}
                            className="text-sm flex items-center justify-between group hover:text-indigo transition-colors"
                          >
                            <span>{subcategory.name}</span>
                            <span className="text-xs text-gray-500 group-hover:text-indigo transition-colors">
                              ({subcategory.count})
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Colors */}
                {category.filters.colors && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Colors</h4>
                    <div className="space-y-1">
                      {category.filters.colors.map((color: string) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`color-${color}`} 
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => handleColorChange(color)}
                          />
                          <Label htmlFor={`color-${color}`} className="text-sm">{color}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Sizes */}
                {category.filters.sizes && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Size</h4>
                    <div className="space-y-1">
                      {category.filters.sizes.map((size: string) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`size-${size}`} 
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => handleSizeChange(size)}
                          />
                          <Label htmlFor={`size-${size}`} className="text-sm">{size}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Materials */}
                {category.filters.materials && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Material</h4>
                    <div className="space-y-1">
                      {category.filters.materials.map((material: string) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`material-${material}`} 
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={() => handleMaterialChange(material)}
                          />
                          <Label htmlFor={`material-${material}`} className="text-sm">{material}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setSelectedMaterials([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Product grid */}
            <div className="lg:col-span-3">
              {/* Sort controls */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} products
                </p>
                <select className="text-sm border border-gray-300 rounded-md p-2 bg-white">
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
              
              {filteredProducts.length > 0 ? (
                <ProductGrid 
                  products={filteredProducts} 
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistedIds={wishlistedIds}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try changing your filters or search criteria</p>
                  <Button 
                    onClick={() => {
                      setPriceRange([0, 2000]);
                      setSelectedColors([]);
                      setSelectedSizes([]);
                      setSelectedMaterials([]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
