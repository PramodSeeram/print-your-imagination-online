
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', withText = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div 
      className={`font-playfair font-bold text-2xl text-black cursor-pointer hover:opacity-80 transition-opacity duration-200 ${className}`}
      onClick={handleClick}
    >
      {withText ? 'AVIRVA' : 'A'}
    </div>
  );
};

export default Logo;
