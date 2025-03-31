import React, { useState, useEffect, useRef } from 'react';
import SectionOne from './sections/SectionOne';
import SectionTwo from './sections/SectionTwo';
import SectionThree from './sections/SectionThree';
import SectionFour from './sections/SectionFour';
import SectionFive from './sections/SectionFive';
import SectionSix from './sections/SectionSix';

export default function CustomSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  
  // List of slide components with proper keys
  const slides = [
    <SectionOne key="section1" />,
    <SectionSix key="section6" />,
    <SectionTwo key="section2" />,
    <SectionThree key="section3" />,
    <SectionFour key="section4" />,
    <SectionFive key="section5" />,
    
  ];

  // Initial load effect with proper preloading
  useEffect(() => {
    // Start with overlay visible
    if (containerRef.current) {
      containerRef.current.style.visibility = 'hidden';
    }
    
    // Delay to ensure all content is loaded
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.visibility = 'visible';
      }
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced navigation with direction tracking
  const navigate = (newIndex) => {
    if (isMoving) return;
    
    setIsMoving(true);
    setDirection(newIndex > activeIndex ? 1 : -1);
    
    // Handle circular navigation
    if (newIndex < 0) {
      setActiveIndex(slides.length - 1);
    } else if (newIndex >= slides.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(newIndex);
    }
    
    // Reset moving state after transition
    setTimeout(() => {
      setIsMoving(false);
    }, 1000);
  };

  // Auto-advance
  useEffect(() => {
    if (!isLoaded) return; // Don't start auto-advance until loaded
    
    const timer = setInterval(() => {
      if (!isMoving) {
        navigate(activeIndex + 1);
      }
    }, 6000);
    
    return () => clearInterval(timer);
  }, [activeIndex, isMoving, isLoaded]);

  return (
    <>
      {/* Full page loading overlay */}
      <div 
        className={`fixed inset-0 bg-white z-50 transition-opacity duration-800 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex h-full items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
        </div>
      </div>
    
      <div 
        className={`relative w-full h-screen overflow-hidden bg-white transition-opacity duration-800 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        ref={containerRef}
      >
        {/* Current slide with enhanced transitions */}
        <div 
          className="w-full h-full"
          style={{
            transition: "all 800ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
            opacity: isMoving ? 0.9 : 1,
            transform: isMoving 
              ? `scale(${0.98}) translateX(${direction * -2}%)` 
              : "scale(1) translateX(0)",
          }}
        >
          {slides[activeIndex]}
        </div>
        
        {/* Navigation arrows with improved styling */}
        <button
          onClick={() => navigate(activeIndex - 1)}
          className={`absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-14 h-14 rounded-full flex items-center justify-center z-20 transition-all duration-300 ease-in-out hover:scale-110 ${
            isMoving ? 'opacity-60' : 'opacity-100'
          }`}
          disabled={isMoving}
          aria-label="Previous slide"
        >
          <span className="text-2xl">❮</span>
        </button>
        
        <button
          onClick={() => navigate(activeIndex + 1)}
          className={`absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-14 h-14 rounded-full flex items-center justify-center z-20 transition-all duration-300 ease-in-out hover:scale-110 ${
            isMoving ? 'opacity-60' : 'opacity-100'
          }`}
          disabled={isMoving}
          aria-label="Next slide"
        >
          <span className="text-2xl">❯</span>
        </button>
        
        {/* Enhanced indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              className={`h-3 transition-all duration-300 ease-out ${
                activeIndex === i 
                  ? 'w-10 bg-white shadow-lg' 
                  : 'w-3 bg-white/60 hover:bg-white/80 hover:scale-110'
              } rounded-full`}
              disabled={isMoving}
            />
          ))}
        </div>
      </div>
    </>
  );
}