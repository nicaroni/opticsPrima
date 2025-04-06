// HeroSection.jsx
import React from 'react';

export default function HeroSection({
  id,
  title,
  text,
  imageSrc,
  reverse = false,
  textColor = 'text-gray-600',
  ...props
}) {
  const formatText = (fullText) => {
    // Split on all custom patterns: [[...]], {{...}}, [*...*]
    const tokens = fullText.split(/(\[\[[\s\S]*?\]\]|\{\{[\s\S]*?\}\}|\[\*[\s\S]*?\*\])/g);

    return (
      <div className="text-left">
        {tokens.map((token, i) => {
          // Bold black: [* ... *]
          if (/^\[\*[\s\S]*?\*\]$/.test(token)) {
            const content = token.slice(2, -2).trim();
            return (
              <span key={i} className="font-bold text-teal-600 block text-left underline decoration-2 underline-offset-5">
                {content}
              </span>
            );
          }

          // Bold teal: [[ ... ]]
          if (/^\[\[[\s\S]*?\]\]$/.test(token)) {
            const content = token.slice(2, -2).trim();
            return (
              <span key={i} className="font-bold text-teal-600">
                {content}
              </span>
            );
          }

          // Italic: {{ ... }}
          if (/^\{\{[\s\S]*?\}\}$/.test(token)) {
            const content = token.slice(2, -2).trim();
            return (
              <em key={i} className="italic">
                {content}
              </em>
            );
          }

          // Handle line breaks in normal text
          const lines = token.split('\n');
          return lines.map((line, lineIndex) => (
            <React.Fragment key={`${i}-${lineIndex}`}>
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
          ));
        })}
      </div>
    );
  };

  return (
    <section
      id={id}
      className="py-18 min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      {...props}
    >
      {reverse ? (
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="section-image w-full md:w-1/2 mb-8 md:mb-0 md:pl-8">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={title}
                className="rounded-xl shadow-lg w-full max-w-xl mx-auto object-cover scroll-reveal animate-from-center-right"
              />
            )}
          </div>

          <div className="section-text w-full md:w-1/2 scroll-reveal animate-from-center-left">
            <h2 className={`text-3xl font-bold mb-4 ${textColor} text-center`}>{title}</h2>
            <div className={`text-lg mb-6 max-w-xl mx-auto ${textColor}`}>
              {formatText(text)}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="section-image w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={title}
                className="rounded-xl shadow-lg w-full max-w-xl mx-auto object-cover scroll-reveal animate-from-center-left"
              />
            )}
          </div>

          <div className="section-text w-full md:w-1/2 scroll-reveal animate-from-center-right">
            <h2 className={`text-3xl font-bold mb-4 ${textColor} text-center`}>{title}</h2>
            <div className={`text-lg mb-6 max-w-xl mx-auto ${textColor}`}>
              {formatText(text)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
