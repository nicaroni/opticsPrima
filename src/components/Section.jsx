import { useState } from 'react';

const sections = [
  {
    id: 1,
    content: (
      <div className="text-center">
        <img src="/images/sunglasses1.png" alt="" className="mx-auto w-60" />
        <h1 className="text-4xl font-bold mt-4 text-white">Welcome to OpticsPrima</h1>
        <button className="mt-6 px-6 py-2 bg-white text-black rounded-full font-semibold">
          Shop Now
        </button>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="text-left pl-10">
        <h1 className="text-4xl font-bold text-white">Eye Exams</h1>
        <p className="text-white mt-2 max-w-md">
          Book a professional consultation and get a full exam from certified specialists.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="text-right pr-10">
        <h1 className="text-4xl font-bold text-white">Sun Protection</h1>
        <img src="/images/sunglasses2.png" className="w-40 mx-auto mt-4" alt="" />
      </div>
    ),
  },
];

export default function CustomSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % sections.length);
  const prev = () => setIndex((prev) => (prev - 1 + sections.length) % sections.length);
  const goTo = (i) => setIndex(i);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-500">
        {sections[index].content}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
      >
        ❮
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
      >
        ❯
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

