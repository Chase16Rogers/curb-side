<template>
  <div class="cart-page container-fluid">
    <div class="row" v-if="state.empty">
      <h1>No cart to be found!</h1>
    </div>
    <div class="row mt-5 page-row justify-content-around" v-else>
      <div class="col-lg-5 col-12">
        <div class="row page-title justify-content-center">
          <div class="col-md-12 col-6 d-flex align-items-center text-center">
            <h1>
              Your Cart
            </h1>
          </div>
          <div class="col-6 logo-col my-5 d-flex justify-content-end ">
            <img class="logo" :src="state.business.logo" alt="logo">
          </div>
          <div class="col-5 biz-name d-flex align-items-center">
            <h4>{{ state.business.name }}</h4>
          </div>
        </div>
        <div class="row justify-content-center">
        </div>
        <div class="row justify-content-around cart-row" v-if="state.cart.contents">
          <cart-product-component v-for="p in state.cart.contents" :key="p.id" :p="p" />
        </div>
      </div>
      <div class="col-lg-5 checkout-card elevation-5 col-12">
        <div class="row checkout-header bg-info justify-content-center align-items-center">
          <h1>Checkout</h1>
        </div>
        <div class="row h-75 mt-5">
          <div class="col-12 justify-content-between ">
            <div class="row justify-content-center ">
              <div class="col-10 checkout-contents" v-if="state.cart.contents">
                <checkout-item-component v-for="(p, index) in state.cart.contents" :index="index" :key="p.id" :p="p" />
              </div>
            </div>
            <div class="row justify-content-center">
            </div>
            <div class="row align-items-center checkout-btn-row justify-content-center">
              <div class="col-4 ">
                <h5 class="text-muted">
                  Subtotal:
                </h5>
              </div>
              <div class="col-4 d-flex justify-content-end">
                <h5 class="text-muted">
                  ${{ state.subTotal.toFixed(2) }}
                </h5>
              </div>
              <button class="btn btn-success border-dark border-2 rounded elevation-5 text-dark f-18 px-5" @click="placeOrder">
                Place Order
              </button>
            </div>
          </div>
        </div>
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
    const state = reactive({
      cart: computed(() => AppState.cart),
      business: computed(() => AppState.activeBusiness),
      empty: computed(() => AppState.cart.contents ? AppState.cart.contents.length === 0 : true),
      subTotal: computed(() => {
        let out = 0
        state.cart.contents.forEach(p => { out += p.price * p.quantity })
        return out
      })
    })
    const router = useRouter()
    onMounted(async() => {
      try {
        state.empty = !cartService.getCart()
        if (!state.empty) {
          await businessService.getOneBusiness(state.cart.businessId)
        }
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
            router.push({ name: 'OrderPage', params: { id: response.id } })
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
@import '../assets/scss/_variables.scss';
.page-title {
  font-size: 3rem;
  font-weight: 450;
}
.logo {
  width: 125px;
  height: 125px;
}
@media only screen and (max-width: 600px) {
  .page-row{
    border-top: 3px solid $dark;
  }
.biz-name {
  display: none !important;
}
.logo-col {
  justify-content: center !important;
}
.checkout-card{
  border: none !important;
}
}
.h-fc{
  height: fit-content ;
}

.checkout-header {
  height: 15%;
}
.checkout-card {
  border: 3px solid $dark;
  height: 75%;
}
.checkout-contents{
  max-height: 50% !important;
  overflow-y:auto !important;
  margin-bottom: 150px;
}
.checkout-btn-row{
  width: 100%;
  position: absolute;
  bottom: 10px;
}
.cart-row{
  overflow: auto;
  max-height:25% ;
}
</style>
