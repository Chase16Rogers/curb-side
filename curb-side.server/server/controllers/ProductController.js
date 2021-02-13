import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { productService } from '../models/ProductService'

export class ProductController extends BaseController {
  constructor() {
    super('api/products')
    this.router
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getOne(req, res, next) {
    try {
      const data = await productService.getOne(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const val = req.body
      val.creatorId = req.userInfo.id
      const data = await productService.create(val)
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
      const data = await productService.edit(val, query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      const data = await productService.delete(query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
