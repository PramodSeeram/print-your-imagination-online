import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Share2, Check, Star, ChevronRight, Minus, Plus } from 'lucide-react';
interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  description: string;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  subcategory?: string;
  availableColors: {
    name: string;
    value: string;
    available: boolean;
  }[];
  availableMaterials: {
    name: string;
    available: boolean;
  }[];
  features: string[];
  specifications: {
    [key: string]: string;
  };
}
const ProductDetails = () => {
  const {
    productId
  } = useParams();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => {
    // Simulate loading product data from API
    setTimeout(() => {
      // This would normally come from an API call
      const mockProduct: Product = {
        id: Number(productId) || 1,
        name: "Handcrafted Wooden Wall Decor",
        price: 1999,
        offerPrice: 1499,
        description: "Beautifully handcrafted wooden wall decor piece made by skilled artisans from sustainably sourced materials. Each piece is unique with natural variations that add character to your home. This artwork can be the perfect centerpiece for your living room or bedroom wall.",
        rating: 4.5,
        reviewCount: 127,
        images: ["https://images.unsplash.com/photo-1614955849439-67066da241ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1533323905782-7b8c0f2e2184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1616641614661-4e27ea4b1f32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1584174594698-62488186020c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"],
        category: "Home Decor",
        subcategory: "Wall Art",
        availableColors: [{
          name: "Natural",
          value: "#d8b78e",
          available: true
        }, {
          name: "Walnut",
          value: "#5c4033",
          available: true
        }, {
          name: "Ebony",
          value: "#3d3635",
          available: false
        }, {
          name: "White Oak",
          value: "#e8dfd1",
          available: true
        }],
        availableMaterials: [{
          name: "Sheesham Wood",
          available: true
        }, {
          name: "Mango Wood",
          available: true
        }, {
          name: "Recycled Wood",
          available: false
        }, {
          name: "Teak Wood",
          available: false
        }],
        features: ["100% handmade by skilled artisans", "Sustainably sourced wood", "Natural oil finish for durability", "Wall mounting fixtures included", "Each piece is unique with natural variations"],
        specifications: {
          "Dimensions": "60 x 40 x 5 cm",
          "Weight": "2.5 kg",
          "Material": "Premium hardwood",
          "Finish": "Natural oil-based",
          "Care Instructions": "Wipe with dry or slightly damp cloth",
          "Country of Origin": "India"
        }
      };
      setProduct(mockProduct);
      setSelectedImage(mockProduct.images[0]);

      // Set first available color as default
      const firstAvailableColor = mockProduct.availableColors.find(color => color.available);
      if (firstAvailableColor) {
        setSelectedColor(firstAvailableColor.value);
      }

      // Set first available material as default
      const firstAvailableMaterial = mockProduct.availableMaterials.find(material => material.available);
      if (firstAvailableMaterial) {
        setSelectedMaterial(firstAvailableMaterial.name);
      }
      setLoading(false);

      // Check if item is wishlisted
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.includes(Number(productId)));
    }, 500);
  }, [productId]);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleColorSelect = (colorValue: string) => {
    const color = product?.availableColors.find(c => c.value === colorValue);
    if (color?.available) {
      setSelectedColor(colorValue);
    }
  };
  const handleMaterialSelect = (materialName: string) => {
    const material = product?.availableMaterials.find(m => m.name === materialName);
    if (material?.available) {
      setSelectedMaterial(materialName);
    }
  };
  const toggleWishlist = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      const filteredWishlist = wishlist.filter((id: number) => id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(filteredWishlist));
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`
      });
    } else {
      const newWishlist = [...wishlist, product.id];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`
      });
    }
    setIsWishlisted(!isWishlisted);
  };
  const addToCart = () => {
    if (!product) return;
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id && item.color === selectedColor && item.material === selectedMaterial);
    const price = product.offerPrice || product.price;
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price,
        imageUrl: product.images[0],
        quantity,
        color: selectedColor,
        colorName: product.availableColors.find(c => c.value === selectedColor)?.name || '',
        material: selectedMaterial
      });
    }

    // Calculate cart total
    const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total.toString());
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };
  const buyNow = () => {
    addToCart();
    navigate('/checkout');
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading product details...</div>
        </main>
        <Footer />
      </div>;
  }
  if (!product) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container-avirva">
          {/* Breadcrumbs */}
          <nav className="flex mb-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-gray-700">{product.category}</Link>
            {product.subcategory && <>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}/subcategory/${product.subcategory.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-gray-700">{product.subcategory}</Link>
              </>}
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img src={selectedImage} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => <div key={index} className={`aspect-square border rounded-md overflow-hidden cursor-pointer ${selectedImage === image ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`} onClick={() => setSelectedImage(image)}>
                    <img src={image} alt={`${product.name} - Image ${index + 1}`} className="w-full h-full object-cover" />
                  </div>)}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => <Star key={index} className={`h-4 w-4 ${index < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : index < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                </div>
                <span className="text-sm ml-2">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
              
              <div className="mb-6">
                {product.offerPrice ? <div className="flex items-center">
                    <span className="text-3xl font-bold text-teal-600">₹{product.offerPrice}</span>
                    <span className="ml-2 text-xl text-gray-400 line-through">₹{product.price}</span>
                    <span className="ml-2 text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded">
                      {Math.round((1 - product.offerPrice / product.price) * 100)}% off
                    </span>
                  </div> : <span className="text-3xl font-bold">₹{product.price}</span>}
                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              
              {/* Color Options */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((color, index) => <button key={index} className={`w-10 h-10 rounded-full flex items-center justify-center ${!color.available ? 'opacity-30 cursor-not-allowed relative' : ''} ${color.value === selectedColor ? 'ring-2 ring-indigo-400' : ''}`} style={{
                  backgroundColor: color.value
                }} onClick={() => handleColorSelect(color.value)} disabled={!color.available} title={color.name}>
                      {color.value === selectedColor && <Check className={`h-5 w-5 ${['#ffffff', '#e8dfd1', '#f5f5dc'].includes(color.value.toLowerCase()) ? 'text-black' : 'text-white'}`} />}
                      {!color.available}
                    </button>)}
                </div>
              </div>
              
              {/* Material Options */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Material:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.availableMaterials.map((material, index) => <button key={index} className={`px-4 py-2 rounded border ${material.name === selectedMaterial && material.available ? 'bg-indigo-100 border-indigo-400 text-indigo-700' : 'bg-white border-gray-200 text-gray-700'} ${!material.available ? 'opacity-50 cursor-not-allowed relative' : 'hover:bg-gray-50'}`} onClick={() => handleMaterialSelect(material.name)} disabled={!material.available}>
                      {material.name}
                      {!material.available}
                    </button>)}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity:</h3>
                <div className="flex items-center">
                  <button onClick={decreaseQuantity} className="w-10 h-10 border border-gray-300 rounded-l flex items-center justify-center">
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center font-medium">
                    {quantity}
                  </div>
                  <button onClick={increaseQuantity} className="w-10 h-10 border border-gray-300 rounded-r flex items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="flex-1 bg-indigo hover:bg-indigo-600" onClick={addToCart}>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button className="flex-1 bg-teal hover:bg-teal-600" onClick={buyNow}>
                  Buy Now
                </Button>
                
                <Button variant="outline" size="icon" className={`${isWishlisted ? 'text-red-500' : ''}`} onClick={toggleWishlist}>
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                </Button>
                
                <Button variant="outline" size="icon" onClick={() => {
                navigator.share({
                  title: product.name,
                  text: product.description,
                  url: window.location.href
                }).catch(() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link copied",
                    description: "Product link copied to clipboard"
                  });
                });
              }}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
              </div>
              
              {/* Specifications */}
              <div>
                <h3 className="text-lg font-medium mb-3">Specifications</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], index) => <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 text-sm font-medium">{key}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{value}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default ProductDetails;