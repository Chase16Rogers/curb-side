import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import socketService from "./SocketService"

class ChatService {
  // gets all chats by order
  async getAll(query) {
    const res = await dbContext.Chats.find(query)
    if (!res) {
      throw new BadRequest('Invalid Search')
    }
    return res
  }

  async getOne(id) {
    debugger
    const res = await dbContext.Chats.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async create(data) {
    // const order = await dbContext.Orders.findOne(data)
    // data.orderId = order._id
    const res = await dbContext.Chats.create(data)
    if (!res) {
      throw new BadRequest('Not Enough Data')
    }
    return res
  }

  async edit(data, query) {
    const res = await dbContext.Chats.findOneAndUpdate(query, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    socketService.messageRoom('general', 'update:message', res)
    return res
  }

  async delete(query) {
    const res = await dbContext.Chats.findOneAndDelete(query)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return 'Deleted'
  }
}
export const chatService = new ChatService()
