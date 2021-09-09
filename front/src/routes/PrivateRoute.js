import React, { Component, useEffect, useState } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import CustomContainer from '../components/CustomContainer'
import Navigation from '../components/Navigation'
import { isAuth } from '../services/authServices'
import Transition from '../components/Transition'
import { Fade } from '@material-ui/core'

//Check valid user

function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    async function checkLoggedIn() {
      const auth = await isAuth()
      if (auth === false) {
        history.push('/login')
      } else {
        setLoggedIn(true)
      }
      // if (!auth.loggedIn) {
      //   history.push('/login')
      // }
    }
    checkLoggedIn()
  }, [])

  return (
    // <Route {...rest}>{user ? <Component /> : <Redirect to="/login" />}</Route>
    <>
      <Navigation />
      {/* <Transition> */}
      <CustomContainer>
        {/* <Fade in={true} timeout={800}> */}
        <Route {...rest}>{loggedIn && <Component />}</Route>
        {/* </Fade> */}
      </CustomContainer>
      {/* </Transition> */}
    </>
  )
}

export default PrivateRoute
