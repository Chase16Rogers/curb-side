import { AppState } from '../AppState'
import { api } from './AxiosService'

class ChatService {
  async getChats(id) {
    const res = await api.get('api/orders/' + id + '/chats')
    return res.data[0]
  }

  async createMessage(chatId, data, message) {
    const changes = { message: message, senderId: AppState.account._id }
    // const message = { content: [...AppState.chat.content, changes] }
    console.log(chatId, data.content, message)
    const res = await api.put('api/chats/' + chatId, { content: [...data.content, changes] })
    // REVIEW if user loads business orders and then loads their own order as a customer, this will break!
    if (AppState.orders.length > 0) {
      AppState.orders.find(o => o.id === res.data.orderId).chat = res.data
    } else {
      AppState.activeOrder.chat = res.data
    }
  }
}
export const chatService = new ChatService()
