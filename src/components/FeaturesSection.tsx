
import { Truck, Shield, RefreshCcw, Clock } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-avirva">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-stone-50 p-8 rounded-lg flex flex-col items-center text-center border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-stone-900 p-4 rounded-full mb-6">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-playfair font-medium text-xl mb-3 text-stone-900">Free Shipping</h3>
            <p className="text-stone-600">Free delivery on all orders above ₹599</p>
          </div>
          
          <div className="bg-stone-50 p-8 rounded-lg flex flex-col items-center text-center border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-stone-900 p-4 rounded-full mb-6">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-playfair font-medium text-xl mb-3 text-stone-900">7-Day Guarantee</h3>
            <p className="text-stone-600">Not satisfied? Get your money back or a reprint</p>
          </div>
          
          <div className="bg-stone-50 p-8 rounded-lg flex flex-col items-center text-center border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-stone-900 p-4 rounded-full mb-6">
              <RefreshCcw className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-playfair font-medium text-xl mb-3 text-stone-900">Design Revisions</h3>
            <p className="text-stone-600">We'll help perfect your custom orders</p>
          </div>
          
          <div className="bg-stone-50 p-8 rounded-lg flex flex-col items-center text-center border border-stone-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-stone-900 p-4 rounded-full mb-6">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-playfair font-medium text-xl mb-3 text-stone-900">Quick Turnaround</h3>
            <p className="text-stone-600">Most products delivered within 3-5 days</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
