import React from "react";

function Header({ scrollToSection }) {
  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-600">Optics Prima</div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => scrollToSection('dioptric')}
                className="hover:text-teal-600"
              >
                Dioptric Glasses
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('sunglasses')}
                className="hover:text-teal-600"
              >
                Sunglasses
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('eye-exams')}
                className="hover:text-teal-600"
              >
                Eye Exams
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-teal-600"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Mobile menu button */}
        {/* ...existing code... */}
      </div>
    </header>
  );
}

export default Header;