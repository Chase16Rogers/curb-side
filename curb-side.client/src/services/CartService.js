import { AppState } from '../AppState'

class CartService {
  addToCart(p) {
    const str = localStorage.getItem('cart')
    let cart = {}
    if (str) {
      // console.log('if')
      cart = JSON.parse(str)
      if (cart.businessId !== p.businessId) {
        window.alert('You can only have one business in your cart at a time! Clear your cart to proceed.')
        return false
      }
    } else {
      // console.log('else')
      cart = {
        businessId: p.businessId,
        contents: []
      }
    }
    const match = cart.contents.find(elem => elem.id === p.id)
    if (match) {
      match.quantity++
    } else {
      p.quantity = 1
      cart.contents.push(p)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    return true
  }

  getCart() {
    const str = localStorage.getItem('cart')
    let cart = {}
    if (str) {
      cart = JSON.parse(str)
      AppState.cart = cart
      return true
    } else {
      return false
    }
  }

  changeQuantity(p, amt) {
    if (p.quantity + amt === 0) {
      AppState.cart.contents = AppState.cart.contents.filter(e => e.id !== p.id)
      if (AppState.cart.contents.length === 0) {
        AppState.cart = {}
        localStorage.removeItem('cart')
        return
      }
    }
    p.quantity += amt
    const c = JSON.stringify(AppState.cart)
    localStorage.setItem('cart', c)
  }
}
export const cartService = new CartService()
