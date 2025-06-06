import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Package, ShoppingBag, Users, Settings, BarChart3, Home, Menu, Bell, ChevronDown, PlusCircle, Search, Filter, Edit, Trash, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import AddProductForm from '@/components/AddProductForm';
import { useToast } from '@/hooks/use-toast';

// Product interface matching the one in AddProductForm
interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
  categories: string[];
  status: string;
  imageUrl: string;
  description: string;
  category: string;
  subcategory?: string;
  sku: string;
  colors: string[];
  features: string[];
  images: string[];
}

// Initial mock data for products
const INITIAL_PRODUCTS: Product[] = [{
  id: "1",
  name: "Customizable Desk Organizer",
  price: "₹699",
  stock: 45,
  categories: ["Home Decor", "Desk Accessories"],
  status: "Active",
  imageUrl: "https://images.unsplash.com/photo-1544376798-76d0953d1506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  description: "A versatile desk organizer that can be customized to fit your workspace needs.",
  category: "Home Decor",
  sku: "DO-001",
  colors: ["Natural Wood", "Black", "White"],
  features: ["Customizable compartments", "Eco-friendly material", "Easy assembly"],
  images: []
}, {
  id: "2",
  name: "Miniature Taj Mahal",
  price: "₹799",
  stock: 32,
  categories: ["Miniatures", "Landmarks"],
  status: "Active",
  imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  description: "Detailed miniature replica of the iconic Taj Mahal.",
  category: "Miniatures",
  sku: "TM-001",
  colors: ["White", "Gold"],
  features: ["Hand-crafted details", "Premium materials", "Perfect for display"],
  images: []
}, {
  id: "3",
  name: "Family Name Plate",
  price: "₹999",
  stock: 18,
  categories: ["Gifts & Custom", "Personalized Nameplates"],
  status: "Active",
  imageUrl: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  description: "Personalized family name plate for your home.",
  category: "Gifts & Custom",
  sku: "NP-001",
  colors: ["Natural Wood", "Black", "Brown"],
  features: ["Personalized engraving", "Weather resistant", "Easy mounting"],
  images: []
}, {
  id: "4",
  name: "Geometric Plant Holder",
  price: "₹599",
  stock: 27,
  categories: ["Home Decor", "Planters"],
  status: "Out of Stock",
  imageUrl: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  description: "Modern geometric design plant holder for indoor plants.",
  category: "Home Decor",
  sku: "PH-001",
  colors: ["Black", "White", "Gold"],
  features: ["Modern design", "Drainage system", "Multiple sizes"],
  images: []
}, {
  id: "5",
  name: "Geometric Lamp Shade",
  price: "₹1,499",
  stock: 15,
  categories: ["Home Decor", "Lighting"],
  status: "Active",
  imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  description: "Elegant geometric lamp shade for ambient lighting.",
  category: "Home Decor",
  sku: "LS-001",
  colors: ["Black", "White", "Gold", "Silver"],
  features: ["Geometric design", "LED compatible", "Easy installation"],
  images: []
}];
const AdminProducts = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const {
    toast
  } = useToast();
  const toggleProductSelection = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };
  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
    setShowAddForm(false);
  };
  const handleEditProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      const updatedProducts = products.map(product => product.id === editingProduct.id ? {
        ...productData,
        id: editingProduct.id
      } : product);
      setProducts(updatedProducts);
      setEditingProduct(null);
    }
  };
  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
      toast({
        title: 'Product Deleted',
        description: 'The product has been successfully deleted.',
        variant: 'destructive'
      });
    }
  };
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedProducts.length} product(s)?`)) {
      setProducts(products.filter(product => !selectedProducts.includes(product.id)));
      setSelectedProducts([]);
      toast({
        title: 'Products Deleted',
        description: `${selectedProducts.length} product(s) have been successfully deleted.`,
        variant: 'destructive'
      });
    }
  };
  return <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - reuse from Admin.tsx */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <Logo withText={false} />
            <span className="ml-3 text-xl font-semibold">AVIRVA Admin</span>
          </div>
        </div>

        <nav className="flex-grow p-4">
          <p className="text-xs text-gray-400 font-medium mb-3 uppercase">Dashboard</p>
          <Link to="/admin" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Overview
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Products</p>
          <Link to="/admin/products" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white mb-1">
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link to="/admin/categories" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Categories
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Orders</p>
          <Link to="/admin/orders" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Customers</p>
          <Link to="/admin/customers" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Analytics</p>
          <Link to="/admin/analytics" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <BarChart3 className="h-5 w-5 mr-3" />
            Reports
          </Link>
          
          <div className="mt-6">
            <Link to="/admin/settings" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
          
          <div className="mt-auto pt-6">
            <Link to="/" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
              <Home className="h-5 w-5 mr-3" />
              Go to Website
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <AdminMobileNavigation isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Admin header */}
        <header className="bg-white shadow-sm border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Products</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="hidden md:block border-l border-gray-300 h-6 mx-2" />
              <div className="hidden md:flex items-center">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Admin user" className="h-8 w-8 rounded-full mr-2" />
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-1">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </header>

        {/* Products content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Action bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input type="text" placeholder="Search products..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                {selectedProducts.length > 0 && <Button variant="destructive" onClick={handleBulkDelete} className="flex items-center gap-2">
                    <Trash className="h-4 w-4" />
                    Delete Selected ({selectedProducts.length})
                  </Button>}
                <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800">
                  <PlusCircle className="h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </div>
          </div>

          {/* Products table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-700 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={toggleSelectAll} />
                    </th>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">SKU</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium">Categories</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => <tr key={product.id} className="border-b">
                      <td className="px-4 py-3">
                        <Checkbox checked={selectedProducts.includes(product.id)} onCheckedChange={() => toggleProductSelection(product.id)} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded mr-3 flex-shrink-0 overflow-hidden">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 block">{product.name}</span>
                            {product.description && <span className="text-xs text-gray-500 block truncate max-w-xs">
                                {product.description}
                              </span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{product.sku || 'N/A'}</td>
                      <td className="px-4 py-3 font-medium">{product.price}</td>
                      <td className="px-4 py-3">
                        <span className={`${product.stock <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {product.categories.map((category, index) => <span key={index} className="inline-block px-2 py-0.5 bg-gray-100 text-xs rounded">
                              {category}
                            </span>)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 text-xs rounded ${product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            
            {filteredProducts.length === 0 && <div className="py-8 text-center text-gray-500">
                No products found. Try a different search term.
              </div>}
            
            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
                <span className="font-medium">{products.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Product Form */}
      <AddProductForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} onSave={handleAddProduct} />

      {/* Edit Product Form */}
      <AddProductForm isOpen={!!editingProduct} onClose={() => setEditingProduct(null)} onSave={handleEditProduct} product={editingProduct || undefined} isEditing={true} />
    </div>;
};
export default AdminProducts;