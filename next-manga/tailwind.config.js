module.exports = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/templates/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#2d9bca',
          500: '#247BA0'
        },
        secondary: {
          300: '#a5d8cf',
          500: '#70C1B3',
          900: '#459f90'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    extend:{
      scrollbar: ['rounded']
    }
}
}
