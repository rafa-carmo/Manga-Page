import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import dark from 'styles/dark'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  )
]
