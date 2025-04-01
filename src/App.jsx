import React, { useEffect, useRef, useState} from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import CustomSlideshow from './CustomSlideshow';
import BrandSlider from './components/BrandSlider';
import { StarIcon } from '@heroicons/react/24/solid';  // Updated import
import './assets/styles/stars.css';  // Import the CSS file
import GlassesShowcase from './containers/GlassesShowcase';
import './assets/styles/animation.css';
import TestimonialsSection from './containers/TestimonialsSection';

function App() {
  const [isScrolling, setIsScrolling] = useState(false);
  const contactSectionRef = useRef(null);
  const [showViberAnimation, setShowViberAnimation] = useState(false);

  // Improved scroll function with debouncing and better easing
  const scrollToSection = (sectionId) => {
    // Prevent multiple scroll attempts
    if (isScrolling) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      
      // Get current position
      const startPosition = window.pageYOffset;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const distance = targetPosition - startPosition;
      
      // Small delay to prevent animation conflicts
      setTimeout(() => {
        // Smooth scroll with requestAnimationFrame
        animateScroll(startPosition, distance);
      }, 50);
    }
  };

  const animateScroll = (startPos, distance) => {
    const duration = 1000; // ms
    const startTime = performance.now();
    
    const animateFrame = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeInOutCubic)
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPos + distance * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        // Finish scrolling
        setIsScrolling(false);
      }
    };
    
    requestAnimationFrame(animateFrame);
  };

  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    script.setAttribute('async', true);
    head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      if (head.contains(script)) {
        head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null, // use the viewport
      rootMargin: '0px',
      threshold: 0.1 // trigger when at least 10% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, stop observing
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Select all elements with scroll-reveal classes
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Calendly loading logic
  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    script.setAttribute('async', true);
    head.appendChild(script);

    return () => {
      if (head.contains(script)) {
        head.removeChild(script);
      }
    };
  }, []);

  // Animation on scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the contact section is visible, animate the columns
            const columns = entry.target.querySelectorAll('.contact-column');
            columns.forEach((column, index) => {
              // Stagger the animations
              setTimeout(() => {
                column.classList.add('animate-in');
                
                // Start Viber animation after all columns are loaded (after the last column)
                if (index === columns.length - 1) {
                  setTimeout(() => {
                    setShowViberAnimation(true);
                    
                    // Reset the animation after 3 seconds
                    setTimeout(() => {
                      setShowViberAnimation(false);
                    }, 3000);
                  }, 500); // Wait 500ms after all columns appear
                }
              }, index * 200); // 200ms delay between each column
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    const currentRef = contactSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="font-sans text-gray-900">
      {/* Header / Nav */}
      <Header  scrollToSection={scrollToSection} />

      <>
        <CustomSlideshow />
      </>
      <>
        <div 
          onClick={() => scrollToSection('collection')} 
          className="cursor-pointer hover:opacity-90 transition-opacity"
        >
          <BrandSlider />
        </div>
      </>

      {/* Dioptric Glasses */}
      <section className="min-h-screen bg-cover bg-center flex flex-row items-center justify-center text-white px-4 text-center">
        <div className="section-text m-8 scroll-reveal scroll-reveal-right">
          <h1 className="text-4xl font-bold mb-4 text-gray-600">
            Диоптрични очила
          </h1>
          <p className="text-xl mb-6 max-w-xl text-gray-600">
            Открийте богата селекция от стилни и функционални диоптрични очила, съобразени с вашите нужди.
          </p>
        </div>
  
        <img
          src="/images/glasses-main.jpg"
          alt="Various Dioptric Glasses"
          className="rounded-xl shadow-lg w-[200px] sm:w-[250px] lg:w-[300px] max-w-xs object-cover
                    scroll-reveal scroll-reveal-up"
        />
      </section>

      {/* Sunglasses */}
      <section className="min-h-screen bg-cover bg-center flex flex-row items-center justify-center text-white px-4 text-center">
        <img
          src="/images/glasses-main2.jpg"
          alt="Various sun Glasses"
          className="rounded-xl shadow-lg w-[400px] sm:w-[500px] lg:w-[600px] max-w-xl object-cover
                    scroll-reveal scroll-reveal-up
                    "
        />

        <div className="section-text m-8 scroll-reveal scroll-reveal-right">
          <h1 className="text-4xl font-bold mb-4 text-gray-600">
            Слънчеви очила
          </h1>
          <p className="text-xl mb-6 max-w-xl text-gray-600">
            Защити очите си със стил – новата ни колекция слънчеви очила с UV защита.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-6
                    flex flex-col items-center justify-center px-4 text-center"
              id="collection">
        <GlassesShowcase />
      </section>

      {/* Eye Exams */}
      <section className="min-h-screen bg-cover bg-center
                         flex flex-row items-center justify-center text-white px-4 text-center">
        <div className="section-text m-8 scroll-reveal scroll-reveal-right">
          <h1 className="text-4xl font-bold mb-4 text-gray-600">
            Очен преглед
          </h1>
          <p className="text-xl mb-6 max-w-xl text-gray-600">
            Ясната визия започва с добър преглед – от доверен и опитен оптометрист.
          </p>
        </div>

        <img
          src="/images/appointment-model.jpg"
          alt="Various Dioptric Glasses"
          className="rounded-xl shadow-lg w-[400px] sm:w-[500px] lg:w-[600px] max-w-xl object-cover
                    scroll-reveal scroll-reveal-up"
        />
      </section>

      {/* Testimonials */}
    <section>
    <TestimonialsSection />

    </section>
    <section 
        ref={contactSectionRef}
        className="w-full py-12 px-4 bg-gray-50 overflow-hidden"
      >
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-8">За контакти</h2>

        {/* Three-column layout with increased spacing */}
        <div className="flex flex-col md:flex-row w-full gap-10 justify-center">

          {/* LEFT COLUMN - Wrapped in a consistent container */}
          <div className="contact-column flex flex-col w-full md:w-1/3 h-[750px] opacity-0 -translate-y-16 transition-all duration-700 ease-out">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full h-full p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-center mb-2">Информация за контакт</h3>
                
                {/* Google Map with hover effect - INVERTED ARROW pointing TO the element */}
                <div className="flex justify-start w-full relative">
                  <div className="hover-item w-[65%] flex flex-col items-start relative transition-transform duration-300 hover:scale-105 hover:z-10 group">
                    <h4 className="text-lg font-medium mb-2">Къде ще ни намерите 📍</h4>
                    <iframe
                      title="Google Map for Tsarevo"
                      className="w-full h-[180px] overflow-hidden rounded-xl shadow-md"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2957.083560596097!2d27.84591437638717!3d42.16989414709415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a12ebc94073389%3A0xde813f3623eef90b!2sTsentar%2C%20ul.%20%22Han%20Asparuh%22%2039%2C%208260%20Tsarevo!5e0!3m2!1sen!2sbg!4v1743339411617!5m2!1sen!2sbg"
                    />
                    {/* Arrow positioned outside pointing TO the map */}
                    <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Facebook Page Embed with hover effect - INVERTED ARROW pointing TO the element */}
                <div className="flex justify-end w-full relative">
                  <div className="hover-item w-[65%] overflow-hidden rounded-xl shadow-md relative transition-transform duration-300 hover:scale-105 hover:z-10 group">
                    <div className="p-3 bg-blue-600 text-white font-semibold flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.527c-1.503 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Оптика ПРИМА
                    </div>
                    <div className="h-[130px] w-full">
                      <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Foptikacarevo&adapt_container_width=true&hide_cover=false&show_facepile=true"
                        className="w-full h-full"
                        style={{ border: "none", overflow: "hidden" }}
                        allow="encrypted-media"
                        title="Facebook Page"
                      />
                    </div>
                    {/* Arrow positioned outside pointing TO the facebook panel */}
                    <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viber Contact Link - with special attention animation */}
              <div className="flex justify-start w-full mt-auto relative">
                <div 
                  className={`hover-item flex items-center p-3 rounded-xl shadow-md w-[60%] bg-gray-50 relative transition-all duration-300 hover:scale-105 hover:z-10 group
                  ${showViberAnimation ? 'viber-attention scale-110 z-20' : ''}`}
                >
                  <a
                    href="viber://contact?number=+359889962200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 hover:opacity-80"
                  >
                    <img
                      src="/viber.png"
                      alt="Viber Icon"
                      className="h-7 w-7"
                    />
                    <span className="text-sm font-semibold">+359889962200</span>
                  </a>
                  {/* Arrow positioned outside pointing TO the viber panel */}
                  <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  
                  {/* LED animation dots that only show during the attention animation */}
                  {showViberAnimation && (
                    <>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-1"></div>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-2"></div>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-3"></div>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-4"></div>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-5"></div>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-6"></div>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-7"></div>
                      <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-8"></div>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">гр.Царево ул.Хан Аспарух 39 8260</p>
            </div>
          </div>

    {/* MIDDLE COLUMN - Contact Form */}
    <div className="contact-column flex flex-col w-full md:w-1/3 items-center h-[750px] opacity-0 -translate-y-16 transition-all duration-700 ease-out">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full p-8 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-5 text-center">Изпратете ни съобщение</h3>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Име <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Вашето име"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Имейл <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон <span className="text-gray-400">(незадължително)</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="+359 88 123 4567"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Съобщение <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows="8"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Вашето съобщение..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >
              Изпрати
            </button>
          </form>
        </div>
        
        {/* Email link replacing address */}
        <div className="pt-4 border-t border-gray-200 text-center text-gray-600 mt-auto">
          <p className="mb-2">Или ни пишете директно на:</p>
          <a 
            href="mailto:optika_prima@gmail.com" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            optika_prima@gmail.com
          </a>
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN - Calendly Widget */}
    <div className="contact-column md:w-1/3 flex justify-center h-[750px] opacity-0 -translate-y-16 transition-all duration-700 ease-out">
      <div
        className="calendly-inline-widget w-full h-full rounded-xl shadow-lg overflow-hidden"
        data-url="https://calendly.com/optikacarevo/30min"
      />
    </div>
  </div>
</section>

      {/* Add CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Pulsing border effect for Viber attention */
        .viber-attention {
          box-shadow: 0 0 0 2px rgba(123, 31, 162, 0.5), 0 0 0 4px rgba(123, 31, 162, 0.3), 0 0 20px rgba(123, 31, 162, 0.2);
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        
        /* LED dot animations */
        .led-dot-1 {
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          animation: blink 0.4s infinite 0.1s;
        }
        
        .led-dot-2 {
          top: 5px;
          right: -5px;
          animation: blink 0.4s infinite 0.2s;
        }
        
        .led-dot-3 {
          top: 50%;
          right: -5px;
          transform: translateY(-50%);
          animation: blink 0.4s infinite 0.3s;
        }
        
        .led-dot-4 {
          bottom: 5px;
          right: -5px;
          animation: blink 0.4s infinite 0.4s;
        }
        
        .led-dot-5 {
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          animation: blink 0.4s infinite 0.5s;
        }
        
        .led-dot-6 {
          bottom: 5px;
          left: -5px;
          animation: blink 0.4s infinite 0.6s;
        }
        
        .led-dot-7 {
          top: 50%;
          left: -5px;
          transform: translateY(-50%);
          animation: blink 0.4s infinite 0.7s;
        }
        
        .led-dot-8 {
          top: 5px;
          left: -5px;
          animation: blink 0.4s infinite 0.8s;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
      
    
    </div>
  );
}

export default App;

