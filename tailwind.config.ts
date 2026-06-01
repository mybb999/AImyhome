import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      // === Midnight Slate Design Tokens ===
      colors: {
        // Surface hierarchy (tonal layers, darkest → brightest)
        'surface': {
          'dim': '#0b1326',
          'lowest': '#060e20',
          'low': '#131b2e',
          'DEFAULT': '#171f33',
          'high': '#222a3d',
          'highest': '#2d3449',
          'bright': '#31394d',
        },
        // On-surface text
        'on-surface': '#dae2fd',
        'on-surface-variant': '#bbcabf',
        // Outline
        'outline': '#86948a',
        'outline-variant': '#3c4a42',
        // Primary (emerald green)
        'primary': {
          'DEFAULT': '#4edea3',
          'dim': '#4edea3',
          'fixed': '#6ffbbe',
          'container': '#10b981',
          'inverse': '#006c49',
        },
        'on-primary': '#003824',
        'on-primary-container': '#00422b',
        'on-primary-fixed': '#002113',
        'on-primary-fixed-variant': '#005236',
        // Secondary (sky blue)
        'secondary': {
          'DEFAULT': '#7bd0ff',
          'fixed': '#c4e7ff',
          'container': '#00a6e0',
        },
        'on-secondary': '#00354a',
        'on-secondary-container': '#00374d',
        // Tertiary (rose)
        'tertiary': {
          'DEFAULT': '#ffb3af',
          'fixed': '#ffdad7',
          'container': '#fc7c78',
        },
        'on-tertiary': '#650911',
        'on-tertiary-container': '#711419',
        // Error
        'error': {
          'DEFAULT': '#ffb4ab',
          'container': '#93000a',
        },
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
        // Semantic shortcuts
        'brand-bg': '#0b1326',
        'brand-card': '#131b2e',
        'brand-border': '#334155',
        'brand-accent': '#4edea3',
        'brand-accent-strong': '#10b981',
      },

      // Typography
      fontFamily: {
        'sans': ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        'geist': ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['30px', { lineHeight: '38px', fontWeight: '600', letterSpacing: '-0.02em' }],
        'headline-md': ['20px', { lineHeight: '28px', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },

      // Border radius
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
        'pill': '9999px',
      },

      // Spacing
      spacing: {
        'unit': '4px',
        'gutter': '24px',
        'page-margin': '32px',
        'container-padding': '20px',
        'element-gap': '12px',
      },

      // Max width
      maxWidth: {
        'content': '1280px',
        'sidebar': '320px',
      },

      // Animation
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-right': 'slide-right 0.4s ease-out',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.75)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
