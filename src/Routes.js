import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Admin } from './pages/Admin'
import { Home } from './pages/Home'

export const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/home' />
      <Route path='/home' component={Home} />
      <Route path='/admin' component={Admin} />
    </Switch>
  )
}
