import React from 'react';

// Import the slides array directly from BrandSlider
const slides = [
  { title: 'Michael Kors' },
  { title: 'Hugo Boss' },
  { title: 'Calvin Klein' },
  { title: 'Police' },
  { title: 'Carrera' },
  { title: 'Oliver' },
  { title: 'Ted Baker' },
  { title: 'Guess' },
  { title: 'Blumarine' },
  { title: 'Barbonese' },
  { title: 'Laura Biagiotti' },
  { title: 'Anna Hickmann' },
  { title: 'Budget' },
  { title: 'Gigi Barcelona' },
  { title: 'Kwiat' },
  { title: 'Adidas' },
  { title: "Levi's" },
  { title: 'Titanflex' },
  { title: 'Escada' },
  { title: 'Brendel' },
  { title: 'Zadig & Voltaire' },
  { title: 'Pierre Cardin' },
  { title: 'Swarovski' },
  { title: 'Nina Ricci' },
  { title: "Marc O'Polo" },
  { title: 'Liu Jo' },
  { title: 'Guess by Marciano' },
  { title: 'Julia Baker' },
  { title: 'Ana Kedo' },
  { title: 'Enni Marco' },
  { title: 'Roberto Cavalli' },
  { title: 'Furla' },
  { title: 'Trussardi' },
  { title: 'Christian Lacroix' },
  { title: 'Just Lacroix' },
  { title: 'Genesis' },
];

export default function BrandGrid({ scrollToSection }) {
  // Function to handle click on a brand rectangle
  const handleBrandClick = () => {
    if (scrollToSection) {
      scrollToSection('collection');
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Марки, с които работим</h2>
        
        {/* Adjusted grid columns for better display at 1024x600 */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 md:gap-4 select-none">
          {slides.map((brand, index) => (
            <div 
              key={index}
              onClick={handleBrandClick}
              className="relative aspect-[3/2] flex items-center justify-center perspective-[1000px] z-0 group cursor-pointer"
            >
              {/* Main card - kept most animations */}
              <div 
                className="absolute inset-0 bg-white rounded-lg shadow-md 
                         transform transition-all duration-500 ease-out
                         group-hover:-translate-y-2 md:group-hover:-translate-y-4 
                         group-hover:rotate-y-6 md:group-hover:rotate-y-12 
                         group-hover:rotate-x-6 md:group-hover:rotate-x-12 
                         group-hover:scale-105 md:group-hover:scale-110
                         group-hover:shadow-xl group-hover:shadow-teal-200/30 
                         before:absolute before:inset-0 before:bg-gradient-to-br before:from-white 
                         before:to-gray-100 before:rounded-lg before:z-[-1]"
              >
                {/* Text content with proper line wrapping */}
                <div className="h-full w-full flex items-center justify-center overflow-hidden p-1">
                  <span className="text-xs sm:text-sm md:font-medium text-center text-gray-700
                                 transition-all duration-700 ease-in-out
                                 group-hover:text-teal-600 group-hover:font-semibold
                                 group-hover:scale-105 group-hover:text-shadow-sm
                                 whitespace-normal leading-tight hyphens-auto">
                    {brand.title}
                  </span>
                </div>

                {/* Keep existing gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-teal-400/10
                             opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500"></div>
              </div>

              {/* Decorative elements - kept but made slightly smaller */}
              <div className="absolute top-0 right-0 w-2 h-2 md:w-4 md:h-4 rounded-full bg-teal-400/30 
                           transform translate-x-2 -translate-y-2 scale-0 opacity-0
                           group-hover:scale-100 group-hover:opacity-100 transition-all duration-700"></div>
              
              <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-teal-300/40
                           transform -translate-x-2 translate-y-2 scale-0 opacity-0
                           group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
              
              {/* Bottom reflection/shadow - kept */}
              <div className="absolute -bottom-2 md:-bottom-3 left-0 right-0 h-4 md:h-6 mx-auto w-2/3 md:w-3/4 bg-black/5 rounded-full blur-md
                           transform scale-0 opacity-0
                           group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}