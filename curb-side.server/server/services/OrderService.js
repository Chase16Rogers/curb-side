import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { businessService } from './BusinessService'

class OrderService {
  async getAll(req) {
    let bTruth = false
    if (req.body.businessId) {
      const business = await businessService.getOne(req.body.businessId)
      if (business.creatorId === req.userInfo.id) {
        bTruth = true
      }
    }
    if (bTruth || req.body.creatorId === req.userInfo.id) {
      const res = await dbContext.Orders.find(req.body)
      if (!res) {
        throw new BadRequest('Invalid Search')
      }
      return res
    }
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
