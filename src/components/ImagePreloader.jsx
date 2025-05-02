import { useEffect } from 'react';

export default function ImagePreloader({ imageSrcs = [] }) {
  useEffect(() => {
    const preloadedImages = [];
    
    imageSrcs.forEach(src => {
      if (src) {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img); // Keep reference to avoid garbage collection
        
        // Optionally keep minimal error logging for production issues
        img.onerror = () => {
          if (process.env.NODE_ENV !== 'production') {
            console.error(`Failed to preload: ${src}`);
          }
        };
      }
    });
    
    return () => {
      // Clean up references on unmount
      preloadedImages.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageSrcs]);
  
  return null;
}