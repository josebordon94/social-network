import { API_URL } from '../constants/constants'
import { dataURLtoFile } from './fileService'

import axios from './axios'

const url = API_URL + '/auth'

export const register = async function (userData, file_64) {
  let formData = new FormData()
  const file = dataURLtoFile(file_64.data_url, file_64.file.name)
  formData.append('username', userData.username)
  formData.append('name', userData.name)
  formData.append('lastname', userData.username)
  formData.append('password', userData.password)
  formData.append('description', userData.description)
  formData.append('img', file)

  return await axios.post('/auth', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const login = async function (loginData) {
  return await fetch(API_URL + '/auth' + '/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
}

export const isAuth = async function () {
  try {
    if (localStorage.getItem('token') === null) return false
    console.log('verifing user')
    const resp = await axios.get('/isUserAuth', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    return resp
  } catch (err) {
    // Handle Error Here
    return false
  }
}
