import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Sample glasses data - replace with your actual glasses images
const glassesData = [
  { id: 1, src: '/images/glasses/glass1.png', name: 'Model Classic' },
  { id: 2, src: '/images/glasses/glass2.png', name: 'Urban Style' },
  { id: 3, src: '/images/glasses/glass3.png', name: 'Modern Frame' },
  { id: 4, src: '/images/glasses/glass4.png', name: 'Elegant Design' },
  { id: 5, src: '/images/glasses/glass1.png', name: 'Vintage Look' },
  { id: 6, src: '/images/glasses/glass4.png', name: 'Sport Edition' },
  { id: 7, src: '/images/glasses/glass4.png', name: 'Casual Frame' },
  { id: 8, src: '/images/glasses/glass3.png', name: 'Professional Cut' },
  { id: 9, src: '/images/glasses/glass2.png', name: 'Executive Style' },
  { id: 10, src: '/images/glasses/glass1.png', name: 'Model Classic' },
  { id: 11, src: '/images/glasses/glass2.png', name: 'Urban Style' },
  { id: 12, src: '/images/glasses/glass3.png', name: 'Modern Frame' },
  { id: 13, src: '/images/glasses/glass4.png', name: 'Elegant Design' },
  { id: 14, src: '/images/glasses/glass1.png', name: 'Vintage Look' },
  { id: 15, src: '/images/glasses/glass2.png', name: 'Executive Style' },
  { id: 16, src: '/images/glasses/glass1.png', name: 'Model Classic' },
  { id: 17, src: '/images/glasses/glass2.png', name: 'Urban Style' },
  { id: 18, src: '/images/glasses/glass3.png', name: 'Modern Frame' },
  { id: 19, src: '/images/glasses/glass4.png', name: 'Elegant Design' },
  { id: 20, src: '/images/glasses/glass1.png', name: 'Vintage Look' },
];

export default function GlassesShowcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEdgeOpacity, setShowEdgeOpacity] = useState(true);
  const itemsPerPage = 4; // We'll display 4 fully visible items plus 2 semi-visible ones
  const totalPages = Math.ceil(glassesData.length / itemsPerPage);
  
  // Function to get the actual items to display for ALL pages
  const getAllPageItems = () => {
    const result = [];
    
    // Generate all pages
    for (let page = 0; page < totalPages; page++) {
      const startIdx = page * itemsPerPage;
      const currentItems = glassesData.slice(startIdx, startIdx + itemsPerPage);
      
      // Get the previous item (for left peek)
      const prevItemIdx = (startIdx - 1 + glassesData.length) % glassesData.length;
      const prevItem = glassesData[prevItemIdx];
      
      // Get the next item (for right peek)
      const nextItemIdx = (startIdx + itemsPerPage) % glassesData.length;
      const nextItem = glassesData[nextItemIdx];
      
      // Add this page's items
      result.push([prevItem, ...currentItems, nextItem]);
    }
    
    return result;
  };

  const goToNextPage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setShowEdgeOpacity(false); // Reset opacity to full
      
      // Circular navigation - if at last page, go to first page
      setCurrentPage(prev => (prev === totalPages - 1) ? 0 : prev + 1);
      
      // Start fade effect almost immediately for smoother transition
      requestAnimationFrame(() => {
        setTimeout(() => {
          setShowEdgeOpacity(true);
        }, 300); // Reduced delay for faster effect onset
      });
    }
  };

  const goToPrevPage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setShowEdgeOpacity(false); // Reset opacity to full
      
      // Circular navigation - if at first page, go to last page
      setCurrentPage(prev => (prev === 0) ? totalPages - 1 : prev - 1);
      
      // Start fade effect almost immediately for smoother transition
      requestAnimationFrame(() => {
        setTimeout(() => {
          setShowEdgeOpacity(true);
        }, 300); // Reduced delay for faster effect onset
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Calculate the slide position based on current page
  const slidePosition = currentPage * -100; // Percentage value
  
  // Get all pages' items
  const allPageItems = getAllPageItems();

  return (
    <div className="w-full py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-gray-700 text-center">
        Нашата колекция
      </h2>
      
      <div className="relative">
        {/* Left navigation arrow */}
        <button 
          onClick={goToPrevPage}
          disabled={isAnimating}
          className={`absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 
            ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Carousel container - the viewport */}
        <div className="overflow-hidden mx-auto w-full max-w-5xl py-2">
          {/* Sliding container */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${slidePosition}%)` }}
            onTransitionEnd={() => setIsAnimating(false)}
          >
            {/* All pages of glasses */}
            {allPageItems.map((pageItems, pageIndex) => (
              <div key={`page-${pageIndex}`} className="flex-shrink-0 w-full flex">
                {pageItems.map((glasses, index) => (
                  <div 
                    key={`${glasses.id}-${pageIndex}-${index}`}
                    className="w-1/6 px-2 relative" 
                  >
                    <div 
                      className={`bg-white rounded-lg p-3 shadow-sm flex flex-col items-center h-full
                        transition-all duration-1000 ease-in-out hover:shadow-md hover:-translate-y-1
                        relative`}
                    >
                      {/* Gradient overlay for edge items */}
                      {index === 0 && showEdgeOpacity && (
                        <div 
                          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-800 ease-in-out z-10"
                          style={{ 
                            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 180%)',
                            opacity: 1
                          }}
                        />
                      )}
                      {index === 5 && showEdgeOpacity && (
                        <div 
                          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-800 ease-in-out z-10"
                          style={{ 
                            background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 180%)',
                            opacity: 1
                          }}
                        />
                      )}
                        
                      <div className="rounded-lg p-1 mb-1 w-full h-36 flex items-center justify-center">
                        <img 
                          src={glasses.src} 
                          alt={glasses.name}
                          className="max-h-32 max-w-full object-contain"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-gray-700">{glasses.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right navigation arrow */}
        <button 
          onClick={goToNextPage}
          disabled={isAnimating}
          className={`absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10
            ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Page indicator */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === i ? 'bg-gray-700 w-6' : 'bg-gray-300'}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setShowEdgeOpacity(false);
                setCurrentPage(i);
                
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    setShowEdgeOpacity(true);
                  }, 300);
                });
              }
            }}
            aria-label={`Page ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}