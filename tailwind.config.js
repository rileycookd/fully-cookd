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
          DEFAULT: '#16212C',
          '100': '#E4EBF1',
          '200': '#D6E0EA',
          '300': '#AEC2D6',
          '400': '#85A3C1',
          '500': '#5C85AD',
          '600': '#446588',
          '700': '#30475f',
          '800': '#233446',
          '900': '#16212C',
        },
        secondary: {
          DEFAULT: '#F0C62D',
          '100': '#FCF5D9',
          '200': '#FAEDBD',
          '300': '#F8E5A0',
          '400': '#F5Da7A',
          '500': '#F4D35E',
          '600': '#F0C62D',
          '700': '#E5B710',
          '800': '#D2A80F',
          '900': '#997A0B',
        },
        accent: {
          DEFAULT: '#5F9EA0',
          '100': '#E6EFF0',
          '200': '#CCE0E0',
          '300': '#99C0C2',
          '400': '#80B1B3',
          '500': '#5F9EA0',
          '600': '#548A8C',
          '700': '#4C7D7F',
          '800': '#457273',
          '900': '#3F6869',
        },
        grey: {
          DEFAULT: '#25353E',
          '100': '#A0B2BE',
          '200': '#96AAB8',
          '300': '#8BA2B1',
          '400': '#7F99A9',
          '500': '#728FA0',
          '600': '#648496',
          '700': '#496879',
          '800': '#3D5766',
          '900': '#314652',
          '1000': '#25353E',
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
        'heading': ['Ubuntu'],
        'body': ['Karla'],
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
        '6xl': '72rem',
        '7xl': '80rem',
      },
    },
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
  }
}
