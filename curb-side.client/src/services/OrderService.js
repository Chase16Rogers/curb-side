import { chatService } from '../services/ChatService'
const { AppState } = require('../AppState')
const { api } = require('./AxiosService')
class OrderService {
  async getOrders(id) {
    const resOrders = await api.get('api/businesses/' + id + '/orders')
    const orders = resOrders.data
    for await (const order of orders) {
      const resChat = await api.get('api/orders/' + order._id + '/chats')
      order.chat = resChat.data[0]
      // console.log(order)
    }

    AppState.orders = resOrders.data
  }

  async getMyOrders(id) {
    const resOrders = await api.get('account/' + id + '/orders')
    // const orders = resOrders.data
    // for await (const order of orders) {
    //   const resChat = await api.get('api/orders/' + order._id + '/chats')
    //   order.chat = resChat.data[0]
    //   console.log(order)
    // }

    AppState.orders = resOrders.data
  }

  async createOrder(cart) {
    const order = { businessId: cart.businessId, contents: [] }
    let subTotal = 0
    cart.contents.forEach(elem => {
      subTotal += elem.quantity * elem.price
      const product = { productId: elem.id, quantity: elem.quantity }
      if (elem.instructions) {
        product.instructions = elem.instructions
      }
      order.contents.push(product)
    })
    order.subTotal = subTotal
    const res = await api.post('api/orders', order)
    if (res.status === 200) {
      AppState.cart = {}
      localStorage.removeItem('cart')
      return res.data
    }
    return false
  }

  async editOrder(id, data) {
    await api.put('api/orders/' + id, data)
    const index = AppState.orders.findIndex(o => o._id === id)
    AppState.orders.splice(index, 1)
  }

  async getOrder(id) {
    const res = await api.get('api/orders/' + id)
    res.data.chat = await chatService.getChats(id)
    const arr = []
    res.data.contents.forEach(p => arr.push({ ...p.product, quantity: p.quantity }))
    res.data.contents = arr
    AppState.activeOrder = res.data
  }

  async arrive(id) {
    const res = await api.put('api/orders/' + id, { here: true })
    AppState.activeOrder = res.data
  }
}
export const orderService = new OrderService()
