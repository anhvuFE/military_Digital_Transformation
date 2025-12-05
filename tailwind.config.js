/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#0f1a13",
        olive: "#1f2f26",
        moss: "#2f3f30",
        khaki: "#b59b67",
        sand: "#f2ecdd",
        accent: "#e28b2e",
        accentDark: "#b96a17",
        muted: "#8b9383",
        border: "#d4d7c8",
        bg: "#f6f7f2",
      },
      boxShadow: {
        card: "0 10px 30px rgba(31, 47, 38, 0.12)",
        "card-strong": "0 18px 40px rgba(15, 26, 19, 0.18)",
      },
      fontFamily: {
        display: ["Inter", "Segoe UI", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
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
        slideIn: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOut: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        slideOut: "slideOut 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
