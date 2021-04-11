import React from 'react'
import './App.css'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import { LIGHT_THEME } from './constants'
import HomeView from './features/home/HomeView'
import SignIn from './features/profile/SignIn'
import TransactionList from './features/transaction/TransactionList'
import TransactionForm from './features/transaction/TransactionForm'
import NotFound from './features/notfound/NotFound'
import SignUp from './features/profile/SignUp';

function App() {

  return (
    <MuiThemeProvider theme={LIGHT_THEME}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/transactions">
            <Switch>
              <Route exact path="/transactions">
                <TransactionList />
              </Route>
              <Route path="/transactions/add">
                <TransactionForm />
              </Route>
              <Route path="/transactions/:id">
                <TransactionForm />
              </Route>
            </Switch>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App
