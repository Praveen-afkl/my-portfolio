export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        midnight: "var(--color-midnight)",
        navy: "var(--color-navy)",
        indigo: "var(--color-indigo)",
        storm: "var(--color-storm)",
        aqua: "var(--color-aqua)",
        mint: "var(--color-mint)",
        royal: "var(--color-royal)",
        lavender: "var(--color-lavender)",
        fuchsia: "var(--color-fuchsia)",
        orange: "var(--color-orange)",
        sand: "var(--color-sand)",
        coral: "var(--color-coral)",
      },
      fontFamily: {
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
        funnel: ['"Funnel Display"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
       animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  corePlugins: {
    scrollBehavior: true,
  },
};
