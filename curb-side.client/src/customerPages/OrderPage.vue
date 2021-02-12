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

        <div class="row justify-content-around cart-row" v-if="state.order.contents">
          <div class="col-12">
            <cart-product-component v-for="p in state.order.contents" :key="p.id" :p="p" :change-qty="false" />
          </div>
        </div>
      </div>

      <div class="col-lg-5 right-col col-12" v-if="state.order.status === 'pending'">
        <div class="row border my-3 " v-if="!state.order.here">
          <div class="col-12">
            <div class="row">
              <div class="col-3 d-flex align-items-center">
                <p class="form-label">
                  Vehicle Color:
                </p>
              </div>
              <div class="col-9 col-md-8">
                <div class="row">
                  <car-colors-component v-for="(c, index) in state.colors" @click="pickColor(c, index)" :index="index" :key="c" :color="c" />
                </div>
              </div>
              <div class="col-3">
                <p class="form-label">
                  Vehicle Details:
                </p>
              </div>
              <div class="col-4">
                <input type="text" placeholder="make" v-model="state.arrival.make">
              </div>
              <div class="col-4">
                <input type="text" placeholder="model" v-model="state.arrival.model">
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
        <div v-if="state.chat.content" class="row border my-3 chat-row">
          <chat-component :chat-prop="state.chat" />
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
import { chatService } from '../services/ChatService'
import { socketService } from '../services/SocketService'

export default {

  name: 'OrderPage',

  setup() {
    const route = useRoute()
    const state = reactive({
      order: computed(() => AppState.activeOrder),
      business: computed(() => AppState.activeBusiness),
      colors: computed(() => AppState.colors),
      arrival: { carColor: '', make: '', model: '' },
      chat: computed(() => AppState.chat),
      message: ''
    })
    onMounted(async() => {
      try {
        socketService.emit('join:room', route.params.id)
        await orderService.getOrder(route.params.id)
        await businessService.getOneBusiness(state.order.businessId)
        await chatService.getChats(route.params.id)
      } catch (error) {
        logger.error(error)
      }
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
      async createMessage() {
        try {
          await chatService.createMessage(state.message)
          state.message = ''
        } catch (error) {
          logger.error(error)
        }
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
.form-label {
  font-weight: 600;
  font-size: .9rem ;
}
.row-right {
  height: 50%;
}
.chat-row {
  height: 50%;

}
.right-col {
  height: 80vh;
  overflow-y:hidden ;
  overflow-x:hidden ;
  display: flex;
  flex-direction: column;
}

</style>
