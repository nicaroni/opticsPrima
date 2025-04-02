// src/containers/GlassesShowcase.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { glassesData } from './glassesData';

export default function GlassesShowcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [edgeOpacity, setEdgeOpacity] = useState(0);
  const opacityTimerRef = useRef(null);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(glassesData.length / itemsPerPage);

  // Gather all pages so we can do the "previous & next" item trick
  const getAllPageItems = () => {
    const result = [];
    for (let page = 0; page < totalPages; page++) {
      const startIdx = page * itemsPerPage;
      const currentItems = glassesData.slice(startIdx, startIdx + itemsPerPage);

      // "previous item" for the fade
      const prevItemIdx = (startIdx - 1 + glassesData.length) % glassesData.length;
      const prevItem = glassesData[prevItemIdx];

      // "next item" for the fade
      const nextItemIdx = (startIdx + itemsPerPage) % glassesData.length;
      const nextItem = glassesData[nextItemIdx];

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

  return (
    <div className="w-full py-2 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-5 text-gray-700 text-center">
        Нашата колекция
      </h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={goToPrevPage}
          disabled={isAnimating}
          className={`absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 
                      bg-white shadow-lg rounded-full p-2 z-10
                      ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Carousel container */}
        <div className="overflow-hidden mx-auto w-full max-w-5xl py-1">
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
                      {index === 5 && (
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

                      <div className="rounded-lg p-1 mb-1 w-full h-36 flex items-center justify-center">
                        <img
                          src={glasses.src}
                          alt={glasses.name}
                          className="max-h-32 max-w-full object-contain"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-gray-700">
                        {glasses.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={goToNextPage}
          disabled={isAnimating}
          className={`absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 
                      bg-white shadow-lg rounded-full p-2 z-10
                      ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Page indicators */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentPage === i ? 'bg-gray-700 w-6' : 'bg-gray-300'
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
    </div>
  );
}
