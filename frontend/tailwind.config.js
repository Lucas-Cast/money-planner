/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          light: {
            text: '#000000',
            background: '#ffffff',
            element: '#F0F0F3',
            selected: '#E0E1E6',
            secondary: '#60646C',
          },
          dark: {
            text: '#ffffff',
            background: '#000000',
            element: '#212225',
            selected: '#2E3135',
            secondary: '#B0B4BA',
          },
        },
      },
      fontFamily: {
        display: ['Spline Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        rounded: ['SF Pro Rounded', 'Hiragino Maru Gothic ProN', 'Meiryo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
