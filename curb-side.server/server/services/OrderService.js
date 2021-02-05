import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class OrderService {
  async getMyOrders(query) {
    const res = await dbContext.Orders.find(query).populate('creator product')
    if (!res) {
      throw new BadRequest('ERROR 403 THE ID DOES NOT HAVE ANY ORDERS')
    }
    return res
  }

  async getOrders(userId) {
    const res = await dbContext.Orders.find({ id: userId }).populate('creator product')
    return res
  }

  async getOne(id) {
    const res = await dbContext.Orders.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async create(data) {
    const res = await dbContext.Orders.create(data)
    if (!res) {
      throw new BadRequest('Not Enough Data')
    }
    return res
  }

  async edit(data, query) {
    const res = await dbContext.Orders.findOneAndUpdate(query, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async delete(query) {
    const res = await dbContext.Orders.findOneAndDelete(query)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return 'Deleted'
  }
}
export const orderService = new OrderService()
