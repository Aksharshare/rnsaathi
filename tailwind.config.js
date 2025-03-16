/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
        background: "#f8fafc",
        card: "#ffffff",
        text: "#1e293b",
        border: "#e2e8f0",
        notification: "#ef4444",
      },
    },
  },
  plugins: [],
}