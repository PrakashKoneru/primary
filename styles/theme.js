import { createBreakpoints } from "@chakra-ui/theme-tools"
import components from './components/componentStyles'

const theme = {
  colors: {
    primary: '#495FBF',
    secondary: '#19858F',
    mustard: '#FF7D00',
    red: '#FA1103',
    darkGreen: '#179942',
    lightGreen: '#01E4AA',
    pink: '#FD998A',
    gray: '#BFBFBF',
    white: '#fff',
    black: '#000',
    bgBlue: '#DBF6F8'
  },
  fontSizes: {
    large: '3rem',
    medium: '2rem',
    regular: '1rem',
    small: '0.75rem',
    xsmall: '0.5rem',
  },
  components,
  breakpoints: createBreakpoints({
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  })
}

export default theme;