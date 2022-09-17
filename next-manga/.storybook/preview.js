import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import dark from 'styles/dark'
import '../public/assets/global.css'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  )
]
