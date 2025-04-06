// src/components/ContactSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom';

export default function ContactSection() {
  const contactSectionRef = useRef(null);
  const [showViberAnimation, setShowViberAnimation] = useState(false);
  const [columnsVisible, setColumnsVisible] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  // Replace your custom form state with Formspree
  const [formState, handleSubmit] = useForm("xgvapejp");
  
  // Keep local form state for controlled components
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Handle form reset after successful submission
  useEffect(() => {
    if (formState.succeeded) {
      setFormData({ name: '', email: '', phone: '', message: '' });
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        // Note: we can't reset formState directly, but the message will be hidden
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formState.succeeded]);

  // Handle input changes
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    
    // Basic sanitization - prevent HTML injection
    const sanitizedValue = value
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    setFormData(prev => ({ ...prev, [id]: sanitizedValue }));
  };

  // Replace the direct calendly loading with this:
  useEffect(() => {
    // Check if user consented to functional cookies
    const consent = localStorage.getItem('cookie-consent');
    let hasConsent = false;
    
    if (consent) {
      try {
        const preferences = JSON.parse(consent);
        hasConsent = preferences.functional;
        setHasMarketingConsent(preferences.marketing);
      } catch (e) {
        console.error('Error parsing cookie consent');
      }
    }
    
    // Only load if consent given or script already loaded
    if (hasConsent || document.getElementById('calendly-script')) {
      if (!document.getElementById('calendly-script')) {
        const script = document.createElement('script');
        script.id = 'calendly-script';
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        
        script.onload = () => {
          if (window.Calendly) {
            setTimeout(() => setCalendlyLoaded(true), 500);
          }
        };
        
        document.head.appendChild(script);
      } else {
        // Script was already loaded
        if (window.Calendly) {
          setCalendlyLoaded(true);
        }
      }
    } else {
      // Show placeholder or message if no consent
      setCalendlyLoaded(false);
    }
  }, []);

  // Intersection observer code remains the same
  useIntersectionObserver(
    contactSectionRef,
    { threshold: 0.2 },
    (entry, observer) => {
      if (entry.isIntersecting) {
        setColumnsVisible(true);
        observer.unobserve(entry.target);
        
        setTimeout(() => {
          setShowViberAnimation(true);
          setTimeout(() => setShowViberAnimation(false), 3000);
        }, 1500);
      }
    }
  );

  // Add this for reCAPTCHA
  const recaptchaRef = useRef(null);
  
  // Safe approach for your ContactSection.jsx
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

useEffect(() => {
  const loadRecaptcha = () => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
  };
  
  loadRecaptcha();
}, []);
  
  // Add proper validation to your form
  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (formData.name.trim().length < 2) {
      errors.name = "Името трябва да е поне 2 символа";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Невалиден имейл адрес";
    }
    
    // Message validation
    if (formData.message.trim().length < 10) {
      errors.message = "Съобщението трябва да е поне 10 символа";
    }
    
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form first
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // Show errors
      setValidationErrors(errors);
      return;
    }
    
    // Add form submission time check
    const minTimeSeconds = 3;
    const formOpenTime = window.sessionStorage.getItem('form-open-time') || Date.now();
    const timeElapsed = (Date.now() - formOpenTime) / 1000;
    
    // If form is submitted too quickly, likely a bot
    if (timeElapsed < minTimeSeconds) {
      console.log("Form submitted too quickly, likely automated");
      // Show fake success but don't actually submit
      setFormState({...formState, succeeded: true});
      return;
    }
    
    // Execute reCAPTCHA - USE THE VARIABLE HERE INSTEAD OF HARDCODED KEY
    try {
      if (window.grecaptcha) {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'});
        
        // Add the token to your form data
        const formWithRecaptcha = new FormData(e.target);
        formWithRecaptcha.append('g-recaptcha-response', token);
        
        // Submit to Formspree with the token
        handleSubmit({
          ...e,
          formData: formWithRecaptcha,
          preventDefault: () => {}, // Required because we already called preventDefault
        });
      } else {
        console.warn("reCAPTCHA not loaded, falling back to standard submission");
        handleSubmit(e);
      }
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      // Fallback to normal submission
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // Set the form open time when component mounts
    window.sessionStorage.setItem('form-open-time', Date.now());
  }, []);

  return (
    <section ref={contactSectionRef} id="contact" className="w-full py-12 px-4 bg-gray-50 overflow-hidden">
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11828.340683777233!2d27.8482969!3d42.1698597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a12ebdbb28ee55%3A0xb244f6aa374b49fb!2sPrima!5e0!3m2!1sen!2sbg!4v1743573468582!5m2!1sen!2sbg"
                  />
                  {/* Arrow */}
                  <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 bg-gray-400 bg-opacity-75 text-white p-2 rounded-md opacity-0 group-hover:opacity-90 transition-all duration-300 z-30 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Facebook Embed */}
              <div className="flex justify-end w-full relative overflow-visible">
  {/* This wrapper gives room for the arrow to escape overflow */}
  <div className="relative group w-[65%]">
    
    {/* Main box with rounded corners */}
    <div className="rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 bg-white">
      <div className="p-3 bg-blue-600 text-white font-semibold flex items-center rounded-t-xl">
        {/* FIXED: Complete Facebook icon path */}
        <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.527c-1.503 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Оптика ПРИМА
      </div>
      {/* Facebook Embed with consent check */}
      <div className="h-[130px] w-full">
        {hasMarketingConsent ? (
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Foptikacarevo"
            className="w-full h-full rounded-b-xl"
            style={{ border: 'none' }}
            title="Facebook Page"
            allow="encrypted-media"
          />
        ) : (
          <div 
            className="fb-embed-placeholder w-full h-full flex items-center justify-center bg-gray-100 rounded-b-xl"
            data-src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Foptikacarevo"
            data-class="w-full h-full rounded-b-xl"
          >
            <p className="text-sm text-gray-500">Facebook съдържание (изисква съгласие за маркетингови бисквитки)</p>
          </div>
        )}
      </div>
    </div>

    {/* ARROW – only shows on hover over group - FIXED to use arrow icon */}
    <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 bg-gray-400 bg-opacity-75 text-white w-9 h-9 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-90 transition-all duration-300 z-30 pointer-events-none">
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
                <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 bg-gray-400 bg-opacity-75 text-white p-2 rounded-md opacity-0 group-hover:opacity-90 transition-all duration-300 z-30 pointer-events-none">
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
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Име <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name" // Important for Formspree
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Вашето име"
                    />
                    <ValidationError prefix="Name" field="name" errors={formState.errors} className="text-sm text-red-500 mt-1" />
                    {validationErrors.name && <p className="text-sm text-red-500 mt-1">{validationErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Имейл <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email" // Important for Formspree
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={formState.errors} className="text-sm text-red-500 mt-1" />
                    {validationErrors.email && <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон <span className="text-gray-400">(незадължително)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone" // Important for Formspree
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="+359 88 123 4567"
                  />
                  <ValidationError prefix="Phone" field="phone" errors={formState.errors} className="text-sm text-red-500 mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Съобщение <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message" // Important for Formspree
                    rows="6"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Вашето съобщение..."
                  ></textarea>
                  <ValidationError prefix="Message" field="message" errors={formState.errors} className="text-sm text-red-500 mt-1" />
                  {validationErrors.message && <p className="text-sm text-red-500 mt-1">{validationErrors.message}</p>}
                </div>
                
                {/* Honeypot fields for spam protection */}
                <div style={{opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1}}>
                  <input type="text" name="_gotcha" tabIndex="-1" />
                  <input type="email" name="email_confirm" tabIndex="-1" />
                  <input type="text" name="name_confirm" tabIndex="-1" />
                </div>
                
                <button
                  type="submit"
                  disabled={formState.submitting}
                  className={`w-full font-bold py-3 px-4 rounded-md transition duration-300
                    ${formState.submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  {formState.submitting ? 'Изпращане...' : 'Изпрати'}
                </button>

                <p className="text-sm text-gray-600 mt-2">
  С изпращането на формата се съгласявате с нашата{' '}
  <Link to="/privacy" className="text-teal-600 underline">Политика за поверителност</Link>.
</p>

                
                {formState.succeeded && (
                  <div className="bg-green-100 text-green-700 p-3 rounded-md text-center">
                    Съобщението е изпратено успешно!
                  </div>
                )}
                
                {/* General error message */}
                <ValidationError errors={formState.errors} className="text-sm text-red-500 text-center" />
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
                optikacarevo@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div 
          className={`contact-column md:w-1/3 flex justify-center h-[750px] transition-all duration-700 ease-out relative
            ${columnsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div
            className="calendly-inline-widget w-full h-full rounded-xl shadow-lg overflow-hidden"
            data-url="https://calendly.com/optikacarevo/30min"
          />
          
          {/* Loading indicator displays until Calendly is fully loaded */}
          {!calendlyLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-blue-600 font-medium">Зареждане на календара...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
