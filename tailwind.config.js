const defaultTheme = require('tailwindcss/defaultTheme');

 module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        primary: {
          DEFAULT: '#082735',
          '100': '#DCF0FA',
          '200': '#97CFED',
          '300': '#59A9CF',
          '400': '#1B82B1',
          '500': '#16688E',
          '600': '#114E6A',
          '700': '#0D4159',
          '800': '#0B3447',
          '900': '#082735',
        },
        secondary: {
          DEFAULT: '#00BFB2',
          '100': '#DEF7F5',
          '200': '#BDEFEB',
          '300': '#00E0D1',
          '400': '#00BFB2',
          '500': '#00A398',
        },
        accent: {
          DEFAULT: '#F2BB05',
          '100': '#FEF5D7',
          '300': '#F2BB05',
          '400': '#DCAA04',
        },
        grey: {
          DEFAULT: '#7E95A0',
          '100': '#F9FAFB',
          '200': '#F3F5F6',
          '300': '#E8ECED',
          '400': '#D8DFE2',
          '500': '#C8D2D6',
          '600': '#A8B7BE',
          '700': '#7E95A0',
          '800': '#5F7681',
          '900': '#4E616A',
          '1000': '#344147',
          '1100': '#1A2023'
        },
        success: {
          DEFAULT: '#64B990',
          '100': '#64B990',
        },
        error: {
          DEFAULT: '#D44D5C',
          '100': '#F7DEE1',
          '300': '#D44D5C',
          '400': '#B52C3C',
        },
        warning: {
          DEFAULT: '#F2BB05',
          '100': '#FDF0C3',
          '300': '#F2BB05',
          '400': '#DCAA04',
        },
        cyan: '#79FFE1',
      },
      fontFamily: {
        'heading': ['Montserrat'],
        'body': ['Raleway'],
        'serif': ['Source Serif Pro']
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '2xs': '.75rem',
        'xs': '.875rem',
        'sm': '.925rem',
        'base': '1rem',
        'md': '1.075rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': ['3rem', '1'],
        '6xl': ['3.75rem', '1.2'],
        '7xl': '5rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      transitionProperty: {
        'height': 'height',
        'max-height': 'max-height'
      },
      animation: {
        'slide-up': 'slide-up .75s 1 ease-in-out forwards',
      },
      keyframes: {
        'slide-up': {
          '0%': {
            transform: 'translateY(2rem)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        }
      },
      minWidth: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem'
      },
    },
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
  }
}
