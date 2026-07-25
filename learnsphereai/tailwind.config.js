module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: { 950: '#070914', 900: '#0A0E1B', 850: '#0D1226', 800: '#12172B', 700: '#1A2140', 600: '#252D52' },
        mist: { 50: '#F7F8FC', 100: '#EEF0F9', 200: '#E2E6F5' },
        brand: { blue: '#4F7DFF', violet: '#8B5CF6', cyan: '#22D3EE', green: '#34D399', amber: '#FBB042', pink: '#F472B6' },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(79,125,255,0.45)',
        glass: '0 8px 32px rgba(8,10,30,0.35)',
      },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem' },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-rev': 'floatRev 7s ease-in-out infinite',
        orbit: 'orbit 22s linear infinite',
        'orbit-rev': 'orbitRev 28s linear infinite',
        blob: 'blob 14s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        wiggle: 'wiggle 3s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px) rotate(0deg)' }, '50%': { transform: 'translateY(-16px) rotate(3deg)' } },
        floatRev: { '0%,100%': { transform: 'translateY(0px) rotate(0deg)' }, '50%': { transform: 'translateY(14px) rotate(-4deg)' } },
        orbit: { '0%': { transform: 'rotate(0deg) translateX(180px) rotate(0deg)' }, '100%': { transform: 'rotate(360deg) translateX(180px) rotate(-360deg)' } },
        orbitRev: { '0%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' }, '100%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' } },
        blob: { '0%,100%': { borderRadius: '42% 58% 65% 35% / 45% 40% 60% 55%' }, '50%': { borderRadius: '60% 40% 35% 65% / 55% 65% 35% 45%' } },
        wiggle: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
      },
    },
  },
  plugins: [],
};
