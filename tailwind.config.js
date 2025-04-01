module.exports = {
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-in-right': 'fade-in-right 1s ease-out forwards'
      },
      // Add text shadow utilities
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.3)',
        xl: '4px 4px 8px rgba(0, 0, 0, 0.4)',
        'sharp': '2px 2px 0 rgba(0, 0, 0, 0.3)',
        'sharp-lg': '3px 3px 0 rgba(0, 0, 0, 0.3)',
        'teal': '2px 2px 4px rgba(20, 184, 166, 0.5)',
        'teal-sharp': '2px 2px 0 rgba(15, 118, 110, 0.8)',
        'glow': '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)',
        'none': 'none',
      },
    },
  },
  plugins: [
    // Plugin to enable text shadow utilities
    function({ addUtilities, theme }) {
      const textShadows = theme('textShadow');
      const utilities = Object.entries(textShadows).map(([key, value]) => {
        return {
          [`.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`]: {
            textShadow: value,
          }
        };
      });
      
      addUtilities(utilities, ['responsive', 'hover']);
    },
  ],
}