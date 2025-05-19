
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3, 
  Home,
  Menu,
  Bell,
  ChevronDown,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash,
  Download,
  Upload,
  Plus,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import { useToast } from "@/hooks/use-toast";

// Mock data for categories
const CATEGORIES = [
  {
    id: "1",
    name: "Home Decor",
    slug: "home-decor",
    subcategories: ["Wall Art", "Planters", "Lighting"],
    products: 32,
    status: "Active"
  },
  {
    id: "2",
    name: "Miniatures",
    slug: "miniatures",
    subcategories: ["Vehicles", "Figurines", "Landmarks"],
    products: 28,
    status: "Active"
  },
  {
    id: "3",
    name: "Tech Gadgets",
    slug: "tech-gadgets",
    subcategories: ["Phone Stands", "Cable Organizers", "Key Holders"],
    products: 18,
    status: "Active"
  },
  {
    id: "4",
    name: "Seasonal Collections",
    slug: "seasonal-collections",
    subcategories: ["Diwali Specials", "Christmas Decor", "Back-to-School"],
    products: 24,
    status: "Active"
  },
  {
    id: "5",
    name: "Gifts & Custom",
    slug: "gifts-custom",
    subcategories: ["Personalized Nameplates", "Desk Accessories"],
    products: 15,
    status: "Active"
  }
];

const AdminCategories = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', subcategories: [''] });
  const { toast } = useToast();
  
  const toggleCategorySelection = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(categoryId => categoryId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(CATEGORIES.map(category => category.id));
    }
  };
  
  const filteredCategories = CATEGORIES.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportCategories = () => {
    toast({
      title: "Export started",
      description: "Your categories data export is being prepared",
    });
  };

  const handleDeleteCategories = () => {
    if (selectedCategories.length === 0) {
      toast({
        title: "No categories selected",
        description: "Please select at least one category to delete",
      });
      return;
    }

    toast({
      title: "Categories deleted",
      description: `Successfully deleted ${selectedCategories.length} categories`,
    });
    setSelectedCategories([]);
  };

  const handleAddSubcategory = () => {
    setNewCategory({
      ...newCategory,
      subcategories: [...newCategory.subcategories, '']
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    const updatedSubcategories = [...newCategory.subcategories];
    updatedSubcategories.splice(index, 1);
    setNewCategory({
      ...newCategory,
      subcategories: updatedSubcategories
    });
  };

  const handleSubcategoryChange = (index: number, value: string) => {
    const updatedSubcategories = [...newCategory.subcategories];
    updatedSubcategories[index] = value;
    setNewCategory({
      ...newCategory,
      subcategories: updatedSubcategories
    });
  };

  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name) {
      toast({
        title: "Validation error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Category added",
      description: `Successfully added ${newCategory.name} with ${newCategory.subcategories.filter(Boolean).length} subcategories`
    });
    
    setNewCategory({ name: '', subcategories: [''] });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
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
          <Link to="/admin/products" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link to="/admin/categories" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white mb-1">
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden mr-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
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
                <img 
                  src="https://randomuser.me/api/portraits/men/45.jpg" 
                  alt="Admin user" 
                  className="h-8 w-8 rounded-full mr-2" 
                />
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-1">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Logged out successfully",
                    description: "You have been logged out of the admin panel"
                  });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Categories content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Action bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    toast({
                      title: "Filter applied",
                      description: "Showing filtered category results"
                    });
                  }}
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleExportCategories}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button 
                  className="flex items-center gap-2 bg-teal hover:bg-teal-600"
                  onClick={() => setShowAddForm(true)}
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </div>
          </div>

          {/* Add Category Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Add New Category</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <form onSubmit={handleSubmitCategory}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category Name</label>
                    <Input 
                      type="text" 
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium">Subcategories</label>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        className="h-6 px-2"
                        onClick={handleAddSubcategory}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    
                    {newCategory.subcategories.map((subcategory, index) => (
                      <div key={index} className="flex items-center gap-2 mt-2">
                        <Input 
                          type="text"
                          value={subcategory}
                          onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                          placeholder="Enter subcategory name"
                          className="flex-grow"
                        />
                        {newCategory.subcategories.length > 1 && (
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 p-0 h-9 w-9"
                            onClick={() => handleRemoveSubcategory(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Category
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Categories table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-700 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      <Checkbox
                        checked={selectedCategories.length === CATEGORIES.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Subcategories</th>
                    <th className="px-4 py-3 font-medium">Products</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="border-b">
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategorySelection(category.id)}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{category.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories.map((sub, index) => (
                            <span 
                              key={index} 
                              className="inline-block px-2 py-0.5 bg-gray-100 text-xs rounded"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">{category.products}</td>
                      <td className="px-4 py-3">
                        <span 
                          className="inline-block px-2 py-0.5 text-xs rounded bg-green-100 text-green-800"
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              toast({
                                title: "Edit category",
                                description: `Opening details for ${category.name}`
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500"
                            onClick={() => {
                              toggleCategorySelection(category.id);
                              handleDeleteCategories();
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredCategories.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No categories found. Try a different search term.
              </div>
            )}
            
            {/* Bulk actions */}
            {selectedCategories.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {selectedCategories.length} categories selected
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeleteCategories}
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>
            )}
            
            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredCategories.length}</span> of{" "}
                <span className="font-medium">{CATEGORIES.length}</span> categories
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  onClick={() => {
                    toast({
                      title: "Previous page",
                      description: "Loading previous page of categories"
                    });
                  }}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  onClick={() => {
                    toast({
                      title: "Next page",
                      description: "Loading next page of categories"
                    });
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminCategories;
