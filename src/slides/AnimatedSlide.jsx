// src/slides/AnimatedSlide.jsx

import React, { useEffect, useRef, useState } from 'react';

/**
 * Reusable Slide:
 * - `title`, `subtitle`, `description`: text
 * - `imageSrc`: path to image
 * - `textOnLeft`: boolean controlling text-left/image-right or vice versa
 * - `animate`: toggles the in/out animations
 */
export default function AnimatedSlide({ 
  title, 
  subtitle, 
  description, 
  buttons = [],
  imageSrc, 
  textOnLeft = true, 
  animate 
}) {
  const [animateImage, setAnimateImage] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // Reset animations each time "animate" changes
    setAnimateImage(false);
    setAnimateText(false);

    // Timed entry
    const imageTimer = setTimeout(() => setAnimateImage(true), 100);
    const textTimer = setTimeout(() => setAnimateText(true), 400);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(textTimer);
    };
  }, [animate]);

  // Common "enter from left" or "enter from right"
  // If textOnLeft === true, text enters from left, image from right, etc.
  const textEnterClass = textOnLeft 
    ? (animateText ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0')
    : (animateText ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0');

  const imageEnterClass = textOnLeft
    ? (animateImage ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0')
    : (animateImage ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0');

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br 
                    from-[#fdfbfb] to-[#ebedee] text-white px-6">
      <section className="min-h-screen bg-cover bg-center flex flex-row items-center 
                         justify-center text-white px-4 gap-6">
        {/* TEXT BLOCK */}
        {textOnLeft && (
          <div ref={textRef}
               className={`w-1/2 lg:w-[45%] xl:w-[40%] p-4 
                           rounded-lg transition-all duration-700 ease-out transform
                           ${textEnterClass}`}
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-600">{title}</h1>
            {subtitle && (
              <h2 className="text-xl font-bold mb-4 text-gray-600">{subtitle}</h2>
            )}
            <p className="text-xl mb-6 max-w-xl text-gray-600">
              {description}
            </p>

            {buttons.length > 0 && (
              <div className="space-x-4">
                {buttons.map((btn, i) => (
                  <button
                    key={i}
                    className={btn.className}
                    onClick={btn.onClick}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* IMAGE BLOCK */}
        <div ref={imageRef}
             className={`w-1/2 lg:w-[45%] xl:w-[40%] rounded-lg 
                         transition-all duration-700 ease-out transform
                         ${imageEnterClass}`}
        >
          <div className="absolute inset-0 bg-gray-200"></div>
          <img
            src={imageSrc}
            loading="eager"
            className="w-full h-[75vh] object-cover object-top rounded-lg shadow-lg
                       transition-all duration-900 ease-in-out opacity-0"
            onLoad={(e) => {
              // Fade in the image once loaded
              e.currentTarget.classList.remove('opacity-0');
              // Optionally remove the placeholder overlay
              if (e.currentTarget.parentNode) {
                const placeholder = e.currentTarget.parentNode.querySelector('div');
                if (placeholder) placeholder.style.opacity = 0;
              }
            }}
            alt="Slide visual"
          />
        </div>

        {!textOnLeft && (
          <div ref={textRef}
               className={`w-1/2 lg:w-[45%] xl:w-[40%] p-4 
                           rounded-lg transition-all duration-700 ease-out transform
                           ${textEnterClass}`}
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-600">{title}</h1>
            {subtitle && (
              <h2 className="text-xl font-bold mb-4 text-gray-600">{subtitle}</h2>
            )}
            <p className="text-xl mb-6 max-w-xl text-gray-600">
              {description}
            </p>

            {buttons.length > 0 && (
              <div className="space-x-4">
                {buttons.map((btn, i) => (
                  <button
                    key={i}
                    className={btn.className}
                    onClick={btn.onClick}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
