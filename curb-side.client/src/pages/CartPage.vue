<template>
  <div class="cart-page container-fluid">
    <div class="row" v-if="state.empty">
      <h1>No cart to be found!</h1>
    </div>
    <div class="row" v-else>
      <div class="col-lg-6 col-12">
        <div class="row">
          YOUR CART
        </div>
        <div class="row"></div>
        <div class="row justify-content-around" v-if="state.cart.contents">
          <cart-product-component v-for="p in state.cart.contents" :key="p.id" :p="p" />
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <button class="btn btn-outline-success" @click="placeOrder">
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { logger } from '../utils/Logger'
import { cartService } from '../services/CartService'
import { orderService } from '../services/OrderService'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRouter } from 'vue-router'
import { businessService } from '../services/BusinessService'

export default {
  name: 'CartPage',
  setup() {
    const state = reactive({ cart: computed(() => AppState.cart), business: computed(() => AppState.activeBusiness), empty: computed(() => AppState.cart.contents ? AppState.cart.contents.length === 0 : true) })
    const router = useRouter()
    onMounted(async() => {
      try {
        await businessService.getOneBusiness(state.cart.businessId)
        state.empty = !cartService.getCart()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      async placeOrder() {
        if (state.empty) {
          return
        }
        if (!AppState.user.isAuthenticated) {
          logger.log('if 1')
          await AuthService.loginWithPopup()
        }
        try {
          const response = await orderService.createOrder(state.cart)
          if (response) {
            router.push({ name: 'PendingOrderPage' })
          }
        } catch (error) {
          logger.error(error)
        }
      },
      state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
