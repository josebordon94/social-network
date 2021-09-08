import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import CustomContainer from '../components/CustomContainer'
import { login as loginService, isAuth } from '../services/authServices'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const Login = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const user = {
      username: form[0].value,
      password: form[1].value,
    }
    const login = await loginService(user)
    const response = await login.json()
    if (response.token) {
      console.log('Valid session: ', response)
      localStorage.setItem('token', response.token)
      history.push('/main')
    } else {
      console.log('Invalid session: ', response.msg)
      setFormError(response.msg)
    }
    setLoading(false)
  }

  useEffect(() => {
    async function checkLoggedIn() {
      const auth = await isAuth()
      if (auth === false) {
        console.log('All ok')
      } else {
        history.push('/main')
      }
    }
    checkLoggedIn()
  }, [])

  return (
    <CustomContainer className="mt-4">
      <h1 className="text-center">Welcome to Social Network!</h1>
      <form onSubmit={(event) => handleLogin(event)}>
        <h3 className="text-center mt-4">Login to continue</h3>

        <div className="form-group px-2">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
          />
        </div>

        <div className="form-group  px-2">
          <label className="  mt-2">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="px-2 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary btn-block d-flex justify-content-center align-items-center  my-2"
            style={{ width: '150px', height: '35px' }}
          >
            {!loading ? (
              <>
                <ExitToAppIcon /> Login
              </>
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </button>
        </div>
      </form>
      {formError ? (
        <p id="passwordHelp" className="text-danger mt-4 fw-bold text-center">
          {formError}
        </p>
      ) : null}
      <p className="fs-5 text-center mt-2">
        Don't have an account yet? Register{' '}
        <Link to="/register">
          here <PersonAddIcon />
        </Link>
      </p>
      <div className="w-100 d-flex justify-content-center">
        <img src="/logo.png" style={{ width: '200px' }} className="mx-auto" />
      </div>
    </CustomContainer>
  )
}

export default Login
