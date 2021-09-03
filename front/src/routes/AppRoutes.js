import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Main from '../screens/Main'
import Inbox from '../screens/Inbox'
import Login from '../screens/Login'
import { Container } from 'react-bootstrap'
import Profile from '../screens/Profile'

const routes = () => {
  const jwt = localStorage.getItem('jwt')
  console.log('JWT: ', jwt)
  return (
    <>
      <BrowserRouter>
        <Navigation />

        <Container
          className="m-0 p-0 m-md-auto pt-3"
          style={{ maxWidth: '700px' }}
        >
          <Switch>
            {/* {jwt ? null : <Redirect to="/login" />} */}
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Main} />
            <Route path="/inbox" exact component={Inbox} />
            <Route path="/profile/:id" exact component={Profile} />
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default routes
