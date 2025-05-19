
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryBannerProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ id, name, description, imageUrl }) => {
  return (
    <div className="relative h-64 overflow-hidden rounded-lg group">
      <img 
        src={imageUrl} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-bold mb-2">{name}</h3>
        <p className="text-white/90 mb-4 line-clamp-2">{description}</p>
        <Link 
          to={`/category/${id}`}
          className="inline-block bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-md hover:bg-white/30 transition-colors w-max"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
};

export default CategoryBanner;
