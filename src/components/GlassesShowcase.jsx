import { useState, useEffect, useRef } from 'react';
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
  const [edgeOpacity, setEdgeOpacity] = useState(0); // Start with 0 opacity (fully visible)
  const opacityTimerRef = useRef(null);
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(glassesData.length / itemsPerPage);
  
  // Function to get all page items remains unchanged
  const getAllPageItems = () => {
    const result = [];
    
    for (let page = 0; page < totalPages; page++) {
      const startIdx = page * itemsPerPage;
      const currentItems = glassesData.slice(startIdx, startIdx + itemsPerPage);
      
      const prevItemIdx = (startIdx - 1 + glassesData.length) % glassesData.length;
      const prevItem = glassesData[prevItemIdx];
      
      const nextItemIdx = (startIdx + itemsPerPage) % glassesData.length;
      const nextItem = glassesData[nextItemIdx];
      
      result.push([prevItem, ...currentItems, nextItem]);
    }
    
    return result;
  };

  // Initialize edge items with fade effect
  useEffect(() => {
    // When component mounts, start with fully visible then fade to semi-transparent
    const initialFadeTimer = setTimeout(() => {
      animateOpacityTo(1);
    }, 500);
    
    return () => clearTimeout(initialFadeTimer);
  }, []);

  const goToNextPage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      
      // Clear any existing opacity animation
      if (opacityTimerRef.current) {
        clearTimeout(opacityTimerRef.current);
      }
      
      // First make edge items fully visible (opacity = 0 for the overlay)
      setEdgeOpacity(0);
      
      // Change page
      setCurrentPage(prev => (prev === totalPages - 1) ? 0 : prev + 1);
      
      // After position transition completes, fade edge items
      opacityTimerRef.current = setTimeout(() => {
        animateOpacityTo(1);
      }, 400); // Wait for most of the position transition to complete
    }
  };

  const goToPrevPage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      
      // Clear any existing opacity animation
      if (opacityTimerRef.current) {
        clearTimeout(opacityTimerRef.current);
      }
      
      // First make edge items fully visible (opacity = 0 for the overlay)
      setEdgeOpacity(0);
      
      // Change page
      setCurrentPage(prev => (prev === 0) ? totalPages - 1 : prev - 1);
      
      // After position transition completes, fade edge items
      opacityTimerRef.current = setTimeout(() => {
        animateOpacityTo(1);
      }, 400); // Wait for most of the position transition to complete
    }
  };

  // Animated opacity transition function
  const animateOpacityTo = (targetValue) => {
    // Use requestAnimationFrame for smoother animations
    const startValue = edgeOpacity;
    const startTime = performance.now();
    const duration = 800; // Animation duration in ms
    
    const animateFrame = (currentTime) => {
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        // Calculate progress with easing
        const progress = elapsed / duration;
        const easedProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Cubic easing
        
        // Calculate current opacity
        const newOpacity = startValue + (targetValue - startValue) * easedProgress;
        
        // Update state
        setEdgeOpacity(newOpacity);
        
        // Continue animation
        requestAnimationFrame(animateFrame);
      } else {
        // Animation complete
        setEdgeOpacity(targetValue);
      }
    };
    
    requestAnimationFrame(animateFrame);
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

        {/* Carousel container */}
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
                      className="bg-white rounded-lg p-3 shadow-sm flex flex-col items-center h-full
                        transition-all duration-1000 ease-in-out hover:shadow-md hover:-translate-y-1
                        relative"
                    >
                      {/* Gradient overlay for left edge item */}
                      {index === 0 && (
                        <div 
                          className="absolute inset-0 rounded-lg pointer-events-none z-10"
                          style={{ 
                            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 180%)',
                            opacity: edgeOpacity,
                            transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />
                      )}
                      
                      {/* Gradient overlay for right edge item */}
                      {index === 5 && (
                        <div 
                          className="absolute inset-0 rounded-lg pointer-events-none z-10"
                          style={{ 
                            background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 180%)',
                            opacity: edgeOpacity,
                            transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
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
                
                // Clear any existing opacity animation
                if (opacityTimerRef.current) {
                  clearTimeout(opacityTimerRef.current);
                }
                
                // First make edge items fully visible
                setEdgeOpacity(0);
                
                // Change page
                setCurrentPage(i);
                
                // After position transition completes, fade edge items
                opacityTimerRef.current = setTimeout(() => {
                  animateOpacityTo(1);
                }, 400);
              }
            }}
            aria-label={`Page ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}