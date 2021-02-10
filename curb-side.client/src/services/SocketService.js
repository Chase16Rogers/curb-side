import { SocketHandler } from '../utils/SocketHandler'
import { AppState } from '../AppState'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('create:order', this.createOrder)
      .on('update:ordercbb', this.updateCustomerOrder)
      .on('update:orderc', this.updateCustomerOrder)
      .on('update:ordercbc', this.updateBusinessOrder)
      .on('update:message', this.updateChat)
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }

  createOrder(payload) {
    console.log('order created with', payload)
    AppState.orders.push(payload)
  }

  updateBusinessOrder(payload) {
    console.log('order changed', payload)
    const index = AppState.orders.findIndex(o => o._id === payload._id)
    AppState.orders.splice(index, 1, payload)
  }

  updateCustomerOrder(payload) {
    console.log('order changed', payload)
    const index = AppState.orders.findIndex(o => o._id === payload._id)
    AppState.orders.splice(index, 1, payload)
  }

  updateChat(payload) {
    console.log('chat message', payload)
    AppState.chat = payload
  }
}
export const socketService = new SocketService()
