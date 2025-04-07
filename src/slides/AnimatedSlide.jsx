import React, { useEffect, useState } from 'react';

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
          {/* Simple placeholder */}
          <div className="absolute inset-0 bg-gray-200 pointer-events-none" />
          <img
            src={imageSrc}
            loading="eager"
            className="w-full h-[75vh] object-cover object-top rounded-lg shadow-lg
                       transition-opacity duration-500 ease-in-out opacity-0"
            onLoad={(e) => {
              // Fade in the <img> once loaded
              e.currentTarget.classList.remove('opacity-0');
              // Fade out the placeholder
              if (e.currentTarget.parentNode) {
                const placeholder = e.currentTarget.parentNode.querySelector('div');
                if (placeholder) placeholder.style.opacity = 0;
              }
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
