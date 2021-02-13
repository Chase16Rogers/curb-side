// import { AppState } from '../AppState'
// import { api, googleApi } from './AxiosService'

import { AppState } from '../AppState'
import { api } from './AxiosService'

class GoogleMapsService {
  async findNearMe(address) {
    const data = address.split(' ').join('+')
    const res = await api.get('api/businesses/find/' + data)
    AppState.businesses = res.data
  }
}
export const googleMapsService = new GoogleMapsService()
