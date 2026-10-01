/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F6F2E9',
          2: '#EFE9DB',
          3: '#E7DFCB',
        },
        ink: {
          DEFAULT: '#14161A',
          2: '#3A3D42',
          3: '#6A6B6C',
        },
        rule: {
          DEFAULT: '#C9C0AA',
          2: '#A9A08B',
        },
        rust: '#B0431E',
        steel: '#35566B',
        moss: '#5C6A3A',
        iron: '#4A4A4A',
        brick: '#7A2E1F',
        ochre: '#B58022',
        indigo: '#2E3F63',
        slate: '#445362',
        olive: '#6B6D2A',
        wash: {
          DEFAULT: '#F0DEB0',
          cool: '#DEE3E6',
        },
        danger: '#A03422',
        ok: '#4E6B2E',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['IBM Plex Serif', 'serif'],
      },
      backgroundImage: {
        'blueprint-grid': "linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
