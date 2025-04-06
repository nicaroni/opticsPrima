import React from "react";

function Header({ scrollToSection }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md py-0.2 px-6 z-50">
      <div className="container mx-auto px-1 py-0 flex justify-between items-center">
        <a href="#" className="flex items-center -my-2"> {/* Negative margin to prevent header growth */}
          <img 
            src="/images/icon2.png" 
            alt="Optica Prima Logo" 
            className="h-16 md:h-20 w-auto object-contain transform scale-80 transition-all duration-300"
            style={{
              filter: "drop-shadow(1px 1px 0 #000) drop-shadow(2px 2px 0 #000) drop-shadow(3px 3px 0 #000)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = "drop-shadow(2px 2px 0 #000) drop-shadow(3px 3px 0 #000) drop-shadow(px 4px 0 #000)"
              e.currentTarget.style.transform = "scale(0.85) translateY(-2px)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = "drop-shadow(1px 1px 0 #000) drop-shadow(1px 1px 0 #000) drop-shadow(1px 1px 0 #000)"
              e.currentTarget.style.transform = "scale(0.8) translateY(0)"
            }}
          />
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-shadow-lg ">
            <li>
              <button 
                onClick={() => scrollToSection('dioptric')}
                className=" text-gray-600  hover:text-teal-600 text-shadow-sharp"
              >
                Диоптрични очила
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('sunglasses')}
                className=" text-gray-600 hover:text-teal-600"
              >
                Слънчеви очила
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('eye-exams')}
                className=" text-gray-600 hover:text-teal-600"
              >
                Очен преглед
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className=" text-gray-600 hover:text-teal-600"
              >
                Отзиви
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className=" text-gray-600 hover:text-teal-600"
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