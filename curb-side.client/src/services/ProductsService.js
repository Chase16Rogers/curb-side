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

  async createProduct(data) {
    const res = await api.post('api/products', data)
    AppState.products.push(res.data)
  }

  async editProduct(id, data) {
    const res = await api.put('api/products/' + id, data)
    const index = AppState.products.findIndex(p => p.id === id)
    AppState.products.splice(index, 1, res.data)
  }

  async deleteProduct(id) {
    await api.delete('api/products/' + id)
    const index = AppState.products.findIndex(p => p.id === id)
    AppState.products.splice(index, 1)
  }
}
export const productsService = new ProductsService()
