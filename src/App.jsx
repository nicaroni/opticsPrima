// src/App.jsx

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import CustomSlideshow from './CustomSlideshow';
import BrandSlider from './components/BrandSlider';
import GlassesShowcase from './containers/GlassesShowcase';
import TestimonialsSection from './containers/TestimonialsSection';
import ContactSection from './components/ContactSection';
import HeroSection from './components/HeroSection';

import useScrollReveal from './hooks/useScrollReveal';  // NEW
import './assets/styles/animation.css';
import './assets/styles/stars.css';
import './App.css';

function App() {
  const [isScrolling, setIsScrolling] = useState(false);

  // 1) Calendly script
  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    head.appendChild(script);
    return () => {
      if (head.contains(script)) {
        head.removeChild(script);
      }
    };
  }, []);

  // 2) Global scroll reveal for elements with `.scroll-reveal`
  useScrollReveal({
    selector: '.scroll-reveal',
    revealedClass: 'revealed',
    threshold: 0.1
  });

  // 3) Smooth scrolling logic (unchanged from before)
  const scrollToSection = (sectionId) => {
    if (isScrolling) return;
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      const startPosition = window.pageYOffset;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const distance = targetPosition - startPosition;
      setTimeout(() => {
        animateScroll(startPosition, distance);
      }, 50);
    }
  };

  const animateScroll = (startPos, distance) => {
    const duration = 1000;
    const startTime = performance.now();
    const animateFrame = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // easeInOutCubic
      const easeProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPos + distance * easeProgress);
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        setIsScrolling(false);
      }
    };
    requestAnimationFrame(animateFrame);
  };

  return (
    <div className="font-sans text-gray-900">
      <Header scrollToSection={scrollToSection} />

      <CustomSlideshow />

      {/* Brand Slider (click => scrollTo 'collection') */}
      <div
        onClick={() => scrollToSection('collection')}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <BrandSlider />
      </div>

      {/* Hero: Dioptric Glasses */}
      <HeroSection
        id="dioptric"
        title="Диоптрични очила"
        text="Открийте богата селекция от стилни и функционални диоптрични очила, съобразени с вашите нужди."
        imageSrc="/images/glasses-main.jpg"
      />

      {/* Hero: Sunglasses */}
      <HeroSection
        id="sunglasses"
        title="Слънчеви очила"
        text="Защити очите си със стил – новата ни колекция слънчеви очила с UV защита."
        imageSrc="/images/glasses-main2.jpg"
        reverse
      />

      {/* Glasses Showcase */}
      <section
        id="collection"
        className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 flex flex-col items-center justify-center px-4 text-center"
      >
        <GlassesShowcase />
      </section>

      {/* Hero: Eye Exams */}
      <HeroSection
        id="eye-exams"
        title="Очен преглед"
        text="Ясната визия започва с добър преглед – от доверен и опитен оптометрист."
        imageSrc="/images/appointment-model.jpg"
      />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact */}
      <ContactSection />
    </div>
  );
}

export default App;
