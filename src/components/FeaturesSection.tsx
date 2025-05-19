
import { Truck, Shield, RefreshCcw, Clock } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-avirva">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-teal-100 p-3 rounded-full mb-4">
              <Truck className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free delivery on all orders above ₹599</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-teal-100 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">7-Day Guarantee</h3>
            <p className="text-gray-600">Not satisfied? Get your money back or a reprint</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-teal-100 p-3 rounded-full mb-4">
              <RefreshCcw className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Design Revisions</h3>
            <p className="text-gray-600">We'll help perfect your custom orders</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-teal-100 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Quick Turnaround</h3>
            <p className="text-gray-600">Most products delivered within 3-5 days</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
