// src/hooks/useScrollReveal.js
import { useEffect } from 'react';

export default function useScrollReveal({
  selector = '.scroll-reveal',
  revealedClass = 'revealed',
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
} = {}) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(revealedClass);
          observer.unobserve(entry.target);
        }
      });
    }, { root, rootMargin, threshold });

    // Observe all matching elements
    const targets = document.querySelectorAll(selector);
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, revealedClass, root, rootMargin, threshold]);
}
