// src/slides/slidesData.js

const slidesData = [
    {
      title: 'Твоето зрение е наш приоритет',
      subtitle: '',
      description: 'Твоето зрение заслужава най-доброто – диоптрични / слънчеви очила и професионален преглед.',
      imageSrc: '/images/model-girl.jpg',
      textOnLeft: true,
      buttons: [
        {
          label: 'Запиши час',
          className: 'bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-200',
          onClick: () => alert('Booking logic...')
        },
        {
          label: 'Нови артикули',
          className: 'bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-teal-700',
          onClick: () => alert('Show new articles...')
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
          onClick: () => alert('Booking logic...')
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
          onClick: () => alert('Go to new sunglasses...')
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
          onClick: () => alert('Booking logic...')
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
          onClick: () => alert('Show Carrera frames...')
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
          onClick: () => alert('Go to new proposals...')
        }
      ]
    },
  ];
  
  export default slidesData;
  