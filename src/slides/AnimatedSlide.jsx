import React, { useEffect, useState, useRef } from 'react';

/**
 * Unified animations, but respects textOnLeft:
 * - If textOnLeft == true => text from left, image from right
 * - If textOnLeft == false => text from right, image from left
 *
 * Enter:
 *   1) short delay for text => visible
 *   2) short delay for image => visible
 * Exit:
 *   both text and image => invisible simultaneously
 *
 * The timing/durations here should match your parent's
 * setTimeout logic in the slideshow to avoid flicker.
 */
export default function AnimatedSlide({ 
  title, 
  subtitle, 
  description, 
  buttons = [],
  imageSrc, 
  textOnLeft = true, 
  animate,          // triggers re-run of the "enter" effect
  isExiting = false // signals that we should run "exit" effect
}) {
  // Whether each element is "visible" in its final position
  const [textVisible, setTextVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // Add a state to track image loading
  const [imageError, setImageError] = useState(false); // Add error state

  // Use a ref to keep track of the current image src
  const currentImageSrcRef = useRef(imageSrc);

  // Re-run every time "animate" or "isExiting" changes
  useEffect(() => {
    let textTimer, imageTimer;

    // Reset both to hidden first
    setTextVisible(false);
    setImageVisible(false);

    if (!isExiting) {
      // ENTER
      // Show text first
      textTimer = setTimeout(() => setTextVisible(true), 100); 
      // Then show image
      imageTimer = setTimeout(() => setImageVisible(true), 300);
    } else {
      // EXIT
      // Simultaneous exit
      textTimer = setTimeout(() => setTextVisible(false), 0);
      imageTimer = setTimeout(() => setImageVisible(false), 0);
    }

    return () => {
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
    };
  }, [animate, isExiting]);

  // Reset image states when image source changes
  useEffect(() => {
    // Only reset if the image source actually changed
    if (currentImageSrcRef.current !== imageSrc) {
      console.log(`Image source changed: ${imageSrc}`);
      setImageLoaded(false);
      setImageError(false);
      currentImageSrcRef.current = imageSrc;
      
      // Preload the image
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => {
        console.error(`Failed to load image: ${imageSrc}`);
        setImageError(true);
      };
    }
  }, [imageSrc]);

  // For text: if textOnLeft => hidden state is "translate-x-[-20]", else "translate-x-[+20]"
  const textHidden = textOnLeft ? '-translate-x-20 opacity-0' : 'translate-x-20 opacity-0';
  const textVisibleState = 'translate-x-0 opacity-100';

  // For image: if textOnLeft => hidden state is "translate-x-[+20]", else "translate-x-[-20]"
  const imageHidden = textOnLeft ? 'translate-x-20 opacity-0' : '-translate-x-20 opacity-0';
  const imageVisibleState = 'translate-x-0 opacity-100';

  const textClasses = [
    'w-1/2',
    'lg:w-[45%]',
    'xl:w-[40%]',
    'p-4',
    'rounded-lg',
    'transition-all',
    'duration-700',
    'ease-out',
    'transform',
    textVisible ? textVisibleState : textHidden,
  ].join(' ');

  const imageClasses = [
    'w-1/2',
    'lg:w-[45%]',
    'xl:w-[40%]',
    'rounded-lg',
    'transition-all',
    'duration-700',
    'ease-out',
    'transform',
    imageVisible ? imageVisibleState : imageHidden,
  ].join(' ');

  console.log(`Rendering slide with image: ${imageSrc}, loaded: ${imageLoaded}, error: ${imageError}`);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br 
                    from-[#fdfbfb] to-[#ebedee] text-white px-6">
      <section className="min-h-screen bg-cover bg-center flex flex-row items-center 
                         justify-center text-white px-4 gap-6 relative overflow-hidden select-none">
        {/* TEXT BLOCK */}
        {textOnLeft && (
          <div className={textClasses}>
            <h1 className="text-4xl font-bold mb-4 text-gray-600">{title}</h1>
            {subtitle && <h2 className="text-xl font-bold mb-4 text-gray-600">{subtitle}</h2>}
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
        <div className={imageClasses}>
          {/* Show placeholder while loading or on error */}
          <div 
            className={`absolute inset-0 bg-gray-200 rounded-lg transition-opacity duration-300 ${
              imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* Show error icon if image failed to load */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}
          </div>
          
          <img
            key={imageSrc} // Add a key to force re-render when image changes
            src={imageSrc}
            loading="eager"
            className={`w-full h-[75vh] object-cover object-top rounded-lg shadow-lg 
                        transition-opacity duration-500 ease-in-out ${
                          imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
                        }`}
            onLoad={(e) => {
              console.log(`Image loaded: ${imageSrc}`);
              setImageLoaded(true);
            }}
            onError={(e) => {
              console.error(`Failed to load image: ${imageSrc}`);
              setImageError(true);
            }}
            alt="Slide visual"
          />
        </div>

        {/* If text is on the right */}
        {!textOnLeft && (
          <div className={textClasses}>
            <h1 className="text-4xl font-bold mb-4 text-gray-600">{title}</h1>
            {subtitle && <h2 className="text-xl font-bold mb-4 text-gray-600">{subtitle}</h2>}
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
