import { reactive } from 'vue'

export const AppState = reactive({
  user: {},
  account: {},
  businesses: [],
  myBusinesses: [],
  activeBusiness: {},
  googleMaps: [],
  orders: [],
  chat: {},
  date: '',
  products: [],
  activeProduct: {},
  cart: {},
  spin: true
})
