
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
          {/* Stylized A shape in teal */}
          <path d="M32 8C42 16 42 40 32 48" stroke="#38B2AC" strokeWidth="6" strokeLinecap="round" />
          {/* Stylized V shape in green */}
          <path d="M32 16C42 24 42 48 32 56" stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
      {withText && (
        <div className="font-mont font-bold text-xl md:text-2xl tracking-tight">
          <span className="text-teal-500 dark:text-teal-400">AVI</span>
          <span className="text-green-500 dark:text-green-400">RVA</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
