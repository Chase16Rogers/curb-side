<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h3>Active Orders</h3>
      </div>
    </div>

    <order-component v-for="order in state.orders" :key="order.id" :order-prop="order" />
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
      orders: computed(() => AppState.orders)
    })
    onMounted(async() => {
      try {
        await orderService.getOrders(route.params.id)
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
