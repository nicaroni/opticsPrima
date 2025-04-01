import React, {useEffect} from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import CustomSlideshow from './CustomSlideshow';
import BrandSlider from './components/BrandSlider';
import { StarIcon } from '@heroicons/react/24/solid';  // Updated import
import './assets/styles/stars.css';  // Import the CSS file
import GlassesShowcase from './components/GlassesShowcase';


function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop
      });
    }
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

  return (

    
    <div className="font-sans text-gray-900">

    
      {/* Header / Nav */}
      <Header scrollToSection={scrollToSection} />

    
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
      <section
        className="min-h-screen  bg-cover bg-center
                   flex flex-row items-center justify-center text-white px-4 text-center"
      >

      <div className="section-text m-8">
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
          className="rounded-xl shadow-lg w-[200px] sm:w-[250px] lg:w-[300px] max-w-xs object-cover"
        />
      </section>

      {/* Sunglasses */}
      <section
        className="min-h-screen  bg-cover bg-center
         flex flex-row items-center justify-center text-white px-4 text-center"
      >
        
        <img
          src="/images/glasses-main2.jpg"
          alt="Various sun Glasses"
          className="rounded-xl shadow-lg w-[400px] sm:w-[500px] lg:w-[600px] max-w-xl object-cover"
        />

      <div className="section-text m-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-600">
      Слънчеви очила
      </h1>
      <p className="text-xl mb-6 max-w-xl text-gray-600">
      Защити очите си със стил – новата ни колекция слънчеви очила с UV защита.
      </p>
      </div>
      </section>

      <section
       className="new-pairs-glasses min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12
       flex flex-col items-center justify-center px-4 text-center"
     id="collection"    
      >
      <GlassesShowcase />
      </section>

      {/* Eye Exams */}
      <section
        className="min-h-screen  bg-cover bg-center
                   flex flex-row items-center justify-center text-white px-4 text-center"
      >

      <div className="section-text m-8">
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
          className="rounded-xl shadow-lg w-[400px] sm:w-[500px] lg:w-[600px] max-w-xl object-cover"
        />
      </section>


      {/* Testimonials */}
      <section
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 max-w-7xl mx-auto"
      >
      <h1 className="text-4xl font-bold mb-4 text-gray-600">
      Отзиви от клиенти
      </h1>
      <h1 className="text-xl font-bold mb-4 text-gray-600">
      Мария Стоянова
      </h1>
      <p className="text-xl mb-6 max-w-xl text-gray-600">
      „Прегледът беше супер детайлен, а очилата – точно по мярка! 
      Не мислех, че ще е толкова лесно да изглеждам и да виждам толкова добре. 
      Препоръчвам с две ръце!“
      </p>
      <div className="flex gap-2 my-4">
  {[...Array(5)].map((_, i) => (
    <StarIcon
      key={i}
      className={`w-8 h-8 text-yellow-400 sparkle-star ${i > 0 ? `delay-${i*100}` : ''}`}
    />
  ))}
</div>
      </section>

    
    </div>
  );
}

export default App;