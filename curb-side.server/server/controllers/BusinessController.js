import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { businessService } from '../services/BusinessService'
import { orderService } from '../services/OrderService'
import { productService } from '../services/ProductService'

export class BusinessController extends BaseController {
  constructor() {
    super('api/businesses')
    this.router
      .get('/find/:address', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/products', this.getProducts)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/orders', this.getOrders)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await businessService.getAllNear({address: req.params.address })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getProducts(req, res, next) {
    try {
      const query = { businessId: req.params.id }
      const data = await productService.getAll(query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await businessService.getOne(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOrders(req, res, next) {
    try {
      const businessId = req.params.id
      const data = await orderService.getOrders(businessId)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const val = req.body
      val.creatorId = req.userInfo.id
      const data = await businessService.create(val)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const val = req.body
      val.creatorId = req.userInfo.id
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      const data = await businessService.edit(val, query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      const data = await businessService.delete(query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
