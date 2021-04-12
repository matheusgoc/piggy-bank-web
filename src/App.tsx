import React from 'react'
import './App.css'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { LIGHT_THEME } from './constants'
import NavigationRouter from './components/NavigateionRouter';

function App() {

  return (
    <MuiThemeProvider theme={LIGHT_THEME}>
      <CssBaseline />
      <NavigationRouter />
    </MuiThemeProvider>
  )
}

export default App
