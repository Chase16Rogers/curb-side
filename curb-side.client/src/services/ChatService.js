import { AppState } from '../AppState'
import { api } from './AxiosService'

class ChatService {
  async getChats(id) {
    const res = await api.get('api/orders/' + id + '/chats')
    AppState.chat = res.data
  }

  async createMessage(data) {
    const changes = { message: data, senderId: AppState.account._id }
    const message = { content: [...AppState.chat[0].content, changes] }
    const res = await api.put('api/chats/' + AppState.chat[0]._id, message)
    AppState.chat[0] = res.data
  }
}
export const chatService = new ChatService()
