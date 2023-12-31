/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "dark-choco": "#1a1a1d",
        "cement": "#4e4e50",
        "burgundy": "#6b2232",
        "tesla-red": "#950740",
        "tesla-blue": "#190061",
        "another-red": "#c3073f",
      },
    },
  },
  plugins: [],
}
