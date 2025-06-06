
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock data for banner slides
const BANNER_SLIDES = [
  {
    id: 1,
    title: "Print Your Imagination",
    subtitle: "Unique 3D printed products for your home and lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    ctaLink: "/category/1",
    ctaText: "Shop Now",
    align: "left" as const,
  },
  {
    id: 2,
    title: "Festive Collection",
    subtitle: "Celebrate with our exclusive Diwali collection",
    imageUrl: "https://images.unsplash.com/photo-1560352857-1e77568687cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    ctaLink: "/category/4/subcategory/10",
    ctaText: "Explore",
    align: "right" as const,
  },
  {
    id: 3,
    title: "Tech Accessories",
    subtitle: "Functional and stylish gadgets for your everyday tech",
    imageUrl: "https://images.unsplash.com/photo-1625315714730-d0521da4b1bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    ctaLink: "/category/3",
    ctaText: "View Collection",
    align: "center" as const,
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(BANNER_SLIDES);

  useEffect(() => {
    // Load slides from localStorage if available
    const storedSlides = localStorage.getItem('heroSlides');
    if (storedSlides) {
      try {
        const parsedSlides = JSON.parse(storedSlides);
        const activeSlides = parsedSlides.filter((slide: any) => slide.isActive);
        if (activeSlides.length > 0) {
          setSlides(activeSlides);
        }
      } catch (error) {
        console.error('Error parsing stored slides:', error);
      }
    }

    // Listen for slideshow updates
    const handleSlideshowUpdate = (event: CustomEvent) => {
      const activeSlides = event.detail.filter((slide: any) => slide.isActive);
      if (activeSlides.length > 0) {
        setSlides(activeSlides);
        setCurrentSlide(0);
      }
    };

    window.addEventListener('slideshowUpdated', handleSlideshowUpdate as EventListener);
    
    return () => {
      window.removeEventListener('slideshowUpdated', handleSlideshowUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentBanner = slides[currentSlide];

  const alignmentClasses = {
    left: "items-start text-left",
    right: "items-end text-right",
    center: "items-center text-center",
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img 
            src={slide.imageUrl} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30">
        <div className="container-avirva h-full flex flex-col justify-center">
          <div className={`max-w-lg ${alignmentClasses[currentBanner.align]}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{currentBanner.title}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">{currentBanner.subtitle}</p>
            <Link to={currentBanner.ctaLink}>
              <Button className="text-base bg-saffron hover:bg-saffron-600">
                {currentBanner.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
