
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
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClass} relative bg-emerald-100 rounded-lg p-1 border-2 border-emerald-300`}>
        {/* SVG logo inline with better visibility */}
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M32 8C42 16 42 40 32 48" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
          <path d="M32 16C42 24 42 48 32 56" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
      {withText && (
        <div className="font-inter font-bold text-xl md:text-2xl tracking-tight">
          <span className="text-emerald-400">AVI</span>
          <span className="text-slate-100">RVA</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
