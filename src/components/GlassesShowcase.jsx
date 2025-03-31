import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Sample glasses data - replace with your actual glasses images
const glassesData = [
  { id: 1, src: '/images/glasses/glass1.png', name: 'Model Classic' },
  { id: 2, src: '/images/glasses/glass2.png', name: 'Urban Style' },
  { id: 3, src: '/images/glasses/glass3.png', name: 'Modern Frame' },
  { id: 4, src: '/images/glasses/glass4.png', name: 'Elegant Design' },
  { id: 5, src: '/images/glasses/glass1.png', name: 'Vintage Look' },
  { id: 6, src: '/images/glasses/glass4.png', name: 'Sport Edition' },
  { id: 7, src: '/images/glasses/glass4.png', name: 'Casual Frame' },
  { id: 8, src: '/images/glasses/glass3.png', name: 'Professional Cut' },
  { id: 9, src: '/images/glasses/glass2.png', name: 'Executive Style' },
  // Add more glasses items as needed (up to 20)
];

export default function GlassesShowcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Display 4 glasses per page in a single row
  const totalPages = Math.ceil(glassesData.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Calculate the slide position based on current page
  const slidePosition = currentPage * -100; // Percentage value

  return (
    <div className="w-full py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-gray-700 text-center">
        Нашата колекция
      </h2>
      
      <div className="relative">
        {/* Left navigation arrow */}
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 
            ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Carousel container - the viewport */}
        <div className="overflow-hidden mx-auto w-full max-w-4xl">
          {/* Sliding container */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${slidePosition}%)` }}
          >
            {/* All glasses in one continuous row */}
            {glassesData.map((glasses) => (
              <div 
                key={glasses.id} 
                className="flex-shrink-0 w-1/4 px-3"
              >
                <div className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                  <div className="rounded-lg p-1 mb-1 w-full h-40 flex items-center justify-center">
                    <img 
                      src={glasses.src} 
                      alt={glasses.name}
                      className="max-h-36 max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-700">{glasses.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right navigation arrow */}
        <button 
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10
            ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Page indicator */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === i ? 'bg-gray-700 w-6' : 'bg-gray-300'}`}
            onClick={() => setCurrentPage(i)}
            aria-label={`Page ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}