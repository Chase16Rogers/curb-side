// import { AppState } from '../AppState'
// import { api, googleApi } from './AxiosService'

import { AppState } from '../AppState'
import { api } from './AxiosService'

class GoogleMapsService {
  async findNearMe(address) {
    debugger
    address = address.split(' ').join('+')
    const res = await api.get('api/businesses/' + address)
    AppState.businesses = res.data
  }
  // async findByDistance(address) {
  //   const businesses = await api.get('api/businesses')
  //   let allAddresses = ''
  //   businesses.data.forEach(b => {
  //     const googleAddress = b.address.split(' ').join('+')
  //     allAddresses = allAddresses + googleAddress + '|'
  //   })
  //   allAddresses.split('').pop().join('')
  //   address = address.split(' ').join('+')
  //   const res = await googleApi.get('json?origin=' + address + '&destination=' + allAddresses + '&key=AIzaSyDoW1Uw5M4sp85tE_yn6p0X5raQ8D-VWZM')
  //   AppState.googleMaps = res.data
  //   console.log(res.data)
  // }
}
export const googleMapsService = new GoogleMapsService()
