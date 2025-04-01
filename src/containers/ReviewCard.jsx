import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const ReviewCard = ({ name, review, rating, index, total }) => {
  // Calculate position and rotation based on index
  const getCardStyle = () => {
    // Use a more controlled, smaller rotation for less jarring motion
    const rotation = (index % 2 === 0 ? -1 : 1) * (2 + (index % 3));
    const offsetX = (index % 2 === 0) ? `-${5 + (index * 2)}px` : `${5 + (index * 2)}px`;
    
    return {
      '--rotation': `${rotation}deg`,
      '--offset-x': offsetX,
      zIndex: total - index,
      animationDelay: `${index * 150}ms`,
      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
    };
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 my-4 max-w-xl mx-auto relative 
                scroll-reveal review-card"
      style={getCardStyle()}
    >
      <div className="absolute -top-3 -left-3 bg-teal-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
        {index + 1}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-700">{name}</h3>
      
      <p className="text-gray-600 italic mb-4">
        "{review}"
      </p>
      
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-6 h-6 text-yellow-400 sparkle-star ${i > 0 ? `delay-${i*100}` : ''}`}
          />
        ))}

 
      </div>
    </div>
  );
};

export default ReviewCard;