

import { useEffect } from 'react';

export default function ImagePreloader({ imageSrcs = [] }) {
  useEffect(() => {
    const preloadedImages = [];
    
    imageSrcs.forEach(src => {
      if (src) {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img); // Keep reference to avoid garbage collection
        
        // Debug success/failure
        img.onload = () => console.log(`Preloaded: ${src}`);
        img.onerror = () => console.error(`Failed to preload: ${src}`);
      }
    });
    
    return () => {
      // Clear references on cleanup
      preloadedImages.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageSrcs]);
  
  return null;
}