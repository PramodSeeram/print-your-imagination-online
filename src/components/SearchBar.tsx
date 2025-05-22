import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
      const keywordMatch = product.keywords?.some(keyword => keyword.toLowerCase().includes(normalizedTerm)) || false;
      return nameMatch || keywordMatch;
    });
    setSearchResults(results);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);

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
  return <div className={`relative ${className}`} ref={searchInputRef}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              
              <Button type="submit" className="bg-indigo hover:bg-indigo-600 text-white px-4 rounded-r-md">
                <Search className="h-4 w-4" />
              </Button>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          {searchResults.length > 0 ? <div className="py-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500 border-b">
                Products ({searchResults.length})
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {searchResults.map(product => <div key={product.id} className="px-3 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer" onClick={() => handleResultClick(product.id)}>
                    <div className="w-10 h-10 bg-gray-100 rounded">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-medium line-clamp-1">{product.name}</div>
                      <div className="text-xs text-gray-500">
                        ₹{product.offerPrice || product.price}
                        {product.offerPrice && <span className="text-gray-400 line-through ml-1">₹{product.price}</span>}
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="px-3 py-2 border-t">
                <Button className="w-full text-sm" onClick={handleSearchSubmit}>
                  See all results
                </Button>
              </div>
            </div> : searchTerm.trim() && <div className="p-3 text-center text-gray-500">
                No products found for "{searchTerm}"
              </div>}
        </PopoverContent>
      </Popover>
    </div>;
};
export default SearchBar;