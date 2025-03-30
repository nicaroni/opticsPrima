import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-8 sticky top-0 z-10">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold text-teal-600">Optics Shop</div>
        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <a href="#dioptric" className="hover:text-teal-600">
              Dioptric
            </a>
          </li>
          <li>
            <a href="#sunglasses" className="hover:text-teal-600">
              Sunglasses
            </a>
          </li>
          <li>
            <a href="#eye-exams" className="hover:text-teal-600">
              Eye Exams
            </a>
          </li>
          <li>
            <a href="#testimonials" className="hover:text-teal-600">
              Testimonials
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-teal-600">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;