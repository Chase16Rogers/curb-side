import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
class BusinessService {
  async getMyBusiness(id) {
    id = AppState.account.id
    const res = await api.get('account/' + id + '/businesses')
    AppState.myBusinesses = res.data
  }

  async getOneBusiness(id) {
    const res = await api.get('api/businesses/' + id)
    AppState.activeBusiness = res.data
  }

  async createBusiness(data) {
    console.log(data)
    if (data.tags) { data.tags = data.tags.split(' ') }
    const res = await api.post('api/businesses', data)
    AppState.businesses.push(res.data)
    logger.log(AppState.businesses)
  }

  async editBusiness(id, data) {
    const res = await api.put('api/businesses/' + id, data)
    AppState.activeBusiness = res.data
  }

  async deleteBusiness(id) {
    await api.delete('api/businesses/' + id)
  }
}
export const businessService = new BusinessService()
