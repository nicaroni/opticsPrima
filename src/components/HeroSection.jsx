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
    // First, let's split the text to separate HTML tags from other content
    const parts = [];
    let currentText = '';
    let inTag = false;

    for (let i = 0; i < fullText.length; i++) {
      if (fullText[i] === '<' && !inTag) {
        if (currentText) {
          parts.push({ type: 'text', content: currentText });
          currentText = '';
        }
        inTag = true;
        currentText = '<';
      } else if (fullText[i] === '>' && inTag) {
        currentText += '>';
        parts.push({ type: 'html', content: currentText });
        currentText = '';
        inTag = false;
      } else {
        currentText += fullText[i];
      }
    }

    if (currentText) {
      parts.push({ type: 'text', content: currentText });
    }

    // Phone number regex pattern - matches Bulgarian phone formats
    const phoneRegex = /(\+359|0)\s*\d{2}\s*\d{3}\s*\d{3,4}|\d{3}\s*\d{3}\s*\d{3,4}/g;

    // Now process each part
    return (
      <div className="text-left select-none">
        {parts.map((part, partIndex) => {
          if (part.type === 'html') {
            // Use dangerouslySetInnerHTML for HTML parts
            return <span key={partIndex} dangerouslySetInnerHTML={{ __html: part.content }} />;
          } else {
            // Process text parts with your existing patterns
            const tokens = part.content.split(/(\[\[[\s\S]*?\]\]|\{\{[\s\S]*?\}\}|\[\*[\s\S]*?\*\])/g);

            return tokens.map((token, i) => {
              // Bold black: [* ... *]
              if (/^\[\*[\s\S]*?\*\]$/.test(token)) {
                const content = token.slice(2, -2).trim();
                
                // Check if content contains a phone number
                const contentWithPhoneLinks = content.replace(phoneRegex, match => {
                  // Clean up the phone number (remove spaces)
                  const cleanNumber = match.replace(/\s+/g, '');
                  return `<a href="tel:${cleanNumber}" class="text-teal-600 cursor-pointer hover:underline">${match}</a>`;
                });
                
                return (
                  <span key={`${partIndex}-${i}`} className="font-bold text-teal-600 block text-left underline decoration-2 underline-offset-5 px-5" 
                        dangerouslySetInnerHTML={{ __html: contentWithPhoneLinks }} />
                );
              }

              // Bold teal: [[ ... ]]
              if (/^\[\[[\s\S]*?\]\]$/.test(token)) {
                const content = token.slice(2, -2).trim();
                
                // Check if content contains a phone number
                const contentWithPhoneLinks = content.replace(phoneRegex, match => {
                  // Clean up the phone number (remove spaces)
                  const cleanNumber = match.replace(/\s+/g, '');
                  return `<a href="tel:${cleanNumber}" class="text-teal-600 cursor-pointer hover:underline">${match}</a>`;
                });
                
                return (
                  <span key={`${partIndex}-${i}`} className="font-bold text-teal-600"
                        dangerouslySetInnerHTML={{ __html: contentWithPhoneLinks }} />
                );
              }

              // Italic: {{ ... }}
              if (/^\{\{[\s\S]*?\}\}$/.test(token)) {
                const content = token.slice(2, -2).trim();
                
                // Check if content contains a phone number
                const contentWithPhoneLinks = content.replace(phoneRegex, match => {
                  // Clean up the phone number (remove spaces)
                  const cleanNumber = match.replace(/\s+/g, '');
                  return `<a href="tel:${cleanNumber}" class="text-teal-600 cursor-pointer hover:underline">${match}</a>`;
                });
                
                return (
                  <em key={`${partIndex}-${i}`} className="italic"
                      dangerouslySetInnerHTML={{ __html: contentWithPhoneLinks }} />
                );
              }

              // Handle regular text with potential phone numbers
              const textWithPhoneLinks = token.replace(phoneRegex, match => {
                // Clean up the phone number (remove spaces)
                const cleanNumber = match.replace(/\s+/g, '');
                return `<a href="tel:${cleanNumber}" class="text-teal-600 cursor-pointer hover:underline">${match}</a>`;
              });

              // If we found phone numbers, use dangerouslySetInnerHTML
              if (token.match(phoneRegex)) {
                return (
                  <span key={`${partIndex}-${i}`} dangerouslySetInnerHTML={{ __html: textWithPhoneLinks }} />
                );
              }

              // Otherwise handle line breaks in normal text as before
              const lines = token.split('\n');
              return lines.map((line, lineIndex) => (
                <React.Fragment key={`${partIndex}-${i}-${lineIndex}`}>
                  {line}
                  {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
              ));
            });
          }
        })}
      </div>
    );
  };

  return (
    <section
      id={id}
      className="py-18 min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 select-none"
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
