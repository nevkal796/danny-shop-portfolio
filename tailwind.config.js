/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        steel: '#14161A',
        concrete: '#2A2E33',
        chalk: '#E8E6E1',
        orange: '#FF6B1A',
        blueprint: '#16324F',
        cyan: '#7FB2D9',
      },
      fontFamily: {
        sign: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        tech: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        sign: '0.18em',
        plate: '0.28em',
      },
    },
  },
  plugins: [],
}
