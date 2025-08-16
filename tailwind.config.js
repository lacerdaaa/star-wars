/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron_400Regular"],
        'orbitron-medium': ["Orbitron_500Medium"],
        'orbitron-semibold': ["Orbitron_600SemiBold"],
        'orbitron-bold': ["Orbitron_700Bold"],
      }
    },
  },
  plugins: [],
}