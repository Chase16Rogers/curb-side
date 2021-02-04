import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { chatService } from '../services/ChatService'

export class ChatController extends BaseController {
  constructor() {
    super('api/chats')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getOne)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getOne(req, res, next) {
    try {
      const data = await chatService.getOne(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const val = req.body
      const query = { _id: req.params.id }
      const data = await chatService.edit(val, query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id }
      const data = await chatService.delete(query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
