export default {
  grid: {
    container: '150rem',
    gutter: '3.2rem'
  },
  border: {
    radius: '0.4rem'
  },
  font: {
    family:
      "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.8rem',
      huge: '4.2rem'
    }
  },
  colors: {
    primary: '#247BA0',
    secondary: '#70C1B3',
    mainBg: '#000',
    white: '#FAFAFA',
    lightBg: '#F2F2F2',
    black: '#030517',
    lightText: '#FFF',
    lightGray: '#EAEAEA',
    gray: '#8F8F8F',
    darkGray: '#2E2F42',
    blueDark: '#2a2c42',
    red: '#f25f5c',
    cardBg:
      'linear-gradient(360deg, rgba(205,205,205,0.25) 0%, rgba(205,205,205,0.25) 51%, rgba(205,205,205,0.25) 100%)'
  },
  spacings: {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  },
  transition: {
    default: '0.3s ease-in-out',
    fast: '0.1s ease-in-out'
  }
} as const
