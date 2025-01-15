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
    fontSize: {
      '2xs': ['11px', { lineHeight: '1.3', letterSpacing: '-0.3px', fontWeight: '300' }],
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.36px', fontWeight: '300' }],
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.42px' }],
      base: ['1rem', { lineHeight: '1.6', letterSpacing: '-0.48px' }],
      lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.72px' }],
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.8px' }],
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-1.04px' }],
      '3xl': ['2rem', { lineHeight: '2.25rem', letterSpacing: '-1.2px' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-1.44px' }],
      '5xl': ['3rem', { letterSpacing: '-1.6px' }],
      '6xl': ['3.75rem', { letterSpacing: '-1.8px' }],
      '7xl': ['4.5rem', { letterSpacing: '-2px' }],
      '8xl': ['6rem', { letterSpacing: '-2.4px' }],
      '9xl': ['8rem', { letterSpacing: '-3.2px' }],
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
