import React, { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  align: 'left' | 'right' | 'center';
  isActive: boolean;
}

const AdminSlideshowManager = () => {
  const [slides, setSlides] = useState<SlideData[]>([
    {
      id: '1',
      title: 'Print Your Imagination',
      subtitle: 'Unique 3D printed products for your home and lifestyle',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ctaText: 'Shop Now',
      ctaLink: '/category/1',
      align: 'left',
      isActive: true
    },
    {
      id: '2',
      title: 'Festive Collection',
      subtitle: 'Celebrate with our exclusive Diwali collection',
      imageUrl: 'https://images.unsplash.com/photo-1560352857-1e77568687cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      ctaText: 'Explore',
      ctaLink: '/category/4/subcategory/10',
      align: 'right',
      isActive: true
    }
  ]);

  const [editingSlide, setEditingSlide] = useState<SlideData | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSlide, setNewSlide] = useState<Partial<SlideData>>({
    title: '',
    subtitle: '',
    imageUrl: '',
    ctaText: '',
    ctaLink: '',
    align: 'left',
    isActive: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      
      if (isEditing && editingSlide) {
        setEditingSlide({ ...editingSlide, imageUrl: dataUrl });
      } else {
        setNewSlide({ ...newSlide, imageUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const addSlide = () => {
    if (newSlide.title && newSlide.subtitle && newSlide.imageUrl && newSlide.ctaText) {
      const slideToAdd: SlideData = {
        id: Date.now().toString(),
        title: newSlide.title!,
        subtitle: newSlide.subtitle!,
        imageUrl: newSlide.imageUrl!,
        ctaText: newSlide.ctaText!,
        ctaLink: newSlide.ctaLink || '#',
        align: newSlide.align as 'left' | 'right' | 'center' || 'left',
        isActive: newSlide.isActive ?? true
      };

      setSlides([...slides, slideToAdd]);
      setNewSlide({ title: '', subtitle: '', imageUrl: '', ctaText: '', ctaLink: '', align: 'left', isActive: true });
      setIsAddingNew(false);
      
      // Store in localStorage for persistence
      localStorage.setItem('heroSlides', JSON.stringify([...slides, slideToAdd]));
      
      toast({
        title: 'Slide added successfully',
        description: 'The new slide has been added to the slideshow.'
      });
    } else {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
    }
  };

  const updateSlide = () => {
    if (editingSlide) {
      const updatedSlides = slides.map(slide => 
        slide.id === editingSlide.id ? editingSlide : slide
      );
      setSlides(updatedSlides);
      setEditingSlide(null);
      
      // Store in localStorage
      localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
      
      toast({
        title: 'Slide updated successfully',
        description: 'The slide has been updated.'
      });
    }
  };

  const deleteSlide = (id: string) => {
    const updatedSlides = slides.filter(slide => slide.id !== id);
    setSlides(updatedSlides);
    
    // Store in localStorage
    localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
    
    toast({
      title: 'Slide deleted',
      description: 'The slide has been removed from the slideshow.'
    });
  };

  const toggleSlideStatus = (id: string) => {
    const updatedSlides = slides.map(slide => 
      slide.id === id ? { ...slide, isActive: !slide.isActive } : slide
    );
    setSlides(updatedSlides);
    
    // Store in localStorage
    localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
  };

  const makeChangesLive = () => {
    // Trigger a custom event to update the slideshow
    const event = new CustomEvent('slideshowUpdated', { detail: slides });
    window.dispatchEvent(event);
    
    toast({
      title: 'Changes are now live!',
      description: 'The slideshow has been updated on the website.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-black">Slideshow Manager</h2>
          <p className="text-gray-600">Manage hero banner slides for the homepage</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddingNew(true)} className="bg-black text-white hover:bg-gray-800">
            Add New Slide
          </Button>
          <Button onClick={makeChangesLive} className="bg-green-600 text-white hover:bg-green-700">
            Make Changes Live
          </Button>
        </div>
      </div>

      {/* Active Slides */}
      <div className="grid gap-4">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Slide {index + 1}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={slide.isActive ? "default" : "secondary"}>
                    {slide.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSlideStatus(slide.id)}
                  >
                    {slide.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSlide(slide)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSlide(slide.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Title</Label>
                    <p className="text-lg font-semibold">{slide.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Subtitle</Label>
                    <p className="text-gray-600">{slide.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm font-medium">Button Text</Label>
                      <p className="text-sm">{slide.ctaText}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Alignment</Label>
                      <p className="text-sm capitalize">{slide.align}</p>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={slide.imageUrl} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Slide Modal */}
      {isAddingNew && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Add New Slide</CardTitle>
              <Button variant="ghost" onClick={() => setIsAddingNew(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newSlide.title || ''}
                    onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                    placeholder="Enter slide title"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle *</Label>
                  <Input
                    id="subtitle"
                    value={newSlide.subtitle || ''}
                    onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                    placeholder="Enter slide subtitle"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaText">Button Text *</Label>
                  <Input
                    id="ctaText"
                    value={newSlide.ctaText || ''}
                    onChange={(e) => setNewSlide({ ...newSlide, ctaText: e.target.value })}
                    placeholder="e.g., Shop Now"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLink">Button Link</Label>
                  <Input
                    id="ctaLink"
                    value={newSlide.ctaLink || ''}
                    onChange={(e) => setNewSlide({ ...newSlide, ctaLink: e.target.value })}
                    placeholder="/category/1"
                  />
                </div>
                <div>
                  <Label htmlFor="align">Text Alignment</Label>
                  <Select value={newSlide.align} onValueChange={(value) => setNewSlide({ ...newSlide, align: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Upload Image *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    {newSlide.imageUrl ? (
                      <div className="space-y-2">
                        <img 
                          src={newSlide.imageUrl} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-lg mx-auto"
                        />
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="text-gray-500">Click to upload slide image</p>
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                          Upload Image
                        </Button>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleImageUpload(e)}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
              <Button onClick={addSlide} className="bg-black text-white hover:bg-gray-800">
                Add Slide
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Slide Modal */}
      {editingSlide && (
        <Card className="border-2 border-blue-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Edit Slide</CardTitle>
              <Button variant="ghost" onClick={() => setEditingSlide(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingSlide.title}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-subtitle">Subtitle</Label>
                  <Input
                    id="edit-subtitle"
                    value={editingSlide.subtitle}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-ctaText">Button Text</Label>
                  <Input
                    id="edit-ctaText"
                    value={editingSlide.ctaText}
                    onChange={(e) => setEditingSlide({ ...editingSlide, ctaText: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-ctaLink">Button Link</Label>
                  <Input
                    id="edit-ctaLink"
                    value={editingSlide.ctaLink}
                    onChange={(e) => setEditingSlide({ ...editingSlide, ctaLink: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Text Alignment</Label>
                  <Select value={editingSlide.align} onValueChange={(value) => setEditingSlide({ ...editingSlide, align: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Current Image</Label>
                <div className="space-y-2">
                  <img 
                    src={editingSlide.imageUrl} 
                    alt="Current" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Change Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, true)}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingSlide(null)}>
                Cancel
              </Button>
              <Button onClick={updateSlide} className="bg-black text-white hover:bg-gray-800">
                Update Slide
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSlideshowManager;