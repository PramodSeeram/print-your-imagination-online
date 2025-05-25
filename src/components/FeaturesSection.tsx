
import { Truck, Shield, RefreshCcw, Clock } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-slate-900">
      <div className="container-avirva">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-slate-700">
            <div className="bg-emerald-600/20 p-3 rounded-full mb-4">
              <Truck className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium text-lg mb-2 text-slate-100">Free Shipping</h3>
            <p className="text-slate-300">Free delivery on all orders above ₹599</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-slate-700">
            <div className="bg-emerald-600/20 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium text-lg mb-2 text-slate-100">7-Day Guarantee</h3>
            <p className="text-slate-300">Not satisfied? Get your money back or a reprint</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-slate-700">
            <div className="bg-emerald-600/20 p-3 rounded-full mb-4">
              <RefreshCcw className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium text-lg mb-2 text-slate-100">Design Revisions</h3>
            <p className="text-slate-300">We'll help perfect your custom orders</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-slate-700">
            <div className="bg-emerald-600/20 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium text-lg mb-2 text-slate-100">Quick Turnaround</h3>
            <p className="text-slate-300">Most products delivered within 3-5 days</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
