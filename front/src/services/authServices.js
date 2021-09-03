import { API_URL } from '../constants/constants'

import axios from 'axios'

const url = API_URL + '/auth'

// Make a request for a user with a given ID
export const login = async function (loginData) {
  let res = await fetch(url + '/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
  res = await res.json()
  localStorage.setItem('token', res.token)
}
