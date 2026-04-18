import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        burgundy: '#440709',
        blood: '#7A0F14',
        crimson: '#A0141A',
        cream: '#EBE2D3',
        gold: '#B8956A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widestest: '0.3em',
      },
    },
  },
  plugins: [],
};

export default config;
