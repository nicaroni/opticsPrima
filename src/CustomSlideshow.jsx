// src/CustomSlideshow.jsx

import React, { useState, useEffect, useRef } from 'react';
import AnimatedSlide from './slides/AnimatedSlide';
import createSlidesData from './slides/slidesData';
import ImagePreloader from './components/ImagePreloader';

// This ensures images are actually loaded into cache
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Failed to preload: ${src}`);
      }
      reject(new Error(`Failed to preload ${src}`));
    };
  });
}

export default function CustomSlideshow({ scrollToSection }) {
  // Create slides with the navigation function
  const slidesData = createSlidesData(scrollToSection);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const containerRef = useRef(null);

  const getNextSlideIndex = (current) => {
    return current === slidesData.length - 1 ? 0 : current + 1;
  };

  const getPrevSlideIndex = (current) => {
    return current === 0 ? slidesData.length - 1 : current - 1;
  };

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

  // Preload all images on mount
  useEffect(() => {
    const allImageSrcs = slidesData.map(slide => slide.imageSrc);

    // Preload all images manually
    const preloadAllImages = async () => {
      try {
        const promises = allImageSrcs.map(src => preloadImage(src));
        const loaded = await Promise.allSettled(promises);
        setPreloadedImages(loaded.filter(result => result.status === 'fulfilled').map(result => result.value));
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error("Error preloading images:", error);
        }
      }
    };

    preloadAllImages();

    return () => {
      // Clean up preloaded images on unmount
      setPreloadedImages([]);
    };
  }, []);

  // Helper: navigate to a new index
  const navigate = (newIndex) => {
    if (isMoving) return;
    setIsMoving(true);

    // Handle wrapping around for next and previous
    const actualIndex = (newIndex + slidesData.length) % slidesData.length;

    // Prefetch next and previous slides
    const nextSlide = slidesData[(actualIndex + 1) % slidesData.length];
    const prevSlide = slidesData[(actualIndex - 1 + slidesData.length) % slidesData.length];

    // Force preload these specific images
    Promise.all([
      preloadImage(slidesData[actualIndex].imageSrc),
      preloadImage(nextSlide.imageSrc),
      preloadImage(prevSlide.imageSrc)
    ]).catch(err => {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Error preloading surrounding slides:", err);
      }
    });

    // Trigger exit on current slide
    setIsExiting(true);

    // Use a slightly longer timeout to ensure smooth transition
    setTimeout(() => {
      setActiveIndex(actualIndex);
      setIsExiting(false);
      setAnimationTrigger(prev => !prev);

      // Allow navigation again after the transition completes
      setTimeout(() => {
        setIsMoving(false);
      }, 900); // Slightly longer to ensure image has time to appear
    }, 700);
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

  // Preload not just next and previous, but all images
  const allImageSrcs = slidesData.map(slide => slide.imageSrc);

  return (
    <>
      {/* Preload ALL slide images on initial load */}
      <ImagePreloader imageSrcs={allImageSrcs} />

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
     
      {/* Add the debugger in development mode only */}
     {/* 
      {process.env.NODE_ENV === 'development' && (
        <ImageDebugger imageSrcs={allImageSrcs} />
      )}
     */} 

    </>
  );
}
