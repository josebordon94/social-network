import { API_URL } from '../constants/constants'

import axios from './axios'

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}

export const create = async function (text, file_64) {
  let formData = new FormData()
  const file = dataURLtoFile(file_64.data_url, file_64.file.name)
  formData.append('text', text)
  formData.append('img', file)

  return await axios.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': localStorage.getItem('token'),
    },
  })
}

export const getLoggedUserProfile = async function () {
  return await axios.get('/posts/profile', {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': localStorage.getItem('token'),
    },
  })
}

export const getLoggedUserHome = async function () {
  return await axios.get('/posts/userHome', {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': localStorage.getItem('token'),
    },
  })
}

export const comment = async function (commentData) {
  return await axios.post('/posts/comment', commentData, {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  })
}
