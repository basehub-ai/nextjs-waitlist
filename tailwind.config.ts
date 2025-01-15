import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    colors: {
      slate: {
        1: 'var(--slate-1)',
        2: 'var(--slate-2)',
        3: 'var(--slate-3)',
        4: 'var(--slate-4)',
        5: 'var(--slate-5)',
        6: 'var(--slate-6)',
        7: 'var(--slate-7)',
        8: 'var(--slate-8)',
        9: 'var(--slate-9)',
        10: 'var(--slate-10)',
        11: 'var(--slate-11)',
        12: 'var(--slate-12)',
      },
      gray: {
        1: 'var(--gray-1)',
        2: 'var(--gray-2)',
        3: 'var(--gray-3)',
        4: 'var(--gray-4)',
        5: 'var(--gray-5)',
        6: 'var(--gray-6)',
        7: 'var(--gray-7)',
        8: 'var(--gray-8)',
        9: 'var(--gray-9)',
        10: 'var(--gray-10)',
        11: 'var(--gray-11)',
        12: 'var(--gray-12)',
      },
      white: '#ffffff',
      black: '#000000',
    },
    letterSpacing: {
      tighter: '-0.58px',
      tight: '-0.48px',
    },
    typography: {
      DEFAULT: {
        css: {
          p: {
            letterSpacing: '-0.48px',
          },
          code: {
            letterSpacing: 'normal',
          },
        },
      },
    },
  },
};

export default config;
