import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        // Tu paleta personalizada
        brand: {
          green: "#8ED77C",
          darker: "#061202",
        },
        // Colores de sistema para el cambio de modo
        bgMain: {
          light: "#FFFFFF",
          dark: "#061202",
        },
        textMain: {
          light: "#061202",
          dark: "#FFFFFF",
        }
      },
    },
  },
  plugins: [],
}

export default config