import { AppState } from '../AppState'
import { api } from './AxiosService'

class ChatService {
  async getChats(id) {
    const res = await api.get('api/orders/' + id + '/chats')
    AppState.chat = res.data[0]
  }

  async createMessage(data) {
    const changes = { message: data, senderId: AppState.account._id }
    const message = { content: [...AppState.chat.content, changes] }
    const res = await api.put('api/chats/' + AppState.chat._id, message)
    AppState.chat[0] = res.data
  }
}
export const chatService = new ChatService()
