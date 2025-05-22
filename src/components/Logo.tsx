
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
        <img 
          src="/lovable-uploads/0786e3b8-331c-4a3a-a439-587cc29642cf.png" 
          alt="AVIRVA Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {withText && (
        <div className="font-mont font-bold text-xl md:text-2xl tracking-tight">
          <span className="text-[#4ECDC4] dark:text-[#4ECDC4]">AVI</span>
          <span className="text-[#8FE388] dark:text-[#8FE388]">RVA</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
