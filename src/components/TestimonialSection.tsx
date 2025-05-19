
import { Star } from 'lucide-react';

// Mock data for testimonials
const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The custom nameplate I ordered exceeded my expectations! The quality of the print is outstanding, and it arrived beautifully packaged. Will definitely order again!",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    productOrdered: "Custom Family Nameplate"
  },
  {
    id: 2,
    name: "Rajesh Patel",
    location: "Bengaluru",
    rating: 5,
    text: "I ordered several desk organizers for my office. The designs are both functional and stylish. My colleagues keep asking where I got them!",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    productOrdered: "Geometric Desk Organizer Set"
  },
  {
    id: 3,
    name: "Ananya Desai",
    location: "Delhi",
    rating: 4,
    text: "The Diwali decorations were perfect for my home. The intricate designs really stand out. Shipping was prompt and everything arrived intact.",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    productOrdered: "Diwali Special Lamp Holders"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-avirva">
        <h2 className="section-title text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              
              <div className="text-sm text-gray-500">
                Purchased: {testimonial.productOrdered}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
