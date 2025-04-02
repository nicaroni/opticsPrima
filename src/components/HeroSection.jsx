// src/components/HeroSection.jsx

import React from 'react';

/**
 * Reusable Hero-like section (background, text, image).
 * `id` lets you anchor with scrollToSection.
 * `title`, `text`, `imageSrc`, etc. can be passed in
 * `reverse` (optional) = text on the right, image on the left
 */
export default function HeroSection({
  id,
  title,
  text,
  imageSrc,
  reverse = false,
  textColor = 'text-gray-600',
  ...props
}) {
  return (
    <section
      id={id}
      className="min-h-screen bg-cover bg-center 
                 flex flex-row items-center justify-center text-white px-4 text-center"
      {...props}
    >
      {/* If reverse=true, show image first */}
      {reverse && imageSrc && (
        <img
          src={imageSrc}
          alt="hero"
          className="rounded-xl shadow-lg w-[400px] sm:w-[500px] lg:w-[600px] max-w-xl object-cover scroll-reveal scroll-reveal-up"
        />
      )}

      <div className="section-text m-8 scroll-reveal scroll-reveal-right">
        <h1 className={`text-4xl font-bold mb-4 ${textColor}`}>{title}</h1>
        <p className={`text-xl mb-6 max-w-xl ${textColor}`}>
          {text}
        </p>
      </div>

      {/* If reverse=false, show image second */}
      {!reverse && imageSrc && (
        <img
          src={imageSrc}
          alt="hero"
          className="rounded-xl shadow-lg w-[200px] sm:w-[250px] lg:w-[300px] max-w-xs object-cover scroll-reveal scroll-reveal-up"
        />
      )}
    </section>
  );
}
