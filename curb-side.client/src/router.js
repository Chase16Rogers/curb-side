import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(folder, page) {
  return () => import(`./${folder}/${page}.vue`)
}
// NOTE Inconsistent naming conventions. Calling page in name or no???
const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('pages', 'HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('pages', 'AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('pages', 'AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/business',
    name: 'RegisterBusinessPage',
    component: loadPage('businessPages', 'RegisterBusinessPage'),
    beforeEnter: authGuard
  },
  {
    path: '/mybusinesses',
    name: 'MyBusinesses',
    component: loadPage('businessPages', 'MyBusinessesPage'),
    beforeEnter: authGuard
  },
  {
    path: '/searchresults',
    name: 'SearchResults',
    component: loadPage('customerPages', 'SearchResultsPage')
  },
  {
    path: '/managemybusinesses/:id',
    name: 'BusinessManager',
    component: loadPage('businessPages', 'BusinessManager'),
    beforeEnter: authGuard
  },
  {
    path: '/activeorders/:id',
    name: 'ActiveOrders',
    component: loadPage('businessPages', 'ActiveOrderPage'),
    beforeEnter: authGuard
  },
  {
    path: '/storefront/:id',
    name: 'StoreFront',
    component: loadPage('customerPages', 'StoreFront')
  },
  {
    path: '/editcatalogue/:id',
    name: 'EditStoreFront',
    component: loadPage('businessPages', 'EditStoreFrontPage'),
    beforeEnter: authGuard
  },
  {
    path: '/archivedOrder/:id',
    name: 'ArchivedOrderPage',
    component: loadPage('businessPages', 'ArchivedOrderPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account/:id/orders',
    name: 'MyOrdersPage',
    component: loadPage('customerPages', 'MyOrdersPage'),
    beforeEnter: authGuard
  },
  {
    path: '/productpage/:id',
    name: 'ProductPage',
    component: loadPage('customerPages', 'ProductPage')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: loadPage('customerPages', 'CartPage')
  },
  {
    path: '/order/:id',
    name: 'OrderPage',
    component: loadPage('customerPages', 'OrderPage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
