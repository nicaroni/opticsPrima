// src/slides/slidesData.js

// Convert from array to function that returns array with navigation
const createSlidesData = (scrollToSection) => [
  {
    title: 'Твоето зрение е наш приоритет',
    subtitle: '',
    description: 'Твоето зрение заслужава най-доброто – диоптрични / слънчеви очила и професионален преглед.',
    imageSrc: '/images/optic.png',
    textOnLeft: true,
    buttons: [
      {
        label: 'Запиши час',
        className: 'bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-200',
        onClick: () => scrollToSection('contact') // Navigate to contact section
      },
      {
        label: 'Нови артикули',
        className: 'bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-700',
        onClick: () => scrollToSection('collection') // Navigate to collection section
      }
    ]
  },
  {
    title: 'Технология с прецизност.',
    subtitle: 'Диагностика, на която можеш да разчиташ.',
    description: 'Работим с висококласна апаратура за точно измерване и максимална грижа за твоето зрение.',
    imageSrc: '/images/eye-exam.jpg',
    textOnLeft: true,
    buttons: [
      {
        label: 'Запиши час',
        className: 'bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-200',
        onClick: () => scrollToSection('contact') // Navigate to contact section
      }
    ]
  },
  {
    title: 'Погледни уверено към светлината.',
    subtitle: 'UV защита със стил.',
    description: 'Премиум слънчеви очила, които предпазват и подчертават твоята индивидуалност.',
    imageSrc: '/images/model-girl6.jpg',
    textOnLeft: true,
    buttons: [
      {
        label: 'Нови предложения',
        className: 'bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-700',
        onClick: () => scrollToSection('collection') // Navigate to sunglasses section
      }
    ]
  },
  {
    title: 'Виж ясно. Живей пълноценно.',
    subtitle: 'Прецизна диагностика от опитен оптометрист.',
    description: 'Разбери повече за грижата, която стои зад правилно подбраните очила.',
    imageSrc: '/images/model-girl5.jpg',
    textOnLeft: true,
    buttons: [
      {
        label: 'Запиши час',
        className: 'bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-200',
        onClick: () => scrollToSection('contact') // Navigate to contact section
      }
    ]
  },
  {
    title: 'Carrera със стил и отстъпка',
    subtitle: 'До -40% на избрани рамки Carrera',
    description: 'Само сега – комбинирай визия и качество на специална цена.',
    imageSrc: '/images/model-girl3.jpg',
    textOnLeft: false,
    buttons: [
      {
        label: 'Виж част от моделите',
        className: 'bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-700',
        onClick: () => scrollToSection('collection') // Navigate to Carrera section
      }
    ]
  },
  {
    title: 'Стил, създаден за теб.',
    subtitle: 'Комфорт, който се усеща.',
    description: 'Открий внимателно подбрана селекция от диоптрични очила, съчетание между визия и грижа за зрението.',
    imageSrc: '/images/model-girl7.jpg',
    textOnLeft: true,
    buttons: [
      {
        label: 'Нови предложения',
        className: 'bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-700',
        onClick: () => scrollToSection('collection')// Navigate to proposals section
      }
    ]
  },
];

export default createSlidesData;
