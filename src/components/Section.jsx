import React from "react";

const Section = ({ title, subtitle, children, id }) => (
  <section
    id={id}
    className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 max-w-7xl mx-auto"
  >
    <h2 className="text-4xl font-bold mb-4">{title}</h2>
    <p className="text-lg mb-6 text-gray-600 max-w-2xl">{subtitle}</p>
    {children}
  </section>
);

export default Section;