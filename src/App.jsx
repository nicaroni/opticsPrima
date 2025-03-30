import React from "react";
import Header from "./components/Header";
import Section from "./components/Section";

function App() {
  return (
    <div className="font-sans text-gray-900">
      {/* Header / Nav */}
      <Header />

      {/* Hero Section */}
      <section
        className="min-h-screen bg-[url('/hero.jpg')] bg-cover bg-center
                   flex flex-col items-center justify-center text-white px-4 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Your Vision, Our Focus
        </h1>
        <p className="text-xl mb-6 max-w-xl">
          We offer dioptric glasses, premium sunglasses, and professional eye
          exams.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-200">
            Book Eye Exam
          </button>
          <button className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-700">
            Explore Glasses
          </button>
        </div>
      </section>

      {/* Dioptric Glasses */}
      <Section
        title="Dioptric Glasses"
        subtitle="Discover a wide range of stylish and functional dioptric glasses tailored to your needs."
        id="dioptric"
      >
        <img
          src="/dioptric.jpg"
          alt="Various Dioptric Glasses"
          className="rounded-xl shadow-lg w-full max-w-md"
        />
      </Section>

      {/* Sunglasses */}
      <Section
        title="Sunglasses"
        subtitle="Protect your eyes with our latest collection of UV-protected, stylish sunglasses."
        id="sunglasses"
      >
        <img
          src="/sunglasses.jpg"
          alt="Assortment of Sunglasses"
          className="rounded-xl shadow-lg w-full max-w-md"
        />
      </Section>

      {/* Eye Exams */}
      <Section
        title="Eye Exams"
        subtitle="Get a professional eye exam from certified optometrists in our modern clinic."
        id="eye-exams"
      >
        <img
          src="/exam.jpg"
          alt="Eye Exam procedure"
          className="rounded-xl shadow-lg w-full max-w-md"
        />
      </Section>

      {/* Testimonials */}
      <Section
        title="Testimonials"
        subtitle="See what our happy customers have to say about us."
        id="testimonials"
      >
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
          <p className="italic">
            "The eye exam was super thorough and I found the perfect glasses.
            Highly recommend!"
          </p>
          <p className="mt-4 font-semibold">— Maria G.</p>
        </div>
      </Section>

      {/* Contact & Location */}
      <Section
        title="Contact & Location"
        subtitle="Have questions or want to visit us? Find us below."
        id="contact"
      >
        <p className="mb-4">📍 123 Vision St, Sofia, Bulgaria</p>
        <iframe
          title="Google Map for Sofia"
          className="w-full max-w-lg h-64 rounded-xl"
          src="https://maps.google.com/maps?q=sofia&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </Section>
    </div>
  );
}

export default App;