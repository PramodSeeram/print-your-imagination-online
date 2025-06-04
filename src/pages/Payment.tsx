import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard, Building, Lock, Check, X, Tag, CreditCard as CreditCardIcon, Coins } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
interface OrderDetails {
  items: any[];
  total: number;
  shippingAddress: any;
}
const Payment = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // Valid promo codes
  const PROMO_CODES = [{
    code: 'WELCOME10',
    discount: 10
  },
  // 10% off
  {
    code: 'SUMMER25',
    discount: 25
  },
  // 25% off
  {
    code: 'FREESHIP',
    discount: 99
  } // Free shipping (₹99 off)
  ];

  // Points to rupee conversion rate
  const POINTS_TO_RUPEE = 0.1; // 1 point = ₹0.10

  useEffect(() => {
    // Load order details from localStorage
    const storedOrder = localStorage.getItem('orderDetails');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    } else {
      // Redirect to checkout if no order details found
      navigate('/checkout');
    }

    // Load loyalty points (In a real app, this would come from user profile)
    const storedPoints = localStorage.getItem('loyaltyPoints');
    const points = storedPoints ? parseInt(storedPoints) : 250; // Default 250 points for demo
    setLoyaltyPoints(points);
  }, [navigate]);
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      // Format as XXXX XXXX XXXX XXXX
      value = value.match(/.{1,4}/g)?.join(' ') || '';
    }
    if (value.length <= 19) {
      // 16 digits + 3 spaces
      setCardNumber(value);
    }
  };
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      // Format as MM/YY
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }
    if (value.length <= 5) {
      // MM/YY
      setCardExpiry(value);
    }
  };
  const handleCardCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCardCVV(value);
    }
  };
  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast({
        title: "Empty promo code",
        description: "Please enter a promo code",
        variant: "destructive"
      });
      return;
    }

    // Check if promo code is valid
    const foundPromo = PROMO_CODES.find(promo => promo.code.toUpperCase() === promoCode.toUpperCase());
    if (foundPromo) {
      setPromoApplied(foundPromo);
      toast({
        title: "Promo code applied",
        description: `${foundPromo.code} applied successfully!`
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "The entered promo code is invalid or expired",
        variant: "destructive"
      });
    }
  };
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, '')) || 0;
    setPointsToUse(Math.min(value, loyaltyPoints));
  };
  const calculateDiscount = () => {
    if (!orderDetails) return 0;
    let discount = 0;

    // Add promo code discount
    if (promoApplied) {
      if (promoApplied.code === 'FREESHIP') {
        // Free shipping
        discount += 99; // Shipping cost
      } else {
        // Percentage discount
        discount += orderDetails.total * promoApplied.discount / 100;
      }
    }

    // Add loyalty points discount
    if (useLoyaltyPoints && pointsToUse > 0) {
      discount += pointsToUse * POINTS_TO_RUPEE;
    }
    return Math.min(discount, orderDetails.total - 1); // Ensure there's at least ₹1 to pay
  };
  const calculateFinalAmount = () => {
    if (!orderDetails) return 0;
    return Math.max(orderDetails.total - calculateDiscount(), 1);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
      toast({
        title: "Missing information",
        description: "Please fill in all payment details",
        variant: "destructive"
      });
      return;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Generate order ID
      const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;

      // Store order ID in localStorage
      localStorage.setItem('latestOrderId', orderId);

      // Store order details with promo code info for admin
      const orderData = {
        ...orderDetails,
        orderId,
        paymentDate: new Date().toISOString(),
        promoApplied: promoApplied ? promoApplied.code : null,
        loyaltyPointsUsed: useLoyaltyPoints ? pointsToUse : 0,
        finalAmount: calculateFinalAmount()
      };

      // Store in admin orders
      const adminOrders = localStorage.getItem('adminOrders') ? JSON.parse(localStorage.getItem('adminOrders') || '[]') : [];
      localStorage.setItem('adminOrders', JSON.stringify([...adminOrders, orderData]));

      // Update loyalty points if used
      if (useLoyaltyPoints && pointsToUse > 0) {
        const newPoints = loyaltyPoints - pointsToUse;
        localStorage.setItem('loyaltyPoints', newPoints.toString());
      }

      // Add loyalty points earned from purchase (10% of amount spent)
      const pointsEarned = Math.round(calculateFinalAmount() * 0.1);
      localStorage.setItem('loyaltyPoints', (loyaltyPoints - (useLoyaltyPoints ? pointsToUse : 0) + pointsEarned).toString());

      // Clear cart
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');

      // Navigate to order confirmation
      navigate('/order-confirmation');
    }, 1500);
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container-avirva">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Card Details */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="cardNumber" className="flex items-center">
                        <CreditCardIcon className="h-4 w-4 mr-2" />
                        Card Number
                      </Label>
                      <Input id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000" className="mt-1" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name on card" className="mt-1" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input id="cardExpiry" value={cardExpiry} onChange={handleCardExpiryChange} placeholder="MM/YY" className="mt-1" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardCvv">Security Code (CVV)</Label>
                        <Input id="cardCvv" type="password" value={cardCVV} onChange={handleCardCVVChange} placeholder="CVV" className="mt-1" required />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveCard" checked={saveCard} onCheckedChange={checked => setSaveCard(!!checked)} />
                      <Label htmlFor="saveCard" className="text-sm text-gray-600">
                        Save card for future purchases
                      </Label>
                    </div>
                  </div>
                  
                  {/* Promo Code Section */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5 text-indigo" />
                      <h3 className="font-semibold">Promo Code</h3>
                    </div>
                    
                    {promoApplied ? <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-md p-3 mb-4">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="font-medium">{promoApplied.code}</p>
                            <p className="text-sm text-green-700">
                              {promoApplied.code === 'FREESHIP' ? 'Free Shipping Applied' : `${promoApplied.discount}% discount applied`}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setPromoApplied(null)} className="h-8 text-gray-500">
                          <X className="h-4 w-4" />
                        </Button>
                      </div> : <div className="flex space-x-2 mb-4">
                        <Input placeholder="Enter promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="flex-1" />
                        <Button type="button" onClick={handleApplyPromoCode} className="min-w-20 bg-indigo hover:bg-indigo-600">
                          Apply
                        </Button>
                      </div>}
                  </div>
                  
                  {/* Loyalty Points Section */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Coins className="h-5 w-5 text-amber-500" />
                      <h3 className="font-semibold">AVIRVA Loyalty Points</h3>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-md p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Available Balance</p>
                        <p className="font-semibold">{loyaltyPoints} points</p>
                      </div>
                      <p className="text-sm text-amber-700">
                        Your points worth ₹{(loyaltyPoints * POINTS_TO_RUPEE).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox id="usePoints" checked={useLoyaltyPoints} disabled={loyaltyPoints === 0} onCheckedChange={checked => {
                      setUseLoyaltyPoints(!!checked);
                      if (checked) {
                        setPointsToUse(loyaltyPoints);
                      } else {
                        setPointsToUse(0);
                      }
                    }} />
                      <Label htmlFor="usePoints" className={loyaltyPoints === 0 ? "text-gray-400" : ""}>
                        Use points for this purchase
                      </Label>
                    </div>
                    
                    {useLoyaltyPoints && <div className="flex space-x-2 items-center mb-2">
                        <Input type="number" placeholder="Points to use" value={pointsToUse} onChange={handlePointsChange} className="flex-1" max={loyaltyPoints} min={0} />
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          (Worth ₹{(pointsToUse * POINTS_TO_RUPEE).toFixed(2)})
                        </span>
                      </div>}
                  </div>
                  
                  {/* Submit Button */}
                  <div className="mt-8">
                    <Button type="submit" disabled={isProcessing} className="w-full h-12 text-lg text-gray-950 bg-zinc-500 hover:bg-zinc-400">
                      {isProcessing ? <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </span> : <span className="flex items-center justify-center text-zinc-950 font-extrabold">
                          <Lock className="h-5 w-5 mr-2" />
                          Pay ₹{orderDetails ? calculateFinalAmount().toFixed(2) : '0.00'}
                        </span>}
                    </Button>
                    
                    <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                      <Lock className="h-4 w-4 mr-1" />
                      Your payment info is secure
                    </div>
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
                  {orderDetails ? <>
                      <div className="space-y-4 mb-4">
                        {orderDetails.items.map((item: any) => <div key={item.id} className="flex justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">₹{item.price * item.quantity}</p>
                          </div>)}
                      </div>
                      
                      <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">₹{orderDetails.total - (orderDetails.total >= 599 ? 0 : 99)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">
                            {orderDetails.total >= 599 || promoApplied && promoApplied.code === 'FREESHIP' ? "Free" : "₹99"}
                          </span>
                        </div>
                        
                        {(promoApplied || useLoyaltyPoints && pointsToUse > 0) && <div className="flex justify-between text-green-600">
                            <span>Discounts</span>
                            <span>-₹{calculateDiscount().toFixed(2)}</span>
                          </div>}
                        
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-100 mt-2">
                          <span>Total</span>
                          <span>₹{calculateFinalAmount().toFixed(2)}</span>
                        </div>
                        
                        {useLoyaltyPoints && pointsToUse > 0 && <div className="text-xs text-amber-500 mt-2">
                            You will earn {Math.round(calculateFinalAmount() * 0.1)} points from this purchase
                          </div>}
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <div className="text-sm text-gray-600">
                          <p>{orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}</p>
                          <p>{orderDetails.shippingAddress.address}</p>
                          <p>
                            {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.pincode}
                          </p>
                          <p>{orderDetails.shippingAddress.email}</p>
                          <p>{orderDetails.shippingAddress.phone}</p>
                        </div>
                      </div>
                    </> : <div className="text-center py-8 text-gray-500">
                      <p>Loading order details...</p>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Payment;