/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        // Modern professional color system
        brand: {
          // Primary brand colors
          primary: "#6366F1", // Indigo
          "primary-light": "#818CF8",
          "primary-dark": "#4F46E5",

          // Accent colors
          accent: "#10B981", // Emerald
          "accent-light": "#34D399",
          "accent-dark": "#059669",

          // Warning/Alert
          warning: "#F59E0B",
          danger: "#EF4444",
          success: "#10B981",
        },

        // Sophisticated dark theme
        dark: {
          // Background layers
          bg: "#0A0A0B",
          "bg-secondary": "#111113",
          "bg-tertiary": "#1A1A1D",
          "bg-elevated": "#212125",

          // Surface colors
          surface: "#2A2A2F",
          "surface-hover": "#34343A",
          "surface-active": "#3E3E45",

          // Border colors
          border: "#2A2A2F",
          "border-light": "#34343A",
          "border-focus": "#6366F1",

          // Text colors
          text: "#F8FAFC",
          "text-secondary": "#CBD5E1",
          "text-muted": "#64748B",
          "text-disabled": "#475569",
        },

        // Status colors
        status: {
          success: "#10B981",
          "success-bg": "#064E3B",
          warning: "#F59E0B",
          "warning-bg": "#78350F",
          error: "#EF4444",
          "error-bg": "#7F1D1D",
          info: "#3B82F6",
          "info-bg": "#1E3A8A",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        // Professional gradients
        "brand-gradient": "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        "success-gradient": "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        "surface-gradient": "linear-gradient(135deg, #1A1A1D 0%, #212125 100%)",
        "mesh-gradient":
          "radial-gradient(at 40% 20%, #6366F1 0px, transparent 50%), radial-gradient(at 80% 0%, #8B5CF6 0px, transparent 50%), radial-gradient(at 0% 50%, #10B981 0px, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.3)",
        "glow-success": "0 0 20px rgba(16, 185, 129, 0.3)",
        elevated: "0 8px 32px rgba(0, 0, 0, 0.4)",
        card: "0 4px 16px rgba(0, 0, 0, 0.2)",
        inner: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
