// src/containers/GlassesShowcase.jsx
import React, { useState, useEffect, useRef } from 'react';
import { newGlassesData } from './newGlassesData';
import ImageLightbox from '../components/ImageLightbox';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function NewGlassesShowcase() {
  // Existing states
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [edgeOpacity, setEdgeOpacity] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const opacityTimerRef = useRef(null);
  const containerRef = useRef(null);
  
  // New lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Touch handling states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Update items per page based on screen width
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(2); // Mobile: 2 items
      } else if (width < 768) {
        setItemsPerPage(3); // Small tablets: 3 items
      } else if (width < 1024) {
        setItemsPerPage(4); // Medium screens: 4 items
      } else {
        setItemsPerPage(6); // Large screens: 6 items
      }
    };

    // Initial call
    updateItemsPerPage();

    // Add resize listener
    window.addEventListener('resize', updateItemsPerPage);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Recalculate total pages whenever itemsPerPage changes
  const totalPages = Math.ceil(newGlassesData.length / itemsPerPage);

  // Reset current page when total pages changes to avoid out-of-bounds issues
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  // Gather all pages with appropriate previous and next items
  const getAllPageItems = () => {
    const result = [];
    for (let page = 0; page < totalPages; page++) {
      const startIdx = page * itemsPerPage;
      const currentItems = newGlassesData.slice(startIdx, startIdx + itemsPerPage);

      // Add "previous item" for the fade effect
      const prevItemIdx = (startIdx - 1 + newGlassesData.length) % newGlassesData.length;
      const prevItem = newGlassesData[prevItemIdx];

      // Add "next item" for the fade effect
      const nextItemIdx = (startIdx + itemsPerPage) % newGlassesData.length;
      const nextItem = newGlassesData[nextItemIdx];

      result.push([prevItem, ...currentItems, nextItem]);
    }
    return result;
  };

  useEffect(() => {
    // Fade from 0 => 1 at startup
    const initialFadeTimer = setTimeout(() => {
      animateOpacityTo(1);
    }, 500);
    return () => clearTimeout(initialFadeTimer);
  }, []);

  const goToNextPage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (opacityTimerRef.current) clearTimeout(opacityTimerRef.current);
      setEdgeOpacity(0);
      setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
      opacityTimerRef.current = setTimeout(() => animateOpacityTo(1), 400);
    }
  };

  const goToPrevPage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (opacityTimerRef.current) clearTimeout(opacityTimerRef.current);
      setEdgeOpacity(0);
      setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
      opacityTimerRef.current = setTimeout(() => animateOpacityTo(1), 400);
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null); // reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // minimum distance in px required for swipe
    
    if (distance > minSwipeDistance) {
      // Swipe left, go to next
      goToNextPage();
    } else if (distance < -minSwipeDistance) {
      // Swipe right, go to prev
      goToPrevPage();
    }
  };

  const animateOpacityTo = (targetValue) => {
    const startValue = edgeOpacity;
    const startTime = performance.now();
    const duration = 800;
    const animateFrame = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        // cubic easing
        const progress = elapsed / duration;
        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const newOpacity = startValue + (targetValue - startValue) * easedProgress;
        setEdgeOpacity(newOpacity);
        requestAnimationFrame(animateFrame);
      } else {
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

  const slidePosition = currentPage * -100; // slide by 100% for each page
  const allPageItems = getAllPageItems();

  // Lightbox handlers
  const openLightbox = (glassesIndex) => {
    setSelectedImageIndex(glassesIndex);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  const goToNextImage = () => {
    setSelectedImageIndex((prev) => (prev === newGlassesData.length - 1 ? 0 : prev + 1));
  };
  
  const goToPrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? newGlassesData.length - 1 : prev - 1));
  };

  return (
    <div className="w-full py-2 px-9 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-1 text-gray-700 text-center select-none">
        Нашите нови попълнения
      </h2>
           <h4 className="text-lg font-medium mb-5 text-gray-700 text-center select-none">
        диоптрични рамки
      </h4>

      <div className="relative">
        {/* Left navigation arrow */}
        <button
          onClick={goToPrevPage}
          disabled={isAnimating}
          className="absolute left-[-30px] sm:-left-[40px] md:-left-10 lg:-left-10 top-1/2 -translate-y-1/2 
            p-1 sm:p-2 rounded-full bg-white hover:bg-gray-100 transition-all shadow-md z-10 
            focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 
            disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
        </button>

        {/* Right navigation arrow */}
        <button
          onClick={goToNextPage}
          disabled={isAnimating}
          className="absolute right-[-30px] sm:-right-[40px] md:-right-10 lg:-right-10 top-1/2 -translate-y-1/2 
            p-1 sm:p-2 rounded-full bg-white hover:bg-gray-100 transition-all shadow-md z-10 
            focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 
            disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
        </button>

        {/* Carousel container with touch events */}
        <div className="overflow-hidden mx-auto w-full max-w-5xl py-1"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${slidePosition}%)` }}
          >
            {allPageItems.map((pageItems, pageIndex) => (
              <div
                key={`page-${pageIndex}`}
                className="flex-shrink-0 w-full flex"
              >
                {pageItems.map((glasses, index) => {
                  // Find the real index in the original glassesData array
                  const startIdx = currentPage * itemsPerPage;
                  const realIndex = (() => {
                    if (index === 0) {
                      return (startIdx - 1 + newGlassesData.length) % newGlassesData.length;
                    } else if (index === itemsPerPage + 1) {
                      return (startIdx + itemsPerPage) % newGlassesData.length;
                    } else {
                      return (startIdx + index - 1) % newGlassesData.length;
                    }
                  })();
                  
                  // Calculate width based on items per page
                  const itemWidth = 100 / (itemsPerPage + 2);
                  
                  return (
                    <div
                      key={`${glasses.id}-${pageIndex}-${index}`}
                      className="px-2  relative"
                      style={{ width: `${itemWidth}%` }}
                    >
                      <div
                        className="bg-white rounded-lg p-3 shadow-sm flex flex-col items-center h-full
                               transition-all duration-1000 ease-in-out hover:shadow-md hover:-translate-y-1
                               relative cursor-pointer select-none "
                      >
                        {/* First/last item fade effects (unchanged) */}
                        {index === 0 && (
                          <div
                            className="absolute inset-0 rounded-lg pointer-events-none z-10"
                            style={{
                              background:
                                'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 180%)',
                              opacity: edgeOpacity,
                              transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          />
                        )}
                        
                        {index === itemsPerPage + 1 && (
                          <div
                            className="absolute inset-0 rounded-lg pointer-events-none z-10"
                            style={{
                              background:
                                'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 180%)',
                              opacity: edgeOpacity,
                              transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          />
                        )}

                        {/* Clickable image container */}
                        <div 
                          
                          onClick={() => openLightbox(realIndex)}
                        >
                          <img
                            src={glasses.src}
                            alt={glasses.name}
                            className="max-h-32 max-w-full object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-xl"
                          />
                        </div>
                        
                        {/* Product name */}
                        <h3 className="text-xs sm:text-sm font-medium text-gray-700 text-center select-none">
                          {glasses.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page indicators */}
      <div className="flex justify-center mt-6 sm:mt-10 gap-2 select-none">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentPage === i ? 'bg-gray-700 w-4 sm:w-6' : 'bg-gray-300'
            }`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                if (opacityTimerRef.current) {
                  clearTimeout(opacityTimerRef.current);
                }
                setEdgeOpacity(0);
                setCurrentPage(i);
                opacityTimerRef.current = setTimeout(
                  () => animateOpacityTo(1),
                  400
                );
              }
            }}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
      
      {/* Lightbox modal */}
      <ImageLightbox 
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        currentImage={newGlassesData[selectedImageIndex]}
        allImages={newGlassesData}
        onPrev={goToPrevImage}
        onNext={goToNextImage}
        currentIndex={selectedImageIndex}
        variant="newGlasses" // Add this line to specify the variant
      />
    </div>
  );
}
