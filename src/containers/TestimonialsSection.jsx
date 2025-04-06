// src/containers/TestimonialsSection.jsx
import React from 'react';
import ReviewCard from './ReviewCard';

const testimonials = [
  {
    id: 1,
    name: 'Мария Стоянова',
    review: 'Прегледът беше супер детайлен, а очилата – точно по мярка! Не мислех, че ще е толкова лесно...',
    rating: 5,
  },
  {
    id: 2,
    name: 'Георги Петров',
    review: 'Богат избор от рамки и професионално обслужване. Изключително съм доволен...',
    rating: 5,
  },
  {
    id: 3,
    name: 'Виктория Иванова',
    review: 'За пръв път изпитвам такъв комфорт с диоптрични очила! Оптометристът отдели много време...',
    rating: 4,
  },
  {
    id: 4,
    name: 'Димитър Колев',
    review: 'Качеството на обслужване и продуктите са на изключително високо ниво...',
    rating: 5,
  },
];

export default function TestimonialsSection({id}) {
  return (
    
    <section
    id={id}
    className="min-h-screen flex flex-col justify-center items-center py-16 px-4 relative overflow-hidden" 
    >
      <div className="max-w-6xl w-full mx-auto z-10">
        <h2 className="text-4xl font-bold mb-12 text-gray-600 text-center">
          Отзиви от клиенти
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {testimonials.map((t, i) => (
            <ReviewCard
              key={t.id}
              name={t.name}
              review={t.review}
              rating={t.rating}
              index={i}
              total={testimonials.length}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-100 opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-teal-100 opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-50 opacity-10"></div>
    </section>
  );
}
