const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class OrderService {
  async getOrders(id) {
    const res = await api.get('api/businesses/' + id + '/orders')
    AppState.orders = res.data
  }

  async editOrder(id, data) {
    const res = await api.put('api/orders/' + id, data)
    const index = AppState.orders.findIndex(o => o._id === id)
    AppState.orders.splice(index, 1, res.data)
  }
}
export const orderService = new OrderService()
