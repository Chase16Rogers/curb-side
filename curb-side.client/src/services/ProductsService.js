import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProductsService {
  async getProductsByBusiness(id) {
    const res = await api.get('api/businesses/' + id + '/products')
    AppState.products = res.data
  }

  async getProductById(id) {
    const res = await api.get('api/products/' + id)
    AppState.activeProduct = res.data
  }
}
export const productsService = new ProductsService()
