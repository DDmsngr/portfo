export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0057FF',
        ink: '#0A0A0B',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'hero-sub': 'hsl(var(--hero-sub))',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Geist Sans', 'Inter', 'sans-serif'],
        'general-sans': ['"General Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
