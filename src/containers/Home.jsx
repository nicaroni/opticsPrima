// src/Home.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Fix these imports by removing the "components/" prefix
import Header from '../components/Header';
import CustomSlideshow from '../CustomSlideshow'; // Same directory
import BrandSlider from '../components/BrandSlider';
import GlassesShowcase from '../containers/GlassesShowcase';
import TestimonialsSection from '../containers/TestimonialsSection';
import ContactSection from '../components/ContactSection'; // Not from './ContactSection'
import HeroSection from '../components/HeroSection'; // Not fr
import CookieSettings from '../components/CookieSettings'; // NEW
import BrandGrid from './BrandGrid';
import VideoSection from './VideoSection';

import useScrollReveal from '../hooks/useScrollReveal';  // NEW
import '../assets/styles/animation.css';
import '../assets/styles/stars.css';
import '../App.css';

function Home() {
  const [isScrolling, setIsScrolling] = useState(false);

  // 1) Calendly script
  useEffect(() => {
    // Check for consent first
    const consent = localStorage.getItem('cookie-consent');
    let hasConsent = false;
    
    if (consent) {
      try {
        const preferences = JSON.parse(consent);
        hasConsent = preferences.functional;
      } catch (e) {
        console.error('Error parsing cookie consent');
      }
    }
    
    // Only load if consent given
    if (hasConsent) {
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
    }
  }, []);

  // Google Analytics initialization code

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
      let targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      // Apply offset for "collection" section to position it higher
      // You can adjust this value (200) to position it exactly where you want
      if (sectionId === 'collection') {
        targetPosition -= 250; // Scroll 200px higher than the actual element
      } else {
        targetPosition -= 80; // Apply smaller offset for other sections
      }
      
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

      {/* Pass the scrollToSection function to CustomSlideshow */}
      <CustomSlideshow scrollToSection={scrollToSection} />

      {/* Brand Slider (click => scrollTo 'collection') */}
      <div
        onClick={() => scrollToSection('collection')}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <BrandSlider  scrollToSection={scrollToSection}/>
      </div>

      {/* Hero: Dioptric Glasses */}
      <HeroSection
        id="dioptric"
        title="Диоптрични очила"
        text={`Открийте богата селекция от стилни и функционални диоптрични очила, съобразени с вашите нужди.`}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746602434/glasses3_pn5s9l.jpg"
      />

      {/* Hero: Sunglasses */}
      <HeroSection
        id="sunglasses"
        title="Слънчеви очила"
        text={`Защити очите си със стил – новата ни колекция слънчеви очила с UV защита.`}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746602434/glasses2_c4cybi.jpg"
        reverse
      />


<BrandGrid scrollToSection={scrollToSection} />
      

        {/* Hero: Sunglasses */}
        <HeroSection
        id="sun-lenses"
        title="Цветни слънчеви стъкла"
        text={`[[Богат избор от цветни слънчеви стъкла]] – за вашите очила с UV защита и стил.
        [[Едноцветни и градиентни варианти]] – от класически сиво, зелено и кафяво, до модерни нюанси като лавандула, розово, жълто и синьо.
        [[Специални серии за шофиране и екранна защита]] – с филтри за отблясъци и подобрен контраст.
        Всички стъкла могат да бъдат изработени както с диоптър, така и без – напълно по ваш вкус и нужди.`}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746603796/sun-lenses_zwihz3.jpg"
        reverse
        />



      <HeroSection
        id="lenses"
        title="Висококачествени стъкла за перфектно зрение"
        text={`Оптиката работи с оригинални диоптрични стъкла от водещи световни марки:
        [[ZEISS]] (Германия),
        [[Essilor]] (Франция), 
         [[HOYA]] (Япония), 
        [[NIKON]] (Япония), 
        [[SuperNova]] от INDO (Испания) 
        и бюджетната линия [[Smile by Essilor]]
        
        всички с гарантирано качество и висока прецизност.`}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746602699/lenses_miulec.jpg"
      />

       {/* Hero: Sunglasses */}
       <HeroSection
        id="lenses1"
        title="Vizia Drive UV Blue висококачествени стъкла"
        text={`[[Blue blocker филтър с антирефлексно покритие]] – намалява отблясъците и умората при работа с компютър, таблет и телефон.  
        [[Почти 99% прозрачност]] – осигурява чисто зрително поле без типичната цветова промяна, присъща за други blue block стъкла.
        [[Подобрено нощно шофиране]] – по-голям контраст, по-малко ореоли и паразитни отблясъци от насрещни светлини.
       
        Подходящи както за корекция на зрението, така и като предпазни очила.`}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746603931/lense-2_qmefka.jpg"
        reverse
      />

      <HeroSection
        id="lenses2"
        title="Crizal Prevencia висококачествени стъкла"
        text={`[[Селективна филтрация на вредната синьо-виолетова светлина и пълна UV защита]] – за по-здрави очи и по-комфортно зрение.
        [[Лесни за почистване, отблъскват вода и прах]] – стъклата остават чисти за по-дълго.
        [[Намалени отражения]] – по-ясен поглед и по-малко дразнене на очите.
        [[Устойчиви на надраскване]] – за дълготрайна употреба и по-рядка смяна.
        [[Light Scan™ технология]] – пропуска полезната видима светлина, като блокира само вредния спектър.`}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746602699/lense-1_bs7aoo.png"
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
        text={`[[Ясното зрение започва тук 👁️✨]]
        Професионализъм, на който можеш да се довериш. 

        При нас всяка стъпка е с прецизност – от първичния преглед до избора на правилните стъкла. Работим с модерна апаратура от последно поколение, която гарантира:

        [*✔️ Прецизно измерване на диоптъра и роговицата*]
        [*✔️ Максимален комфорт и точност по време на прегледа*]
        [*✔️ Високотехнологични устройства за още по-ясна картина на твоето зрение*]

        💬 Ясната визия започва с добър преглед – от доверен и опитен оптометрист.

        `}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746602835/model-15_lpj68z.jpg"
      />

      {/* Hero: Sunglasses */}
      <HeroSection
        id="machine"
        title="Най-новото поколение диагностика на зрението с Charops CRK-1P"
        text={`{{Тук ние работим с най-съвременното оборудване, което гарантира висока точност, комфорт за пациента и професионални резултати.
        Използваме комбинирания авторефрактометър и автокератометър Charops CRK-1P, разработен по иновативна технология от Huvitz, Корея.}}
        
         [[Авторефрактометърът]] прецизно измерва рефракцията на очите – ключов елемент при определяне на точен диоптер.
         [[Автокератометърът]] измерва показателите на роговицата, с цел по-добро напасване на контактните лещи по размер и кривина
         [[Фороптер]] с интегрирани тестове, свързан с рефрактометъра, позволява още по-точно финализиране на вашата корекция на зрението.`}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746602700/machine_is3le5.png"
        reverse
      />




       {/* Hero: Our optometrist */}
       <HeroSection
        id="eye-specialist"
        title="Нашия оптометрист"
        text={`Прегледът се извършва от Дочка Пеева – оптометрист и оптик с над 15 години професионален опит и индивидуален подход към всеки пациент.
        
          [[Образование:]]
 
        [*  - НПГПТО „М. В. Ломоносов“, специалност Финна механика и оптика*]
        [*  - ХТМУ – София, специалност Химични технологии (с придобита квалификация химик инженер)*]
        [*  - СУ „Св. Климент Охридски“, магистърска степен по Оптометрия*]
Вярваме, че грижата за зрението изисква не само съвременна техника, но и внимание, прецизност и лично отношение.
Затова всяко посещение при нас е стъпка към по-ясно и по-качествено зрение. `}
        imageSrc="https://res.cloudinary.com/di2eg83ws/image/upload/v1746602934/optic-new_pu9ww5.jpg"
      />

<VideoSection />

      {/* Testimonials */}
      <TestimonialsSection id="testimonials" />

      {/* Contact */}
      <ContactSection />

      {/* Footer section - full width */}
      <footer className="bg-gray-100 border-t border-gray-200 py-5 ">
        <div className="container mx-auto px-4 text-sm">
          <div className="flex flex-col md:flex-row items-center justify-between ">
            <div className="flex items-center space-x-4 mb-3 md:mb-0 ">
              <Link 
                to="/privacy" 
                className="inline-flex items-center text-teal-600 hover:underline"
              >
                <svg className="w-5 h-5 mr-1  " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
                Прочети повече за политика на вашите данни
              </Link>
              <CookieSettings />
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Оптика Прима. Всички права запазени.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
