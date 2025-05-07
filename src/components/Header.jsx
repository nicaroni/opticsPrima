import React from "react";

function Header({ scrollToSection }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md py-0.2 px-6 z-50 select-none">
      <div className="container mx-auto px-1 py-0 flex justify-between items-center">
        <a href="#" className="flex items-center -my-2"> {/* Negative margin to prevent header growth */}
        <img 
          src="/images/icon2.png" 
          alt="Optica Prima Logo" 
          className="h-21 md:h-20 w-35 object-contain 
          transition-all duration-300 drop-shadow-custom 
          hover:drop-shadow-hover-custom hover:scale-85 hover:-translate-y-0.9"
        />
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-shadow-lg">
            <li>
              <button 
                onClick={() => scrollToSection('dioptric')}
                className="text-gray-600 hover:text-teal-600 text-shadow-sharp cursor-pointer"
              >
                Диоптрични очила
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('sunglasses')}
                className="text-gray-600 hover:text-teal-600 cursor-pointer"
              >
                Слънчеви очила
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('eye-exams')}
                className="text-gray-600 hover:text-teal-600 cursor-pointer"
              >
                Очен преглед
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 hover:text-teal-600 cursor-pointer"
              >
                Отзиви
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-teal-600 cursor-pointer"
              >
                Контакти
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;