/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Source Serif 4"', "serif"],
        body: ['"Manrope"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      colors: {
        bg: "#F5F1EA",
        text: "#111111",
        muted: "#66615A",
        dark: "#111111",
        accent: "#9A5A2C",
        success: "#44624A",
        warm: "#B8843D",
        card: "rgba(255,255,255,0.72)",
        mutedcard: "#EDE7DC",
        darkcard: "#171412",
        border: "rgba(17,17,17,0.09)",
        muteddark: "rgba(255,255,255,0.68)",
      },
      boxShadow: {
        soft: "0 20px 60px -34px rgba(17, 17, 17, 0.22)",
        insetSoft: "inset 0 1px 0 rgba(255,255,255,0.55)",
      },
    },
  },
  plugins: [],
};
