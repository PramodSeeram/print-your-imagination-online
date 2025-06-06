
import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus, Upload, Check, Image, Tag, Tags } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  stock: z.string().min(1, 'Stock quantity is required'),
  sku: z.string().min(1, 'SKU is required'),
  status: z.string().min(1, 'Status is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  subcategory?: string;
  stock: number;
  sku: string;
  status: string;
  colors: string[];
  features: string[];
  imageUrl: string;
  images: string[];
  categories: string[];
  variants?: {color: string, size?: string, images: string[]}[];
  tags?: string[];
}

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  product?: Product;
  isEditing?: boolean;
}

const CATEGORIES = [
  'Home Decor',
  'Desk Accessories',
  'Miniatures',
  'Landmarks',
  'Gifts & Custom',
  'Personalized Nameplates',
  'Planters',
  'Lighting'
];

const COLORS = [
  'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 
  'Black', 'White', 'Gray', 'Gold', 'Silver', 'Natural Wood'
];

const AddProductForm: React.FC<AddProductFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  product, 
  isEditing = false 
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>(product?.colors || []);
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [newFeature, setNewFeature] = useState('');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [additionalImages, setAdditionalImages] = useState<string[]>(product?.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [variants, setVariants] = useState<{color: string, size?: string, images: string[]}[]>(
    product?.variants || []
  );
  const [newVariantColor, setNewVariantColor] = useState('');
  const [newVariantSize, setNewVariantSize] = useState('');
  const [newVariantImages, setNewVariantImages] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('');
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [productTags, setProductTags] = useState<string[]>(product?.tags || []);
  const [productStatus, setProductStatus] = useState<'Draft' | 'Live' | 'New' | 'Trending'>(
    (product?.status === 'Active' ? 'Live' : product?.status) as 'Draft' | 'Live' | 'New' | 'Trending' || 'Draft'
  );
  const [tagsReflect, setTagsReflect] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price || '',
      description: product?.description || '',
      category: product?.category || '',
      subcategory: product?.subcategory || '',
      stock: product?.stock?.toString() || '',
      sku: product?.sku || '',
      status: product?.status || 'Active',
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const productData: Omit<Product, 'id'> = {
      name: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
      subcategory: data.subcategory,
      stock: parseInt(data.stock),
      sku: data.sku,
      status: productStatus,
      colors: selectedColors,
      features,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1544376798-76d0953d1506?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: additionalImages,
      categories: [data.category],
      variants,
      tags: [...productTags, ...tagsReflect],
    };
    
    onSave(productData);
    toast({
      title: isEditing ? 'Product Updated' : 'Product Created',
      description: `${data.name} has been ${isEditing ? 'updated' : 'created'} successfully.`,
    });
    onClose();
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  
  const addCustomColor = () => {
    if (newColor.trim() && !selectedColors.includes(newColor.trim())) {
      setSelectedColors([...selectedColors, newColor.trim()]);
      setCustomColors([...customColors, newColor.trim()]);
      setNewColor('');
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, type: 'main' | 'additional' | 'variant') => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        
        if (type === 'main') {
          setImageUrl(dataUrl);
        } else if (type === 'additional') {
          setAdditionalImages(prev => [...prev, dataUrl]);
        } else {
          setNewVariantImages(prev => [...prev, dataUrl]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addImage = () => {
    if (newImageUrl.trim() && !additionalImages.includes(newImageUrl.trim())) {
      setAdditionalImages([...additionalImages, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const removeImage = (imageUrl: string) => {
    setAdditionalImages(additionalImages.filter(img => img !== imageUrl));
  };
  
  const addVariant = () => {
    if (newVariantColor && newVariantImages.length > 0) {
      setVariants([
        ...variants, 
        {
          color: newVariantColor,
          size: newVariantSize || undefined,
          images: [...newVariantImages]
        }
      ]);
      setNewVariantColor('');
      setNewVariantSize('');
      setNewVariantImages([]);
    } else {
      toast({
        title: 'Missing variant information',
        description: 'Please add a color and at least one image for the variant.',
        variant: 'destructive'
      });
    }
  };
  
  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };
  
  const toggleTagReflect = (tag: 'Trending' | 'Most sold' | 'Discounts') => {
    if (tagsReflect.includes(tag)) {
      setTagsReflect(tagsReflect.filter(t => t !== tag));
    } else {
      setTagsReflect([...tagsReflect, tag]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="₹999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter stock quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Main Image */}
            <div>
              <Label>Main Product Image</Label>
              <div className="mt-2 space-y-3">
                <Input
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && (
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <img src={imageUrl} alt="Product preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <Label>Additional Images</Label>
              <div className="mt-2 space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter additional image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <Button type="button" onClick={addImage} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {additionalImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {additionalImages.map((img, index) => (
                      <div key={index} className="relative">
                        <div className="w-20 h-20 border rounded-lg overflow-hidden">
                          <img src={img} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white hover:bg-red-600"
                          onClick={() => removeImage(img)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Colors */}
            <div>
              <Label>Available Colors</Label>
              <div className="mt-2 grid grid-cols-4 md:grid-cols-7 gap-2">
                {COLORS.map((color) => (
                  <Button
                    key={color}
                    type="button"
                    variant={selectedColors.includes(color) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleColor(color)}
                    className="text-xs"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <Label>Product Features</Label>
              <div className="mt-2 space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter product feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full"
                      >
                        {feature}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 hover:bg-red-100"
                          onClick={() => removeFeature(feature)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal hover:bg-teal-600">
                {isEditing ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProductForm;
