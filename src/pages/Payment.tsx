
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Landmark, 
  Wallet, 
  QrCode, 
  Check, 
  ArrowRight,
  Clock
} from 'lucide-react';

interface OrderDetails {
  items: CartItem[];
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const Payment = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load order details from localStorage
  useEffect(() => {
    const storedDetails = localStorage.getItem('orderDetails');
    
    if (storedDetails) {
      setOrderDetails(JSON.parse(storedDetails));
    } else {
      // Redirect to checkout if no order details found
      navigate('/checkout');
    }
  }, [navigate]);

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim().substring(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardDetails(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setCardDetails(prev => ({
      ...prev,
      expiryDate: formattedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "creditCard") {
      // Basic validation for credit card
      if (cardDetails.cardNumber.length < 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid card number",
          variant: "destructive"
        });
        return;
      }
      
      if (!cardDetails.nameOnCard) {
        toast({
          title: "Name required",
          description: "Please enter the name on your card",
          variant: "destructive"
        });
        return;
      }
      
      if (cardDetails.expiryDate.length < 5) {
        toast({
          title: "Invalid expiry date",
          description: "Please enter a valid expiry date (MM/YY)",
          variant: "destructive"
        });
        return;
      }
      
      if (cardDetails.cvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid CVV code",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate a random order ID
      const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
      
      // Store order ID and clear cart data
      localStorage.setItem('latestOrderId', orderId);
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');
      localStorage.removeItem('orderDetails');
      
      // Navigate to success page
      navigate('/order-confirmation');
    }, 2000);
  };

  if (!orderDetails) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16 bg-gray-50">
        <div className="container-avirva">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                
                <form onSubmit={handleSubmit}>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4 mb-6"
                  >
                    <div className={`flex items-center space-x-2 p-4 border rounded-md ${paymentMethod === "creditCard" ? "border-indigo bg-indigo-50" : "border-gray-200"}`}>
                      <RadioGroupItem value="creditCard" id="creditCard" />
                      <Label htmlFor="creditCard" className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-indigo" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 border rounded-md ${paymentMethod === "netBanking" ? "border-indigo bg-indigo-50" : "border-gray-200"}`}>
                      <RadioGroupItem value="netBanking" id="netBanking" />
                      <Label htmlFor="netBanking" className="flex items-center">
                        <Landmark className="mr-2 h-5 w-5 text-indigo" />
                        Net Banking
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 border rounded-md ${paymentMethod === "upi" ? "border-indigo bg-indigo-50" : "border-gray-200"}`}>
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center">
                        <QrCode className="mr-2 h-5 w-5 text-indigo" />
                        UPI Payment
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 border rounded-md ${paymentMethod === "wallet" ? "border-indigo bg-indigo-50" : "border-gray-200"}`}>
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center">
                        <Wallet className="mr-2 h-5 w-5 text-indigo" />
                        Digital Wallet
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "creditCard" && (
                    <div className="space-y-4 mb-6 border-t border-gray-100 pt-6">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={cardDetails.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={cardDetails.nameOnCard}
                          onChange={handleCardInputChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={cardDetails.expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                            placeholder="123"
                            maxLength={3}
                            type="password"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === "netBanking" && (
                    <div className="space-y-4 mb-6 border-t border-gray-100 pt-6">
                      <p className="text-gray-600">Select your bank to proceed with net banking payment.</p>
                      <p className="text-gray-600">You will be redirected to your bank's secure payment page.</p>
                      {/* Bank selection would go here in a real implementation */}
                    </div>
                  )}
                  
                  {paymentMethod === "upi" && (
                    <div className="space-y-4 mb-6 border-t border-gray-100 pt-6">
                      <p className="text-gray-600">Enter your UPI ID to make payment.</p>
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="username@bankname"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === "wallet" && (
                    <div className="space-y-4 mb-6 border-t border-gray-100 pt-6">
                      <p className="text-gray-600">Select your digital wallet to proceed with payment.</p>
                      <p className="text-gray-600">You will be redirected to complete the payment.</p>
                      {/* Wallet selection would go here in a real implementation */}
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={() => navigate('/checkout')}
                    >
                      Back to Shipping
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="bg-indigo hover:bg-indigo-600 min-w-[150px]"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Pay ₹{orderDetails.total} <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
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
                    {orderDetails.items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{orderDetails.total - (orderDetails.total >= 599 ? 0 : 99)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {orderDetails.total >= 599 ? "Free" : "₹99"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{orderDetails.total}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <address className="not-italic text-gray-600">
                      {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}<br />
                      {orderDetails.shippingAddress.address}<br />
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.pincode}<br />
                      {orderDetails.shippingAddress.phone}
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
