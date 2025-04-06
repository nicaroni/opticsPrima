import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/animation.css';

export default function PrivacyPolicy() {
  // Add scroll reveal effect similar to Home page
  useEffect(() => {
    const revealElements = document.querySelectorAll('.privacy-reveal');
    
    // Add this line to ensure elements become visible even if animations fail
    setTimeout(() => {
      revealElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 100);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
    
    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="font-sans text-gray-900 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header-like element for consistency */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold">Назад към началната страница</span>
          </Link>
        </div>
      </div>
      
      <section className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 privacy-reveal transition-all duration-700"
             style={{ opacity: 0, transform: 'translateY(1rem)' }}>
          <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Политика за поверителност</h1>
          
          <div className="h-1 w-24 bg-teal-600 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-center mb-8 text-gray-600">
            Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
          </p>
          
          <div className="space-y-8 text-gray-700">
            <div className="privacy-reveal opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
              <h2 className="text-2xl font-semibold text-teal-600 mb-4">1. Събиране на информация</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  Оптика Прима събира следната информация когато използвате нашия уебсайт:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Информация, която доброволно предоставяте чрез нашата контактна форма, включително име, имейл адрес и телефонен номер.</li>
                  <li>Информация за вашето устройство и взаимодействието ви с нашия уебсайт чрез бисквитки и подобни технологии.</li>
                </ul>
              </div>
            </div>
            
            <div className="privacy-reveal opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
              <h2 className="text-2xl font-semibold text-teal-600 mb-4">2. Как използваме вашата информация</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  Информацията, която събираме, се използва за:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Отговаряне на запитвания и комуникация с вас</li>
                  <li>Управление на вашите резервации и заявки за прегледи</li>
                  <li>Подобряване на нашия уебсайт и клиентско преживяване</li>
                  <li>Изпращане на информация, която сте поискали</li>
                </ul>
              </div>
            </div>

            <div className="privacy-reveal opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
              <h2 className="text-2xl font-semibold text-teal-600 mb-4">3. Споделяне на информация с трети страни</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  Използваме следните доставчици на услуги, които могат да имат достъп до ваша информация:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold text-teal-600">Formspree</span> - Обработка на изпратени форми</li>
                  <li><span className="font-semibold text-teal-600">Calendly</span> - Система за резервации</li>
                  <li><span className="font-semibold text-teal-600">Facebook</span> - Социални медийни функции и вграждания</li>
                </ul>
              </div>
            </div>
            
            <div className="privacy-reveal opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: '400ms' }}>
              <h2 className="text-2xl font-semibold text-teal-600 mb-4">4. Вашите права</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  Съгласно GDPR, имате следните права:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Право на достъп до вашите лични данни</li>
                  <li>Право на коригиране на неточни данни</li>
                  <li>Право на изтриване на вашите данни при определени обстоятелства</li>
                  <li>Право да възразите срещу обработването на вашите данни</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">6. Бисквитки и технологии за проследяване</h2>
<div className="bg-gray-50 p-6 rounded-lg">
  <p className="mb-4">
    Нашият уебсайт използва бисквитки и подобни технологии за:
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Функционалност на социални мрежи (например Facebook вграждане)</li>
    <li>Интеграция с Google Maps</li>
    <li>Онлайн резервации чрез Calendly</li>
  </ul>
  <p className="mt-4">
    При първо посещение на сайта ще имате възможност да приемете или откажете използването на бисквитки, освен тези, които са строго необходими за функционирането на сайта.
  </p>
</div>

<h2 className="text-2xl font-semibold text-teal-600 mb-4">6. Бисквитки и технологии за проследяване</h2>
<div className="bg-gray-50 p-6 rounded-lg">
  <p className="mb-4">
    Нашият уебсайт използва следните видове бисквитки:
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li><strong>Необходими:</strong> Тези бисквитки са от съществено значение за функционирането на уебсайта и не могат да бъдат изключени.</li>
    <li><strong>Аналитични:</strong> Помагат ни да разберем как посетителите взаимодействат с нашия уебсайт, като събират анонимна информация.</li>
    <li><strong>Функционални:</strong> Позволяват подобрена функционалност, като например онлайн резервации чрез Calendly.</li>
    <li><strong>Маркетингови:</strong> Бисквитки от социалните мрежи и реклами, като Facebook вграждане.</li>
  </ul>
  <p className="mt-4">
    При първо посещение на сайта имате възможност да изберете кои категории бисквитки приемате. Можете да промените настройките си по всяко време.
  </p>
</div>

<h2 className="text-2xl font-semibold text-teal-600 mb-4">7. Правно основание за обработка</h2>
<div className="bg-gray-50 p-6 rounded-lg">
  <p className="mb-4">
    Личните данни се обработват на следните основания съгласно член 6 от GDPR:
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Вашето изрично съгласие – при изпращане на контактна форма</li>
    <li>Легитимен интерес – за подобряване на клиентското преживяване и безопасността на сайта</li>
  </ul>
</div>

<h2 className="text-2xl font-semibold text-teal-600 mb-4">8. Малолетни и непълнолетни лица</h2>
<div className="bg-gray-50 p-6 rounded-lg">
  <p>
    Услугите на нашия уебсайт не са насочени към лица под 18 години. Ако разберем, че сме събрали информация от такова лице без съгласието на родител или настойник, ще предприемем незабавни действия за нейното изтриване.
  </p>
</div>


            <div className="privacy-reveal opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: '500ms' }}>
              <h2 className="text-2xl font-semibold text-teal-600 mb-4">9. Контакти</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  Ако имате въпроси относно тази политика за поверителност, моля свържете се с нас на:
                  <br />
                  <a href="mailto:optikacarevo@gmail.com" className="text-teal-600 hover:underline mt-2 inline-block">optikacarevo@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer-like element */}
        <div className="text-center text-gray-600 mt-12 privacy-reveal opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: '600ms' }}>
          <p>© {new Date().getFullYear()} Оптика Прима. Всички права запазени.</p>
        </div>
      </section>
    </div>
  );
}