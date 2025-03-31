import React, { useEffect, useRef } from 'react';

export default function SectionThree() {
  const textRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.classList.remove('opacity-0');
      }
    }, 300); // slight delay so it loads nicely with image

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-[linear-gradient(120deg,_#fdfbfb_0%,_#ebedee_100%)] text-white px-6">
    <section
        className="min-h-screen bg-cover bg-center
            flex flex-row items-center justify-center text-white px-4 gap-6"
    >
        <div className="w-1/2 lg:w-[45%] xl:w-[40%] rounded-lg">
        <div className="absolute inset-0 bg-gray-200 "></div>
        <img 
            src="/images/model-girl3.jpg"
            loading="eager" // Use eager for first slide, lazy for others
            className="w-full h-[75vh] object-cover object-top rounded-lg shadow-lg transition-all duration-900 ease-in-out opacity-0"
            onLoad={(e) => {
              e.currentTarget.classList.remove('opacity-0');
              // Optional: remove the placeholder
              if (e.currentTarget.parentNode) {
                const placeholder = e.currentTarget.parentNode.querySelector('div');
                if (placeholder) placeholder.style.opacity = 0;
              }
            }}
            alt="Model wearing glasses" 
          />
        </div>

        <div  ref={textRef}
          className="w-1/2 lg:w-[45%] xl:w-[40%] p-4 rounded-lg transition-opacity duration-700 opacity-0">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-gray-700">
        Carrera със стил и отстъпка
        </h1>
    
        {/* Secondary heading - important but complementary */}
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
        До -40% на избрани рамки Carrera
        </h2>
    
        {/* Body text - readable and inviting */}
        <p className="text-xl mb-6 max-w-xl text-gray-600">
        Само сега – комбинирай визия и качество на специална цена. 
        </p>
    
        </div>
    </section>
    </div>
);
  }
  