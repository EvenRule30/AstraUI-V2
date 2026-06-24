import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
      fontFamily: {
        inter: ["Inter", "-apple-system", "Roboto", "Helvetica", "sans-serif"],
      },
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
        // Qmeet AI brand colors
        cyber: {
          cyan: "#00B8DB",
          "cyan-light": "#53EAFD",
          purple: "#7F22FE",
          "purple-light": "#8E51FF",
          pink: "#C800DE",
          green: "#5EE9B5",
          "green-dark": "#00BC7D",
          navy: "#020618",
          "navy-mid": "#0F172B",
          "navy-card": "#1D293D",
          "text-dim": "#90A1B9",
          "text-mid": "#CAD5E2",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "orb-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "orb-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 76px 28px rgba(57,170,218,0.5), 0 0 140px 60px rgba(127,34,254,0.25)",
          },
          "50%": {
            boxShadow:
              "0 0 100px 45px rgba(57,170,218,0.7), 0 0 200px 90px rgba(127,34,254,0.4)",
          },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "particle-orbit": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-pulse": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "1" },
        },
        "listening-ring": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "bottom-glow-bob": {
          "0%, 100%": { transform: "scaleX(1)", opacity: "0.6" },
          "50%": { transform: "scaleX(1.2)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "orb-pulse": "orb-pulse 3s ease-in-out infinite",
        "orb-glow": "orb-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 25s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 35s linear infinite",
        "particle-orbit": "particle-orbit 10s linear infinite",
        "fade-pulse": "fade-pulse 3s ease-in-out infinite",
        "listening-ring": "listening-ring 1.8s ease-out infinite",
        "bottom-glow-bob": "bottom-glow-bob 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
