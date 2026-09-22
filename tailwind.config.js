/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        audaz: {
          black: '#050505',
          'black-soft': '#0a0a0a',
          'black-elevated': '#111111',
          red: '#D90429',
          'red-dark': '#a80320',
          'red-light': '#ff1a45',
          white: '#F5F5F5',
          'white-muted': '#b5b5b5',
          yellow: '#FFC300',
          'yellow-dark': '#e0a800',
          green: '#10B981',
          'green-dark': '#0e9c6e',
          'green-light': '#34d399',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 6.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'container-xl': '1440px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-down': 'fadeDown 0.8s ease forwards',
        'scale-in': 'scaleIn 0.6s ease forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
