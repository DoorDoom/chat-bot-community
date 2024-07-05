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
      spacing: {
        "17": "4.25rem",
        "14p": "0.875rem",
      },
      colors: {
        "cod-gray": "#1E1E1E",
        "azure-radiance": "#007AFF",
        "athens-gray": "#F2F2F7",
        shark: "#2C2C2E",
        "pastel-green": "#81E299",
        "mid-gray": "#666668",
      },
    },
  },
  plugins: [],
};
export default config;
