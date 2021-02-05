const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class OrderService {
  async getOrders(id) {
    const res = await api.get('api/businesses/' + id + '/orders')
    AppState.orders = res.data
  }
}
export const orderService = new OrderService()
