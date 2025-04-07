// src/components/BrandSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const slides = [
  { title: 'Gucci' },
  { title: 'Oakley' },
  { title: 'Ray-Ban' },
  { title: 'Prada' },
  { title: 'Tom Ford' },
  { title: 'Persol' },
  { title: 'Versace' },
  { title: 'Warby Parker' },
  { title: 'Burberry' },
  { title: 'Dolce & Gabbana' },
  { title: 'Michael Kors' },
  { title: 'Armani Exchange' },
  { title: 'Hugo Boss' },
  { title: 'Calvin Klein' },
  { title: 'Maui Jim' },
  { title: 'Police Eyewear' },
  { title: 'Carrera' },
  { title: 'Bollé' },
  { title: 'Vogue Eyewear' },
  { title: 'Lindberg' },
  { title: 'Silhouette' },
  { title: 'Oliver Peoples' },
  { title: 'Ted Baker' },
  { title: 'Nike Vision' },
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
