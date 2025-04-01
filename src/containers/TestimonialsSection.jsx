import React from 'react';
import ReviewCard from './ReviewCard';

const testimonials = [
  {
    id: 1,
    name: 'Мария Стоянова',
    review: 'Прегледът беше супер детайлен, а очилата – точно по мярка! Не мислех, че ще е толкова лесно да изглеждам и да виждам толкова добре. Препоръчвам с две ръце!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Георги Петров',
    review: 'Богат избор от рамки и професионално обслужване. Изключително съм доволен от новите си очила и цялостното преживяване в магазина.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Виктория Иванова',
    review: 'За пръв път изпитвам такъв комфорт с диоптрични очила! Оптометристът отдели много време, за да разбере моите нужди и да препоръча перфектните очила за мен.',
    rating: 4,
  },
  {
    id: 4,
    name: 'Димитър Колев',
    review: 'Качеството на обслужване и продуктите е на изключително високо ниво. Намерих точно това, което търсех, на много добра цена.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto z-10">
        <h2 className="text-4xl font-bold mb-12 text-gray-600 text-center">
          Отзиви от клиенти
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {testimonials.map((testimonial, index) => (
            <ReviewCard
              key={testimonial.id}
              name={testimonial.name}
              review={testimonial.review}
              rating={testimonial.rating}
              index={index}
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
};

export default TestimonialsSection;