
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
        {/* SVG Logo - Stylized "A" as 3D printer nozzle with filament spiral */}
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M32 4L8 58H56L32 4Z" fill="#0077B6" stroke="#00B4D8" strokeWidth="2" />
          <circle cx="32" cy="38" r="12" fill="#00B4D8" />
          <path d="M32 26C32 26 40 32 40 38C40 44 36 50 32 50C28 50 24 44 24 38C24 32 32 26 32 26Z" fill="#FF9E00" />
          <path d="M32 26C32 26 36 32 36 38C36 44 34 50 32 50C30 50 28 44 28 38C28 32 32 26 32 26Z" fill="#FFBE0B" strokeWidth="0" />
          <circle cx="32" cy="24" r="4" fill="#0077B6" />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full animate-spin-slow opacity-20">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 12C42 20 42 44 32 52" stroke="#FF9E00" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {withText && (
        <div className="font-poppins font-bold text-xl md:text-2xl tracking-tight">
          <span className="text-indigo">AVI</span>
          <span className="text-teal">RVA</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
