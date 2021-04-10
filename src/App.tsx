import React from 'react';
import './App.css';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { LIGHT_THEME } from './constants';

function App() {

  return (
    <MuiThemeProvider theme={LIGHT_THEME}>
      <CssBaseline />
    </MuiThemeProvider>
  );
}

export default App;
