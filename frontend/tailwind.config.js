import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-wallpaper': "url('/images/wallpaper.png')",
      },
    },
  },
  plugins: [daisyui],
}
