<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h3>Archived Order</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <order-component v-for="order in sortDates()" :key="order.id" :order-prop="order" :archived="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { orderService } from '../services/OrderService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

export default {
  setup() {
    const route = useRoute()

    const state = reactive({
      orders: computed(() => AppState.orders)
    })
    onMounted(async() => {
      try {
        await orderService.getOrders(route.params.id)
        // AppState.orders = AppState.orders.filter(o => o.status !== 'pending')
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      sortDates() {
        state.orders.forEach(o => {
          const date = new Date(o.createdAt)
          const month = date.getMonth()
          const year = date.getFullYear()
          const day = date.getDate()
          const currentDate = year.toString() + month.toString() + day.toString()
          o.date = currentDate
          logger.log(currentDate)
        })
        AppState.orders.sort(function(a, b) {
          return a.date - b.date
        })
        return AppState.orders
      }
    }
  }
}
</script>

<style>

</style>
