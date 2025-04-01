// src/components/ContactSection.jsx
import React, { useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function ContactSection() {
  const contactSectionRef = useRef(null);
  const [showViberAnimation, setShowViberAnimation] = useState(false);
  const [columnsVisible, setColumnsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In real implementation, replace with actual API call
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use the custom hook instead of recreating intersection observer logic
  useIntersectionObserver(
    contactSectionRef,
    { threshold: 0.2 },
    (entry, observer) => {
      if (entry.isIntersecting) {
        setColumnsVisible(true);
        observer.unobserve(entry.target);
        
        // Start Viber animation after columns appear
        setTimeout(() => {
          setShowViberAnimation(true);
          // Turn off animation after 3 seconds
          setTimeout(() => setShowViberAnimation(false), 3000);
        }, 1500);
      }
    }
  );

  return (
    <section
      ref={contactSectionRef}
      id="contact"
      className="w-full py-12 px-4 bg-gray-50 overflow-hidden"
    >
      <h2 className="text-4xl font-bold text-center mb-8">За контакти</h2>
      <div className="flex flex-col md:flex-row w-full gap-10 justify-center">
        {/* LEFT COLUMN */}
        <div 
          className={`contact-column flex flex-col w-full md:w-1/3 h-[750px] transition-all duration-700 ease-out
            ${columnsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full h-full p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-center mb-2">Информация за контакт</h3>

              {/* Google map */}
              <div className="flex justify-start w-full relative">
                <div className="hover-item w-[65%] flex flex-col items-start relative transition-transform duration-300 hover:scale-105 hover:z-10 group">
                  <h4 className="text-lg font-medium mb-2">Къде ще ни намерите 📍</h4>
                  <iframe
                    title="Google Map for Tsarevo"
                    className="w-full h-[180px] overflow-hidden rounded-xl shadow-md"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2957.083560596097!2d27.84591437638717!3d42.16989414709415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a12ebc94073389%3A0xde813f3623eef90b!2sTsentar%2C%20ul.%20%22Han%20Asparuh%22%2039%2C%208260%20Tsarevo!5e0!3m2!1sen!2sbg!4v1743339411617!5m2!1sen!2sbg"
                  />
                  {/* Arrow */}
                  <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Facebook Embed */}
              <div className="flex justify-end w-full relative">
                <div className="hover-item w-[65%] overflow-hidden rounded-xl shadow-md relative transition-transform duration-300 hover:scale-105 hover:z-10 group">
                  <div className="p-3 bg-blue-600 text-white font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.527c-1.503 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Оптика ПРИМА
                  </div>
                  <div className="h-[130px] w-full">
                    <iframe
                      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Foptikacarevo&adapt_container_width=true&hide_cover=false&show_facepile=true"
                      className="w-full h-full"
                      style={{ border: 'none', overflow: 'hidden' }}
                      allow="encrypted-media"
                      title="Facebook Page"
                    />
                  </div>
                  {/* Arrow */}
                  <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Viber contact */}
            <div className="flex justify-start w-full mt-auto relative">
              <div
                className={`hover-item flex items-center p-3 rounded-xl shadow-md w-[60%] bg-gray-50 relative transition-all duration-300 hover:scale-105 hover:z-10 group
                  ${showViberAnimation ? 'viber-attention scale-110 z-20' : ''}`}
              >
                <a
                  href="viber://contact?number=+359889962200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 hover:opacity-80"
                >
                  <img
                    src="/viber.png"
                    alt="Viber Icon"
                    className="h-7 w-7"
                  />
                  <span className="text-sm font-semibold">+359889962200</span>
                </a>
                {/* Arrow */}
                <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                {/* LED blinking dots */}
                {showViberAnimation && (
                  <>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-1"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-2"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-3"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-4"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-5"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-6"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-7"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full led-dot-8"></div>
                  </>
                )}
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">гр.Царево ул.Хан Аспарух 39 8260</p>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div 
          className={`contact-column flex flex-col w-full md:w-1/3 h-[750px] transition-all duration-700 ease-out
            ${columnsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full p-8 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-5 text-center">Изпратете ни съобщение</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Име <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Вашето име"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Имейл <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон <span className="text-gray-400">(незадължително)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="+359 88 123 4567"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Съобщение <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="8"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Вашето съобщение..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-3 px-4 rounded-md transition duration-300
                    ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  {isSubmitting ? 'Изпращане...' : 'Изпрати'}
                </button>
                
                {submitSuccess && (
                  <div className="bg-green-100 text-green-700 p-3 rounded-md text-center">
                    Съобщението е изпратено успешно!
                  </div>
                )}
              </form>
            </div>
            <div className="pt-4 border-t border-gray-200 text-center text-gray-600 mt-auto">
              <p className="mb-2">Или ни пишете директно на:</p>
              <a
                href="mailto:optika_prima@gmail.com"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                optika_prima@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Calendly */}
        <div 
          className={`contact-column md:w-1/3 flex justify-center h-[750px] transition-all duration-700 ease-out
            ${columnsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div
            className="calendly-inline-widget w-full h-full rounded-xl shadow-lg overflow-hidden"
            data-url="https://calendly.com/optikacarevo/30min"
          />
        </div>
      </div>
    </section>
  );
}
