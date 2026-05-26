/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6A00',
          50: '#FFF0E6',
          100: '#FFD4B3',
          200: '#FFB380',
          300: '#FF924D',
          400: '#FF7A1A',
          500: '#FF6A00',
          600: '#CC5500',
          700: '#994000',
          800: '#662A00',
          900: '#331500',
        },
        bg: {
          DEFAULT: '#0D0D0D',
          card: '#161616',
          elevated: '#1E1E1E',
          border: '#2A2A2A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
