/*

import { useState, useEffect } from 'react';

export default function ImageDebugger({ imageSrcs = [] }) {
  const [status, setStatus] = useState({});
  
  useEffect(() => {
    const newStatus = {};
    
    imageSrcs.forEach(src => {
      if (src) {
        newStatus[src] = 'loading';
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setStatus(prev => ({ ...prev, [src]: 'loaded' }));
        };
        img.onerror = () => {
          setStatus(prev => ({ ...prev, [src]: 'error' }));
        };
      }
    });
    
    setStatus(prev => ({ ...prev, ...newStatus }));
  }, [imageSrcs]);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded z-50 max-w-xs max-h-48 overflow-auto text-xs">
      <h4>Image Debug:</h4>
      <ul>
        {Object.entries(status).map(([src, state]) => (
          <li key={src} className={state === 'error' ? 'text-red-400' : state === 'loaded' ? 'text-green-400' : 'text-yellow-400'}>
            {src.split('/').pop()}: {state}
          </li>
        ))}
      </ul>
    </div>
  );
}

*/