import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { latApi } from "./AxiosService"
const GoogleKey = process.env.Google_Key
class BusinessService {
  async getAll(query) {
    const res = await dbContext.Businesses.find(query)
    if (!res) {
      throw new BadRequest('Invalid Search')
    }
    return res
  }
  async getAllNear(data) {
    const lats = await latApi.get('json?address=' + data.address + '&key=' + GoogleKey) 
    let coords = [lats.data.results[0].geometry.location.lng, lats.data.results[0].geometry.location.lat]
    // let query = {}
    // query{center: coords, maxDistance:10000, spherical: true}
    const res = await dbContext.Businesses.find({
      location: {
       $near: {
        $maxDistance: 8000,
        $geometry: {
         type: "Point",
         coordinates: coords
        }
       }
      }
      })
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
    let address = data.address
    address = address.split(' ').join('+')
    const lats = await latApi.get('json?address=' + address + '&key='+ GoogleKey)
    let coords = [lats.data.results[0].geometry.location.lng, lats.data.results[0].geometry.location.lat]
    data.location = {}
    data.location.coordinates = coords
    // console.log(lats.data)
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
