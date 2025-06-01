const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        display: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1E3A8A',
        accent: '#10B981',
      },
    },
  },
  plugins: [],
}