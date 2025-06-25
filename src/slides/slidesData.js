// src/slides/slidesData.js

// Use Cloudinary URLs for better performance and delivery
const slideImages = [
  'https://res.cloudinary.com/dlgs5lzds/image/upload/v1750848861/optic-new_jsqzot.jpg',
  'https://res.cloudinary.com/dlgs5lzds/image/upload/v1750848860/machine_ur0ib8.png',
  'https://res.cloudinary.com/dlgs5lzds/image/upload/v1750848902/model-4_egplpp.jpg',
  'https://res.cloudinary.com/dlgs5lzds/image/upload/v1750848860/model-7_lszxcu.jpg',
  'https://res.cloudinary.com/dlgs5lzds/image/upload/v1750848860/model-9_xiwngv.jpg'
];

// We can remove the cache buster since Cloudinary handles versioning

const createSlidesData = (scrollToSection) => [
  {
    title: 'Твоето зрение е наш приоритет',
    subtitle: '',
    description: 'Твоето зрение заслужава най-доброто – диоптрични / слънчеви очила и професионален преглед.',
    imageSrc: slideImages[0],
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
    imageSrc: slideImages[1],
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
    imageSrc: slideImages[2],
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
    imageSrc: slideImages[3],
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
    title: 'Стил, създаден за теб.',
    subtitle: 'Комфорт, който се усеща.',
    description: 'Открий внимателно подбрана селекция от диоптрични очила, съчетание между визия и грижа за зрението.',
    imageSrc: slideImages[4],
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

export { slideImages }; // Export for preloading
export default createSlidesData;
