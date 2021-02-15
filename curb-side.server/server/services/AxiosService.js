import Axios from 'axios'

export const latApi = Axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode'
})