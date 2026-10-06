/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: token("bg"),
        "bg-raised": token("bg-raised"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        fg: token("fg"),
        "fg-muted": token("fg-muted"),
        "fg-subtle": token("fg-subtle"),
        accent: token("accent"),
        "accent-2": token("accent-2"),
        success: token("success"),
        danger: token("danger"),
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--accent) / 0.35), 0 8px 40px -8px rgb(var(--accent) / 0.55)",
        "glow-sm": "0 0 24px -6px rgb(var(--accent) / 0.6)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 40px 80px -40px rgba(0,0,0,0.8)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        beam: {
          from: { strokeDashoffset: "100" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        shine: "shine 6s linear infinite",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.16,1,0.3,1) infinite",
        drift: "drift 18s ease-in-out infinite",
        "dash-flow": "dash-flow 1.2s linear infinite",
        beam: "beam 3.2s cubic-bezier(0.45,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};
