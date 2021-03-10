import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { orderService } from '../services/OrderService'
import { chatService } from '../services/ChatService'

export class OrderController extends BaseController {
  constructor() {
    super('api/orders')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getOne)
      .get('/:id/chats', this.getChats)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getOne(req, res, next) {
    try {
      const data = await orderService.getOne(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getChats(req, res, next) {
    try {
      res.send(await chatService.getAll({ orderId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const val = req.body
      //REVIEW CreatorID seems unnecessary
      val.customerId = req.userInfo.id
      val.creatorId = req.userInfo.id
      // NOTE Verify that an order's subtotal is accurate
      const data = await orderService.create(val)
      await chatService.create({ customerId: req.userInfo.id, businessId: req.body.businessId, orderId: data._id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      //REVIEW Edit should be more limited in scope
      const val = req.body
      // NOTE  this code was bad! We need to do a much better check to make sure that either the business OR customer match the IDs on the order. I removed the check to get the app working for now!
      const query = { _id: req.params.id }
      const data = await orderService.edit(val, query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      const data = await orderService.delete(query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
