/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        // Main backgrounds
        background: "#0a192f",       // deep blue
        surface: "#112240",          // lighter blue

        // Brand gradients
        "brand-gradient-from": "#a78bfa", // purple
        "brand-gradient-to": "#ec4899",   // pink

        // Accent
        accent: "#10b981",
        "accent-light": "#34d399",

        // Primary and secondary colors
        primary: "#ffffff",
        "primary-light": "#f3f4f6",       // light gray as a lighter version of white

        secondary: "#a5b4fc",             // light purple
        "secondary-light": "#c7d2fe",     // lighter version of light purple

        muted: "#94a3b8",
        dark: "#1f2937",

        // Button gradient support
        "btn-gradient-from": "#6366f1",
        "btn-gradient-to": "#ec4899",

        // Card
        card: "#1e293b",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
