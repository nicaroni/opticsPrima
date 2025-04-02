// module.exports = {
//   theme: {
//     extend: {
//       // animation: {
//       //   bounce: 'bounce 1s infinite',
//       // },
//     },
//   },
//   plugins: [
//     // Plugin to enable text shadow utilities
//     function({ addUtilities, theme }) {
//       const textShadows = theme('textShadow');
//       const utilities = Object.entries(textShadows).map(([key, value]) => {
//         return {
//           [`.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`]: {
//             textShadow: value,
//           }
//         };
//       });
      
//       addUtilities(utilities, ['responsive', 'hover']);
//     },
//   ],
// }