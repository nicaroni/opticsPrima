import React, { useEffect, useRef, useState } from 'react';

export default function SectionThree({ direction, animate }) {
  const [animateImage, setAnimateImage] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // Always reset animations on slide change or reload
    setAnimateImage(false);
    setAnimateText(false);
    
    // Sequential animations - image first, then text
    const imageTimer = setTimeout(() => {
      setAnimateImage(true);
    }, 100);
    
    const textTimer = setTimeout(() => {
      setAnimateText(true);
    }, 400); // Delay text animation
    
    return () => {
      clearTimeout(imageTimer);
      clearTimeout(textTimer);
    };
  }, [animate]); // Trigger when animate prop changes

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-[linear-gradient(120deg,_#fdfbfb_0%,_#ebedee_100%)] text-white px-6">
      <section
          className="min-h-screen bg-cover bg-center
              flex flex-row items-center justify-center text-white px-4 gap-6"
      >
          <div 
            ref={imageRef}
            className={`w-1/2 lg:w-[45%] xl:w-[40%] rounded-lg transition-all duration-700 ease-out transform ${
              animateImage 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-full opacity-0' // Always enter from left
            }`}
          >
            <div className="absolute inset-0 bg-gray-200"></div>
            <img 
              src="/images/model-girl3.jpg"
              loading="eager"
              className="w-full h-[75vh] object-cover object-top rounded-lg shadow-lg transition-all duration-900 ease-in-out opacity-0"
              onLoad={(e) => {
                e.currentTarget.classList.remove('opacity-0');
                if (e.currentTarget.parentNode) {
                  const placeholder = e.currentTarget.parentNode.querySelector('div');
                  if (placeholder) placeholder.style.opacity = 0;
                }
              }}
              alt="Model wearing glasses" 
            />
          </div>

          <div  
            ref={textRef}
            className={`w-1/2 lg:w-[45%] xl:w-[40%] p-4 rounded-lg transition-all duration-700 ease-out transform ${
              animateText 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-full opacity-0' // Always enter from right
            }`}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-gray-700">
              Carrera със стил и отстъпка
            </h1>
        
            <h2 className="text-xl font-semibold mb-4 text-gray-600">
              До -40% на избрани рамки Carrera
            </h2>
        
            <p className="text-xl mb-6 max-w-xl text-gray-600">
              Само сега – комбинирай визия и качество на специална цена. 
            </p>
            <div className="space-x-4">
            <button className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-700">
            Виж част от моделите
            </button>
          </div>
          </div>
      </section>
    </div>
  );
}
