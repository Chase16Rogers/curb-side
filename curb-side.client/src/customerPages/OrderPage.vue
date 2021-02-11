<template>
  <div class="order-page container-fluid">
    <div class="row">
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
        <div class="row justify-content-around cart-row" v-if="state.order.contents">
          <div class="col-12">
            <cart-product-component v-for="p in state.order.contents" :key="p.id" :p="p" :change-qty="false" />
          </div>
        </div>
      </div>

      <div class="col-lg-5 col-12" v-if="state.order.status === 'pending'">
        <div class="row" v-if="!state.order.here">
          <div class="col-12">
            <div class="row py-5">
              <div class="col-4">
                <p>Vehicles Color :</p>
              </div>
              <div class="col-8">
                <div class="row">
                  <car-colors-component v-for="(c, index) in state.colors" @click="pickColor(c, index)" :index="index" :key="c" :color="c" />
                </div>
                <div class="row">
                  <div class="col-3 offset-1">
                    <p>Vehicle Details: </p>
                  </div>
                  <div class="col-4">
                    <input type="text" placeholder="make" v-model="state.arrival.make">
                  </div>
                  <div class="col-4">
                    <input type="text" placeholder="model" v-model="state.arrival.model">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <button @click="submitForm" class="btn btn-outline-secondary px-5 elevation-5">
                  I Have Arrived!
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center text-center" v-else>
          <h1>{{ state.business.name }} knows you have arrived!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { orderService } from '../services/OrderService'
import { AppState } from '../AppState'
import { businessService } from '../services/BusinessService'
import { logger } from '../utils/Logger'

export default {
  name: 'OrderPage',

  setup() {
    const route = useRoute()
    const state = reactive({ order: computed(() => AppState.activeOrder), business: computed(() => AppState.activeBusiness), colors: computed(() => AppState.colors), arrival: { carColor: '', make: '', model: '' } })
    onMounted(async() => {
      await orderService.getOrder(route.params.id)
      await businessService.getOneBusiness(state.order.businessId)
    })

    return {
      state,
      pickColor(color, index) {
        if (state.arrival.carColor) {
          const old = state.colors.find(c => c.color === state.arrival.carColor.color)
          old.isSelected = false
        }
        state.arrival.carColor = color
        state.colors[index].isSelected = true
      },
      async submitForm() {
        try {
          await orderService.arrive(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  width: 100px;
}
.logo {
  width: 80px;
  height: 80px;
}
</style>
