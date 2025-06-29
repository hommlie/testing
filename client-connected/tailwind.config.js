/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Orbitron: ["Orbitron", "serif"],
    },
    extend: {
      fontFamily: {
        poppins: ["Poppin", "sans-serif"],
        headerFont: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        hommlie: "#02513E",
        "gr-1-t": "#31CFA4",
        "gr-1-b": "#FFFFFF",
        "gr-2-t": "#D4E0FA",
        "gr-2-b": "#E5E7EB",
        "gr-3-t": "#F6E7AA",
        "gr-3-b": "#EBF2FF",
        "gr-4-t": "#DFDBF5",
        "gr-4-b": "#FFFFFF",
        "gr-5-t": "#7EA6E0",
        "gr-5-b": "#EBF2FF",
        "gr-6-t": "#E5E4E9",
        "gr-6-b": "#FFFFFF",
        "gr-7-t": "#FEC5B5",
        "gr-7-b": "#FFFFFF",
      },
      keyframes: {
        "loading-full-width": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "loading-full-width": "loading-full-width 1.5s ease-in-out infinite",
      },
      backgroundImage: {
        "hommlie-gradient":
          "linear-gradient(125deg, rgba(4,207,158,1) 0%, rgba(2,81,62,1) 100%)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
