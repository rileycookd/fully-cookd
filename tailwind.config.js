 module.exports = {
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        primary: {
          DEFAULT: '#082735',
          '100': '#1B82B1',
          '200': '#114E6A',
          '300': '#0D4159',
          '400': '#0B3447',
          '500': '#082735'
        },
        secondary: {
          DEFAULT: '#00BFB2',
          '100': '#DEF7F5',
          '300': '#00E0D1',
          '400': '#00BFB2'
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
          '400': '#C8D2D6',
          '400': '#A8B7BE',
          '500': '#7E95A0',
          '600': '#5F7681',
          '700': '#4E616A',
        },
        success: '#0070f3',
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
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
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
    },
  }
}
