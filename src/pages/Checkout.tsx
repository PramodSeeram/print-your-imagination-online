import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}
const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);
  const [addressOption, setAddressOption] = useState<'new' | 'saved'>('new');
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const [saveAddress, setSaveAddress] = useState(false);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // States list for India
  const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"];

  // Load cart data from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    const storedTotal = localStorage.getItem('cartTotal');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
    if (storedTotal) {
      setTotal(Number(storedTotal));
    } else {
      // Redirect to cart if no total found
      navigate('/cart');
    }

    // Load saved addresses if exists
    const savedAddressesStr = localStorage.getItem('savedAddresses');
    if (savedAddressesStr) {
      const addresses = JSON.parse(savedAddressesStr);
      setSavedAddresses(addresses);

      // If we have saved addresses, default to using them
      if (addresses.length > 0) {
        setAddressOption('saved');
        setShippingAddress(addresses[0]);
      }
    }

    // Load user profile data if available
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      if (profile.defaultAddress) {
        setShippingAddress(profile.defaultAddress);
      }
    }
  }, [navigate]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleStateChange = (value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      state: value
    }));
  };
  const handleAddressOptionChange = (value: 'new' | 'saved') => {
    setAddressOption(value);
    if (value === 'saved' && savedAddresses.length > 0) {
      setShippingAddress(savedAddresses[selectedAddressIndex]);
    }
  };
  const handleSavedAddressChange = (index: number) => {
    setSelectedAddressIndex(index);
    setShippingAddress(savedAddresses[index]);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    const requiredFields = Object.entries(shippingAddress).filter(([key, value]) => !value);
    if (requiredFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save address if checked
    if (saveAddress && addressOption === 'new') {
      const newSavedAddresses = [...savedAddresses, shippingAddress];
      localStorage.setItem('savedAddresses', JSON.stringify(newSavedAddresses));
      setSavedAddresses(newSavedAddresses);
    }

    // Save order details for payment page
    localStorage.setItem('orderDetails', JSON.stringify({
      items: cartItems,
      total,
      shippingAddress
    }));

    // Navigate to payment page
    navigate('/payment');
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16 bg-gray-50">
        <div className="container-avirva">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Information Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                
                <form onSubmit={handleSubmit}>
                  {savedAddresses.length > 0 && <div className="mb-6">
                      <RadioGroup value={addressOption} onValueChange={v => handleAddressOptionChange(v as 'new' | 'saved')} className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="saved" id="saved" />
                          <Label htmlFor="saved">Use saved address</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new">Add new address</Label>
                        </div>
                      </RadioGroup>
                    </div>}

                  {addressOption === 'saved' && savedAddresses.length > 0 ? <div className="space-y-4 mb-6">
                      <Label>Select an address</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {savedAddresses.map((address, index) => <Card key={index} className={`cursor-pointer ${selectedAddressIndex === index ? 'ring-2 ring-indigo' : ''}`} onClick={() => handleSavedAddressChange(index)}>
                            <CardHeader className="p-4">
                              <CardTitle className="text-base">{address.firstName} {address.lastName}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 text-sm">
                              <p>{address.address}</p>
                              <p>{address.city}, {address.state} - {address.pincode}</p>
                              <p className="mt-1">{address.phone}</p>
                            </CardContent>
                          </Card>)}
                      </div>
                    </div> : <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" value={shippingAddress.firstName} onChange={handleInputChange} required />
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" value={shippingAddress.lastName} onChange={handleInputChange} required />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" value={shippingAddress.email} onChange={handleInputChange} required />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" type="tel" value={shippingAddress.phone} onChange={handleInputChange} required />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={shippingAddress.address} onChange={handleInputChange} required />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
                        </div>
                        
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Select onValueChange={handleStateChange} value={shippingAddress.state}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input id="pincode" name="pincode" value={shippingAddress.pincode} onChange={handleInputChange} required />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-6">
                        <Checkbox id="saveAddress" checked={saveAddress} onCheckedChange={checked => setSaveAddress(!!checked)} />
                        <Label htmlFor="saveAddress" className="text-sm text-gray-600">
                          Save this address for future orders
                        </Label>
                      </div>
                    </>}
                  
                  <Button type="submit" className="w-full text-zinc-950 bg-zinc-500 hover:bg-zinc-400">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="font-semibold text-lg">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-4">
                    {cartItems.map(item => <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">₹{item.price * item.quantity}</p>
                      </div>)}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{total - (total >= 599 ? 0 : 99)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {total >= 599 ? "Free" : "₹99"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Checkout;