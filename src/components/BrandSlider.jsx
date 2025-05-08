// src/components/BrandSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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

export default function BrandSlider() {
  return (
    <section className="w-full bg-teal-600 py-3 select-none">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={5}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={4000}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!w-auto flex justify-center items-center"
          >
            <h1 className="text-white text-lg font-semibold px-4 py-0.5 bg-teal-600 rounded whitespace-nowrap">
              {slide.title}
            </h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
