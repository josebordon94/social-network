import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Container } from 'react-bootstrap'
import { login as loginService } from '../services/authServices'

const Login = () => {
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()
    const form = e.target
    const user = {
      username: form[0].value,
      password: form[1].value,
    }
    fetch('http://localhost:4000/auth' + '/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token)
      })
  }

  return (
    <Container className="mt-3">
      <form onSubmit={(event) => handleLogin(event)}>
        <h3>Iniciar sesión</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    </Container>
  )
}

export default Login
