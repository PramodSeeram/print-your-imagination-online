
import React, { useState, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon, X } from "lucide-react";

const Tickets = () => {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [ticketSent, setTicketSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    
    // Check if user is trying to upload more than 3 images
    if (files.length + images.length > 3) {
      toast({
        title: "Upload limit reached",
        description: "You can only upload a maximum of 3 images per ticket",
        variant: "destructive"
      });
      return;
    }
    
    // Create previews and add new files
    const newImageFiles = [...images];
    const newImagePreviews = [...imagePreviewUrls];
    
    files.forEach(file => {
      if (file.type.match(/^image\/(jpeg|jpg|png|gif)$/)) {
        newImageFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setImagePreviewUrls(prevUrls => [...prevUrls, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Unsupported file format",
          description: "Please upload only image files (JPEG, PNG, GIF)",
          variant: "destructive"
        });
      }
    });
    
    setImages(newImageFiles);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newImagePreviewUrls = [...imagePreviewUrls];
    
    newImages.splice(index, 1);
    newImagePreviewUrls.splice(index, 1);
    
    setImages(newImages);
    setImagePreviewUrls(newImagePreviewUrls);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!subject || !category || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // In a real app, this would send data to the server
    // along with any attached images
    setTimeout(() => {
      // Save ticket to localStorage for demo purposes
      const tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
      const newTicket = {
        id: `TKT-${Date.now()}`,
        subject,
        category,
        message,
        status: 'Open',
        created: new Date().toISOString(),
        images: imagePreviewUrls.map((url, index) => ({
          id: `img-${Date.now()}-${index}`,
          url
        }))
      };
      
      tickets.push(newTicket);
      localStorage.setItem('supportTickets', JSON.stringify(tickets));
      
      // Display success message
      toast({
        title: "Ticket submitted successfully",
        description: "We'll get back to you as soon as possible"
      });
      
      // Reset form
      setTicketSent(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const startNewTicket = () => {
    setTicketSent(false);
    setSubject("");
    setCategory("");
    setMessage("");
    setImages([]);
    setImagePreviewUrls([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container-avirva max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Customer Support</h1>
          
          {ticketSent ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-teal-500">Ticket Submitted!</CardTitle>
                <CardDescription className="text-center">
                  Thank you for contacting us. We have received your support request.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">
                  One of our support agents will review your ticket and respond shortly. You can check the status of your tickets in your account dashboard.
                </p>
                <Button onClick={startNewTicket}>Submit Another Ticket</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Fill out the form below to get assistance from our team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category *
                    </label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Order Issue</SelectItem>
                        <SelectItem value="product">Product Inquiry</SelectItem>
                        <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                        <SelectItem value="returns">Returns & Refunds</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue in detail"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Image upload section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Attach Images (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="w-24 h-24 border rounded-md overflow-hidden">
                            <img 
                              src={url} 
                              alt={`Preview ${index}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-90 hover:opacity-100"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      
                      {imagePreviewUrls.length < 3 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50"
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            multiple
                          />
                          <ImageIcon size={24} className="mb-1" />
                          <span className="text-xs">Add Image</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      You can upload up to 3 images (JPEG, PNG, GIF)
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-indigo hover:bg-indigo-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-8 text-center text-gray-600">
            <p>Need immediate assistance? Contact us directly:</p>
            <p className="font-medium">support@avirva.com | +1 (800) 123-4567</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tickets;
