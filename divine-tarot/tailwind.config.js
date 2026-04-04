/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ivory: "#fdf8f0",
        gold: {
          100: "#faf5e6",
          200: "#f5ead0",
          300: "#eed9a8",
          400: "#e7c870",
          500: "#d4af37",
          600: "#b8962e",
          700: "#9a7a25",
        },
        lavender: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
        },
        mystical: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          '0%, 100%': { opacity: 1, boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)" },
          '50%': { opacity: 0.8, boxShadow: "0 0 40px rgba(167, 139, 250, 0.6)" },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        "shimmer": {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        "breathe": {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.9 },
          '50%': { transform: 'scale(1.02)', opacity: 1 },
        },
        "fade-in-up": {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        "card-reveal": {
          '0%': { transform: 'rotateY(180deg)', opacity: 0 },
          '100%': { transform: 'rotateY(0deg)', opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "card-reveal": "card-reveal 0.8s ease-out",
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mystical-gradient': 'linear-gradient(135deg, #fdf8f0 0%, #f3e8ff 50%, #e9d5ff 100%)',
        'mystical-gradient-dark': 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6b21a8 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f59e0b 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #fdf8f0 0%, #faf5ff 100%)',
        'subtle-glow': 'radial-gradient(circle at center, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(167, 139, 250, 0.3)',
        'glow-lg': '0 0 40px rgba(167, 139, 250, 0.4)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
