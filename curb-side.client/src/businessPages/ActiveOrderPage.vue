<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h3>Active Orders</h3>
      </div>
    </div>
    <div class="row mt-5" v-if="state.spin">
      <div class="col-12 mt-5 justify-content-center d-flex">
        <i class="fa fa-circle-o-notch fa-5x fa-spin" aria-hidden="true"></i>
      </div>
    </div>

    <div v-else>
      <order-component v-for="order in state.orders" :key="order.id" :order-prop="order" />
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { logger } from '../utils/Logger'
import { orderService } from '../services/OrderService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { businessService } from '../services/BusinessService'

export default {
  name: 'ActiveOrder',
  setup() {
    const route = useRoute()
    const state = reactive({
      orders: computed(() => AppState.orders),
      spin: computed(() => AppState.spin)
    })
    onMounted(async() => {
      try {
        await orderService.getOrders(route.params.id)
        AppState.orders = AppState.orders.filter(o => o.status === 'pending')
        AppState.spin = false
        await businessService.getOneBusiness(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
