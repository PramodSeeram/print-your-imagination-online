
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  withText?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ withText = true, className = "", size = "md" }) => {
  const sizesMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const sizeClass = sizesMap[size];

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClass} relative`}>
        {/* Updated SVG Logo - Modern minimal 3D printer icon with professional color scheme */}
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* 3D Printer Base */}
          <rect x="14" y="44" width="36" height="10" rx="2" fill="#0A2463" />
          
          {/* 3D Printer Frame */}
          <path d="M16 16V44H20V16H16Z" fill="#3E92CC" />
          <path d="M44 16V44H48V16H44Z" fill="#3E92CC" />
          <path d="M16 16H48V20H16V16Z" fill="#3E92CC" />
          
          {/* Printer Head */}
          <rect x="24" y="20" width="16" height="6" rx="2" fill="#0A2463" />
          
          {/* Printing Platform */}
          <rect x="20" y="36" width="24" height="4" fill="#D8E1E9" />
          
          {/* 3D Model Being Printed */}
          <path d="M26 28L32 22L38 28L38 36H26V28Z" fill="#3AAFA9" />
          
          {/* Detail Lines */}
          <path d="M32 22V36" stroke="#2A7F7F" strokeWidth="1" />
          <path d="M26 32H38" stroke="#2A7F7F" strokeWidth="1" />
        </svg>
        
        {/* Animated filament */}
        <div className="absolute top-0 left-0 w-full h-full animate-spin-slow opacity-20">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 12C42 20 42 44 32 52" stroke="#3AAFA9" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {withText && (
        <div className="font-poppins font-bold text-xl md:text-2xl tracking-tight">
          <span className="text-[#0A2463]">AVI</span>
          <span className="text-[#3AAFA9]">RVA</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
