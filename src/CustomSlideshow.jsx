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
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const containerRef = useRef(null);
  
  // List of slide components with proper keys
  const slides = [
    <SectionOne key="section1" direction={direction} animate={animationTrigger} />,
    <SectionSix key="section6" direction={direction} animate={animationTrigger} />,
    <SectionTwo key="section2" direction={direction} animate={animationTrigger} />,
    <SectionThree key="section3" direction={direction} animate={animationTrigger} />,
    <SectionFour key="section4" direction={direction} animate={animationTrigger} />,
    <SectionFive key="section5" direction={direction} animate={animationTrigger} />,
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
      // Trigger initial animation
      setAnimationTrigger(prev => !prev);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced navigation with direction tracking and animation
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
    
    // Trigger the animation in the new slide
    setTimeout(() => {
      setAnimationTrigger(prev => !prev);
    }, 50);
    
    // Reset moving state after transition
    setTimeout(() => {
      setIsMoving(false);
    }, 1500); // Increased to allow for sequential animations
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
        {/* Current slide */}
        <div className="w-full h-full">
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/8 flex gap-3 z-20">
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