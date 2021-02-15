import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { businessService } from '../services/BusinessService'
import { orderService } from '../services/OrderService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:id/orders', this.getOrders)
      .get('/:id/businesses', this.getMyBusinesses)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getOrders(req, res, next) {
    try {
      res.send(await orderService.getMyOrders({ customerId: req.userInfo.id }))
    } catch (error) {
      next(error)
    }
  }

  async getMyBusinesses(req, res, next) {
    try {
      const data = await businessService.getAll({ creatorId: req.userInfo.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
