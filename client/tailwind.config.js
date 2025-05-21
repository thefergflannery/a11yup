/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f1',
          100: '#fde5e3',
          200: '#fbd0cc',
          300: '#e96d64',
          400: '#d44d42',
          500: '#b13c32',
          600: '#93342c',
          700: '#7a3029',
          800: '#5c2520',
          900: '#421714',
          950: '#2a0f0d',
        },
        secondary: {
          50: '#f0f5fa',
          100: '#dce7f3',
          200: '#b9cfe7',
          300: '#8fb0d8',
          400: '#6a8ec7',
          500: '#4f73b5',
          600: '#3d5a97',
          700: '#043f6d',
          800: '#2a3a5c',
          900: '#27334d',
          950: '#1a2233',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 