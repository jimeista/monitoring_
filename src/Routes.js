import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Map from './pages/Map'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/map' component={Map} />
      <Redirect exact from='*' to='/' />
    </Switch>
  )
}
