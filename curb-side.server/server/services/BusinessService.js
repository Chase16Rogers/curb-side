import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BusinessService {
  async getAll(query = {}) {
    const res = await dbContext.Businesses.find(query)
    if (!res) {
      throw new BadRequest('Invalid Search')
    }
    return res
  }

  async getOne(id) {
    const res = await dbContext.Businesses.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async create(data) {
    const res = await dbContext.Businesses.create(data)
    if (!res) {
      throw new BadRequest('Not Enough Data')
    }
    return res
  }

  async edit(data, query) {
    const res = await dbContext.Businesses.findOneAndUpdate(query, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async delete(query) {
    const res = await dbContext.Businesses.findOneAndDelete(query)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return 'Deleted'
  }
}
export const businessService = new BusinessService()
