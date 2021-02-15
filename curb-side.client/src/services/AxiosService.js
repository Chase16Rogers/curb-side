import Axios from 'axios'

export const baseURL = window.location.origin.includes('localhost') ? 'http://localhost:3000' : ''
export const googleApi = Axios.create({
  baseURL: 'http://maps.googleapis.com/maps/api/distancematrix',
  timeout: 8000
})
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const latApi = Axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode'
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
