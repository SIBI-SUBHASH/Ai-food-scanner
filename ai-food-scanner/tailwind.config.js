/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        sage: {
          50:  '#f3f7f2',
          100: '#e4ede2',
          200: '#c8dbc4',
          300: '#9fc09a',
          400: '#6fa068',
          500: '#4d8246',
          600: '#3a6735',
          700: '#2f5229',
          800: '#274223',
          900: '#21371e',
        },
        cream: {
          50:  '#fdfdf8',
          100: '#faf9ee',
          200: '#f5f2d8',
          300: '#ede9b8',
        },
        rust: {
          400: '#e07b54',
          500: '#d4623a',
          600: '#b84e2a',
        },
        amber: {
          warm: '#f0a500',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan-line': 'scanLine 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
