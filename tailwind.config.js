/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // From @font-face jost
        sans: ['jost', 'Poppins', 'sans-serif'], 
        // From @font-face saveurSans
        brand: ['saveurSans', 'sans-serif'], 
        // From @font-face jost_light
        light: ['jost_light', 'sans-serif'],
        
        // --- ADD THIS LINE ---
        serif: ['Times New Roman', 'serif'], // <-- For the new footer links
      },
      height: {
        '110vh': '110vh',
        '125vh': '125vh',
      },
      transitionProperty: {
        'top': 'top',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "scroll-text": "hsl(var(--scroll-text))",
        "scroll-text-muted": "hsl(var(--scroll-text-muted))",
        "box-bg": "hsl(var(--box-bg))",
        "box-border": "hsl(var(--box-border))",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-to-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-in-out",
        "fade-out": "fade-out 0.2s ease-in-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-out-to-left": "slide-out-to-left 0.3s ease-in",
      },
    },
  },
  plugins: [],
}
