import React, { useEffect, useState } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function ImageLightbox({ 
  isOpen, 
  onClose, 
  currentImage, 
  allImages,
  onPrev,
  onNext,
  currentIndex
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-white bg-opacity-80 select-none">
      {/* Close button with white circle and black X */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-10 p-6 rounded-full bg-white hover:bg-gray-100 transition-all z-100 shadow-md"
        aria-label="Close lightbox"
      >
        <XMarkIcon className="w-6 h-6 text-black" />
      </button>

      {/* Previous button with white circle and black arrow */}
      <button 
        onClick={onPrev}
        className="absolute left-4 p-2 rounded-full bg-white hover:bg-gray-100 transition-all shadow-md"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-6 h-6 text-black" />
      </button>
      
      {/* Image container with touch event handlers */}
      <div 
        className="relative w-full max-w-4xl max-h-full flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`transition-transform duration-300 ease-out w-full flex items-center justify-center`}
          style={{
            transform: `translateX(${translateX}px)`
          }}
        >
          <img 
            src={currentImage?.src} 
            alt={currentImage?.name} 
            className="max-w-full max-h-[80vh] object-contain"
            draggable="false"
          />
        </div>
        
        {/* Visual feedback indicators during swipe */}
        {isSwiping && translateX > 20 && (
          <div className="absolute left-8 text-white bg-black bg-opacity-40 rounded-full p-6">
            <ChevronLeftIcon className="w-8 h-8" />
          </div>
        )}
        
        {isSwiping && translateX < -20 && (
          <div className="absolute right-8 text-white bg-black bg-opacity-40 rounded-full p-6">
            <ChevronRightIcon className="w-8 h-8" />
          </div>
        )}
        
        {/* Product name */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 rounded-3xl text-white p-4 text-center">
          <h3 className="text-lg md:text-xl font-medium">{currentImage?.name}</h3>
        </div>
      </div>

      {/* Next button with white circle and black arrow */}
      <button 
        onClick={onNext}
        className="absolute right-4 p-2 rounded-full bg-white hover:bg-gray-100 transition-all shadow-md"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-6 h-6 text-black" />
      </button>
      
      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-1 rounded-full">
        {currentIndex + 1} / {allImages.length}
      </div>
      
      {/* Optional swipe instructions for users on first open */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white bg-black bg-opacity-40 px-3 py-1 rounded-full opacity-70">
        Плъзнете за навигация
      </div>
    </div>
  );
}