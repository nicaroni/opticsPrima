// src/CustomSlideshow.jsx

import React, { useState, useEffect, useRef } from 'react';
import AnimatedSlide from './slides/AnimatedSlide';
import slidesData from './slides/slidesData';

export default function CustomSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef(null);

  // On mount, we "hide" for a moment, then show
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.visibility = 'hidden';
    }
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.visibility = 'visible';
      }
      setIsLoaded(true);
      // Trigger the first slide's entrance
      setAnimationTrigger(prev => !prev);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Helper: navigate to a new index
  const navigate = (newIndex) => {
    if (isMoving) return; // block rapid clicks
    setIsMoving(true);

    // Wrap index
    const last = slidesData.length - 1;
    if (newIndex < 0) newIndex = last;
    else if (newIndex > last) newIndex = 0;

    // 1) Trigger exit on the current slide
    setIsExiting(true);

    // 2) After the exit animation, switch the slide
    setTimeout(() => {
      setActiveIndex(newIndex);        // new slide
      setIsExiting(false);            // let it enter
      setAnimationTrigger(prev => !prev); 

      // 3) After the new slide enters, allow navigation again
      setTimeout(() => {
        setIsMoving(false);
      }, 700); // match the .duration-700 in AnimatedSlide
    }, 700);   // wait long enough for the old slide to exit
  };

  // Auto-advance every 6s
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setInterval(() => {
      if (!isMoving) {
        navigate(activeIndex + 1);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex, isMoving, isLoaded]);

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex h-full items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin" />
        </div>
      </div>

      {/* Slideshow Container */}
      <div
        ref={containerRef}
        className={`relative w-full h-screen overflow-hidden bg-white transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Current Slide */}
        <AnimatedSlide
          {...slidesData[activeIndex]}
          animate={animationTrigger}
          isExiting={isExiting}
        />

        {/* Left Arrow */}
        <button
          onClick={() => navigate(activeIndex - 1)}
          className={`absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                     text-white w-14 h-14 rounded-full flex items-center justify-center 
                     z-20 transition-all duration-300 ease-in-out hover:scale-110 ${
                       isMoving ? 'opacity-50' : 'opacity-100'
                     }`}
          disabled={isMoving}
          aria-label="Previous slide"
        >
          <span className="text-2xl">❮</span>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => navigate(activeIndex + 1)}
          className={`absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 
                     text-white w-14 h-14 rounded-full flex items-center justify-center 
                     z-20 transition-all duration-300 ease-in-out hover:scale-110 ${
                       isMoving ? 'opacity-50' : 'opacity-100'
                     }`}
          disabled={isMoving}
          aria-label="Next slide"
        >
          <span className="text-2xl">❯</span>
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slidesData.map((_, i) => (
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
