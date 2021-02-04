import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BusinessService {
  async createBusiness(data) {
    const res = await api.post('api/businesses', data)
    AppState.businesses.push(res.data)
    logger.log(AppState.businesses)
  }

  async getMyBusiness(id) {
    id = AppState.account.id
    const res = await api.get('account/' + id + '/businesses')
    AppState.myBusinesses = res.data
  }
}
export const businessService = new BusinessService()
