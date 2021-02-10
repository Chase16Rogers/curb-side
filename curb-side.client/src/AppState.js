import { reactive } from 'vue'

export const AppState = reactive({
  user: {},
  account: {},
  businesses: [],
  myBusinesses: [],
  activeBusiness: {},
  orders: [],
  activeOrder: {},
  chat: {},
  date: '',
  products: [],
  activeProduct: {},
  cart: {},
  spin: true,
  colors: [{ color: 'white', isSelected: false }, { color: 'black', isSelected: false }, { color: 'grey', isSelected: false }, { color: 'silver', isSelected: false }, { color: 'blue', isSelected: false }, { color: 'red', isSelected: false }, { color: 'orange', isSelected: false }, { color: 'brown', isSelected: false }, { color: 'tan', isSelected: false }, { color: 'green', isSelected: false }]
})
