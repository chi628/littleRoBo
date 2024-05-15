/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        YoungSerif: ['Young Serif', 'serif'],
        CormorantGaramond: ['Cormorant Garamond', 'serif'],
        NotoSansTC: ['Noto Sans TC', 'sans-serif'],
        Outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
