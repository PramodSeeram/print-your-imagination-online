
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Package, Truck, Clock, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const OrderConfirmation = () => {
  const [orderId, setOrderId] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedOrderId = localStorage.getItem('latestOrderId');
    
    if (storedOrderId) {
      setOrderId(storedOrderId);
    } else {
      // If no order ID exists, redirect to home
      navigate('/');
    }
    
    // Show success toast
    toast({
      title: "Order placed successfully",
      description: "Thank you for your purchase!",
    });
  }, [navigate, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva max-w-3xl">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order Details</h2>
                <span className="text-gray-500">#{orderId}</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Order Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Payment Method</span>
                  <span>Credit Card</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="text-indigo font-medium">Confirming</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-left">Tracking</h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                
                <div className="relative flex mb-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo rounded-full flex items-center justify-center z-10">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Order Confirmed</h3>
                    <p className="text-gray-500 text-sm">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="relative flex mb-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-500">Printing</h3>
                    <p className="text-gray-500 text-sm">Estimated: {new Date(Date.now() + 2*24*60*60*1000).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="relative flex mb-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
                    <Truck className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-500">Shipped</h3>
                    <p className="text-gray-500 text-sm">Estimated: {new Date(Date.now() + 4*24*60*60*1000).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="relative flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
                    <Clock className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-500">Delivered</h3>
                    <p className="text-gray-500 text-sm">Estimated: {new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-x-4">
              <Button asChild className="bg-indigo hover:bg-indigo-600">
                <Link to="/">
                  Continue Shopping
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/account">
                  Track Order <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
