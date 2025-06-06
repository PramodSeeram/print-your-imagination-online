
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  rating: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  keywords?: string[];
  category?: string;
}

interface SearchBarProps {
  className?: string;
  allProducts: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  allProducts
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popularKeywords] = useState(['home decor', 'miniatures', 'tech', 'wooden', 'ceramic']);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Function to perform search
  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    const normalizedTerm = term.toLowerCase().trim();
    const results = allProducts.filter(product => {
      // Search in product name
      const nameMatch = product.name.toLowerCase().includes(normalizedTerm);

      // Search in keywords if available
      const keywordMatch = product.keywords?.some(keyword => 
        keyword.toLowerCase().includes(normalizedTerm)
      ) || false;
      
      // Search in category if available
      const categoryMatch = product.category?.toLowerCase().includes(normalizedTerm) || false;
      
      return nameMatch || keywordMatch || categoryMatch;
    });
    
    // Add category to results if not already present
    const resultsWithCategories = results.map(product => {
      if (!product.category) {
        // Determine category from keywords if possible
        const category = product.keywords?.find(keyword => 
          ['Home Decor', 'Miniatures', 'Tech Gadgets'].map(c => c.toLowerCase()).includes(keyword.toLowerCase())
        );
        return {
          ...product,
          category: category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Other'
        };
      }
      return product;
    });
    
    setSearchResults(resultsWithCategories);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Use setTimeout to prevent cursor jumping
    setTimeout(() => {
      performSearch(value);
    }, 0);

    // Open popover when typing
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Store search results in session storage for the search results page
      sessionStorage.setItem('searchResults', JSON.stringify(searchResults));
      sessionStorage.setItem('searchTerm', searchTerm);

      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);

      // Close popover and clear input
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setSearchTerm('');
  };
  
  // Handle clicking on a keyword
  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword);
    performSearch(keyword);
    setIsOpen(true);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchInputRef}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="rounded-l-md rounded-r-none border-r-0 pl-10 bg-white border-gray-300 focus:border-black focus:ring-black text-black placeholder:text-gray-500"
              />
              <Button 
                type="submit" 
                className="bg-black hover:bg-gray-800 text-white px-4 rounded-r-md"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 border-gray-200 bg-white" align="start">
          {searchResults.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500 border-b border-gray-100">
                Products ({searchResults.length})
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {searchResults.map(product => (
                  <div 
                    key={product.id} 
                    className="px-3 py-2 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors" 
                    onClick={() => handleResultClick(product.id)}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium line-clamp-1 text-black">{product.name}</div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          ₹{product.offerPrice || product.price}
                          {product.offerPrice && (
                            <span className="text-gray-400 line-through ml-1">₹{product.price}</span>
                          )}
                        </div>
                        {product.category && (
                          <Badge variant="outline" className="text-gray-600 bg-gray-50 border-gray-200 text-xs">
                            {product.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 border-t border-gray-100">
                <Button 
                  className="w-full text-sm bg-black hover:bg-gray-800 text-white" 
                  onClick={handleSearchSubmit}
                >
                  See all results
                </Button>
              </div>
            </div>
          ) : searchTerm.trim() ? (
            <div className="p-3 text-center text-gray-500">
              No products found for "{searchTerm}"
            </div>
          ) : (
            <div className="py-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500 border-b border-gray-100">
                Popular searches
              </div>
              <div className="p-3 flex flex-wrap gap-2">
                {popularKeywords.map(keyword => (
                  <Badge 
                    key={keyword}
                    variant="outline" 
                    className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600 cursor-pointer transition-colors py-1 px-3"
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
