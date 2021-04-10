import { createMuiTheme } from '@material-ui/core';

export const COLORS = {
  primary: '#006600',
  secondary: '#ffffff',
  ternary: '#0000ff',
  success: '#008600',
  error: '#860000',
  danger: '#dd0000',
  warning: '#c85200',
  gray: '#888888',
  mediumGray: '#cccccc',
  lightGray: '#eeeeee',
  black: '#000000',
}

export const LIGHT_THEME = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary
    }
  }
})