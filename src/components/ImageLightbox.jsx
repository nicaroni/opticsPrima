import React, { useEffect, useState } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function ImageLightbox({ 
  isOpen, 
  onClose, 
  currentImage, 
  allImages,
  onPrev,
  onNext,
  currentIndex,
  variant = 'default' // Add variant prop to support different layouts
}) {
  // For touch swipe detection
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  
  // Minimum swipe distance to register as a gesture (in pixels)
  const minSwipeDistance = 50;
  
  // Reset touch state when image changes
  useEffect(() => {
    setTouchStart(null);
    setTouchEnd(null);
    setTranslateX(0);
    setIsSwiping(false);
  }, [currentIndex]);
  
  // Handle touch events
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Calculate live translation for feedback during swipe
    setTranslateX(diff * 0.5); // Scale down movement for smoother feel
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const endTouch = e.changedTouches[0].clientX;
    setTouchEnd(endTouch);
    
    // Calculate swipe distance
    const distance = endTouch - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;
    
    // Trigger navigation based on swipe direction
    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
    
    // Reset swipe state
    setIsSwiping(false);
    setTranslateX(0);
    setTouchStart(null);
  };
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Special styling for newGlasses variant
  const isNewGlasses = variant === 'newGlasses';
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white bg-opacity-80 select-none">
      {/* Close button with white circle and black X */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-[20px] p-6 rounded-full bg-white hover:bg-gray-100 transition-all z-100 shadow-md"
        aria-label="Close lightbox"
      >
        <XMarkIcon className="w-6 h-6 text-black" />
      </button>

      {/* Container with defined dimensions and centered content */}
      <div className="relative flex items-center justify-center w-full max-w-4xl">
        {/* Previous button - positioned relative to container */}
        <button 
          onClick={onPrev}
          className={`absolute left-[30px] sm:left-4 md:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full 
            bg-white hover:bg-gray-100 transition-all shadow-md z-10 
            ${isNewGlasses ? '-translate-x-full sm:-translate-x-3/4 md:-translate-x-full' : ''}`}
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
        
        {/* Fixed-size image container with reduced width on mobile */}
        <div 
          className="relative flex items-center justify-center w-[85%] sm:w-[90%] md:w-[95%] lg:w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`transition-transform duration-300 ease-out flex items-center justify-center ${isNewGlasses ? 'h-[60vh] w-full' : ''}`}
            style={{
              transform: `translateX(${translateX}px)`
            }}
          >
            {/* Fixed aspect ratio container for consistent sizing */}
            <div className={`${isNewGlasses ? 'w-full h-full flex items-center justify-center rounded-2xl overflow-hidden p-2' : ''}`}>
              <img 
                src={currentImage?.src} 
                alt={currentImage?.name} 
                className={`${isNewGlasses ? 'max-w-full max-h-full object-contain rounded-xl shadow-sm' : 'max-w-full max-h-[80vh] object-contain'}`}
                draggable="false"
                style={isNewGlasses ? { borderRadius: '1rem' } : {}}
              />
            </div>
          </div>
          
          {/* Swipe indicators (unchanged) */}
          {isSwiping && translateX > 20 && (
            <div className="absolute left-8 text-white  rounded-full p-6">
              <ChevronLeftIcon className="" />
            </div>
          )}
          
          {isSwiping && translateX < -20 && (
            <div className="absolute right-8 text-white  rounded-full p-6">
              <ChevronRightIcon className="" />
            </div>
          )}
        </div>

        {/* Next button - positioned relative to container */}
        <button 
          onClick={onNext}
          className={`absolute right-[30px] sm:right-4 md:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full 
            bg-white hover:bg-gray-100 transition-all shadow-md z-10 
            ${isNewGlasses ? 'translate-x-full sm:translate-x-3/4 md:translate-x-full' : ''}`}
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>
      
      {/* Image counter */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-1 rounded-full z-[60] shadow-md">
        {currentIndex + 1} / {allImages.length}
      </div>
      
      {/* Swipe instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white bg-black bg-opacity-40 px-3 py-1 rounded-full opacity-70">
        Плъзнете за навигация
      </div>
    </div>
  );
}