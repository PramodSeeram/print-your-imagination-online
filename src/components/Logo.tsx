
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
        {/* AVIRVA logo with updated color scheme */}
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M32 8C42 16 42 40 32 48" stroke="#5D3FD3" strokeWidth="6" strokeLinecap="round" />
          <path d="M32 16C42 24 42 48 32 56" stroke="#9400D3" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
      {withText && (
        <div className="font-mont font-bold text-xl md:text-2xl tracking-tight">
          <span className="text-[#5D3FD3] dark:text-[#5D3FD3]">AVI</span>
          <span className="text-[#9400D3] dark:text-[#9400D3]">RVA</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
