// src/hooks/useIntersectionObserver.js

import { useEffect } from 'react';

/**
 * A generic IntersectionObserver hook:
 * - `ref` = React ref to the element you want to observe
 * - `options` = observer options (root, rootMargin, threshold, etc.)
 * - `callback` = function that runs when intersection changes
 */
export function useIntersectionObserver(ref, options, callback) {
  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        callback(entry, obs);
      });
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, callback]);
}
