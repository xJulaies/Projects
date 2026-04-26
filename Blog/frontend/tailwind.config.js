/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f1914",
        muted: "#6d6257",
        paper: "#f6f1e8",
        "paper-strong": "#fffdf8",
        accent: "#b44b2a",
        "accent-deep": "#7f2f16",
        "accent-soft": "#f3d1be",
      },
      fontFamily: {
        display: ['Georgia', '"Times New Roman"', "serif"],
        body: ['"Segoe UI"', "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 50px rgba(74, 42, 20, 0.08)",
        float: "0 24px 60px rgba(74, 42, 20, 0.12)",
      },
      borderRadius: {
        shell: "2rem",
        panel: "1.6rem",
        card: "1.35rem",
      },
    },
  },
  plugins: [],
};
