import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-shapiro95)']
      },

      colors:{
        green: {
          100: "#f5fde0",
          200: "#ebfbc1",
          300: "#e1f9a2",
          400: "#d7f783",
          500: "#cdf564",
          600: "#a4c450",
          700: "#7b933c",
          800: "#526228",   
          900: "#293114"
        },
          

        red: {
          100: "#fde0e0",
          200: "#fbc1c1",
          300: "#f9a2a2",
          400: "#f78383",
          500: "#f56464",
          600: "#c45050",
          700: "#933c3c",
          800: "#622828",
          900: "#311414"
        },

        blue: {
          100: "#e0f6fd",
          200: "#c1edfb",
          300: "#a2e5f9",
          400: "#83dcf7",
          500: "#64d3f5",
          600: "#50a9c4",
          700: "#3c7f93",
          800: "#285462",
          900: "#142a31"
        },


        purple:{
          "400": '#7264f5',
          "500": '#392e96'
        },

        pink: {
          "400": '#f564c5',
          "500": '#be3f94'
        },


      }
    },
  },
  plugins: [],
};
export default config;
