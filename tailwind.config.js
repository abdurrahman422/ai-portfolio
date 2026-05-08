/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
        heading: ["Sora", "Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        void: "#050712",
        ink: "#dbeafe",
        cyanGlow: "#34d5ff",
        violetGlow: "#8b5cf6",
        plasma: "#ff4ecd",
      },
      boxShadow: {
        neon: "0 0 32px rgba(52, 213, 255, 0.22), 0 0 72px rgba(139, 92, 246, 0.16)",
        "neon-strong": "0 0 48px rgba(52, 213, 255, 0.35), 0 0 96px rgba(139, 92, 246, 0.25)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 80px rgba(0,0,0,0.34)",
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 20%, rgba(52, 213, 255, 0.16), transparent 28%), radial-gradient(circle at 80% 0%, rgba(139, 92, 246, 0.18), transparent 30%), radial-gradient(circle at 70% 75%, rgba(255, 78, 205, 0.10), transparent 26%)",
      },
      keyframes: {
        "border-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "data-scroll": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(8px)", opacity: "0" },
        },
      },
      animation: {
        "border-rotate": "border-rotate 4s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "data-scroll": "data-scroll 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
