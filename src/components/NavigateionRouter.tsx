import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import HomeView from './../features/home/HomeView'
import NotFound from './../features/restrict/NotFound'
import NotAllowed from './../features/restrict/NotAllowed'
import SignUp from './../features/profile/SignUp'
import SignIn from './../features/profile/SignIn'
import TransactionList from './../features/transaction/TransactionList'
import TransactionForm from './../features/transaction/TransactionForm'

interface NavigationRouteI {
  path: string,
  component: JSX.Element,
  exact: boolean,
  restrict: boolean,
  subRoutes: NavigationRouteI[] | null
}

const NavigationRouter = () => {
  const initialRoutes: NavigationRouteI[] = [
    {path: '/', component: <HomeView />, exact: true, restrict: false, subRoutes: null},
    {path: '/signup', component: <SignUp />, exact: false, restrict: false, subRoutes: null},
    {path: '/signin', component: <SignIn />, exact: false, restrict: false, subRoutes: null},
    {path: '/transactions', component: <TransactionList />, exact: false, restrict: false, subRoutes: [
        {path: '/transactions/add', component: <TransactionList />, exact: false, restrict: true, subRoutes: null},
        {path: '/transactions/:id', component: <TransactionList />, exact: false, restrict: false, subRoutes: null},
      ]},
    {path: '*', component: <NotFound />, exact: false, restrict: false, subRoutes: null},
  ];

  const [routes, setRoutes] = useState(initialRoutes);

  const buildRoutes = (routes: NavigationRouteI[]) => routes.map((route, index) =>
    (route.subRoutes && route.subRoutes.length)? (
      <Route path={route.path} key={index}>
        <Switch>
          <Route exact path={route.path}>
            {route.component}
          </Route>
          {buildRoutes(route.subRoutes)}
        </Switch>
      </Route>
    ) : (
      <Route exact={route.exact} path={route.path} key={index}>
        {(route.restrict)? <NotAllowed /> : route.component}
      </Route>
    ))

  return (
    <Router>
      <Switch>
        {buildRoutes(routes)}
      </Switch>
    </Router>
  )
}

export default NavigationRouter