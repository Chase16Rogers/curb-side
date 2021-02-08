import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/business',
    name: 'CreateBusiness',
    component: loadPage('BusinessPage'),
    beforeEnter: authGuard
  },
  {
    path: '/mybusinesses',
    name: 'MyBusinesses',
    component: loadPage('MyBusinessesPage'),
    beforeEnter: authGuard
  },
  {
    path: '/searchresults/:search',
    name: 'SearchResults',
    component: loadPage('SearchResultsPage')
  },
  {
    path: '/managemybusinesses/:id',
    name: 'BusinessManager',
    component: loadPage('BusinessManager'),
    beforeEnter: authGuard
  },
  {
    path: '/activeorders/:id',
    name: 'ActiveOrders',
    component: loadPage('ActiveOrderPage'),
    beforeEnter: authGuard
  },
  {
    path: '/storefront/:id',
    name: 'StoreFront',
    component: loadPage('StoreFront')
  },
  {
    path: '/archivedOrder/:id',
    name: 'ArchivedOrderPage',
    component: loadPage('ArchivedOrderPage'),
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
