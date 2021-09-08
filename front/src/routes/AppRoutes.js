import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Main from '../screens/Main'
import Inbox from '../screens/Inbox'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import PrivateRoute from './PrivateRoute'
import Register from '../screens/Register'
import NotFound from '../screens/NotFound'
import NewPost from '../screens/NewPost'

const routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* {jwt ? null : <Redirect to="/login" />} */}
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/inbox" exact component={Inbox} />
          <PrivateRoute path="/main" exact component={Main} />
          <PrivateRoute path="/new" exact component={NewPost} />
          <PrivateRoute path="/profile/me" exact component={Profile} />
          <PrivateRoute path="/profile/:id" exact component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
        {/* </Container> */}
      </BrowserRouter>
    </>
  )
}

export default routes
