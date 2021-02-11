<template>
  <div class="row lines mt-3 pb-2" v-if="state.showDate && !state.activeArchive">
    <div class="col">
      <p>{{ getDate() }}</p>
    </div>
  </div>
  <div class="row lines p-3">
    <div class="col-6 p-0">
      <div class="d-flex">
        <p class="mr-1">
          <b>Order Recieved:</b>
        </p>
        <p><b>{{ time() }}</b></p>
      </div>

      <order-item-component v-for="item in orderProp.contents" :key="item._id" :item-prop="item" />
      <div class="container-fluid">
        <div class="row">
          <div class="col-9">
            <p>total charge:</p>
          </div>
          <div class="col-3">
            <p>${{ orderProp.subTotal }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 d-flex align-items-center flex-column pr-0" v-if="state.activeArchive">
      <div class="container-fluid">
        <div class="row">
          <div class="col-7 d-flex align-items-end">
            <p class="mr-2">
              {{ orderProp.creator.name }}
            </p>
          </div>
          <div class="offset-1 col-3">
            <i class="fa fa-comment fa-2x pointer mb-1 ml-1 mr-3 align-self-center" aria-hidden="true" @click="getChat()" data-toggle="modal" :data-target="'#chat'+ orderProp._id"></i>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="green-text" v-if="orderProp.here">
              The customer is waiting!
            </p>
            <p class="red-text" v-else>
              The customer is not here yet!
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 fs-6">
            <button class="btn-outline-success btn btn-sm text-sm min-width" data-toggle="modal" :data-target="'#id' + orderProp._id">
              Order Completed
            </button>
          </div>
          <div class="col-12">
            <button class="btn-outline-secondary btn btn-sm text-sm min-width" data-toggle="modal" :data-target="'#canid' + orderProp._id">
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      <!-- trigger modal -->
    </div>
    <div class="col-6" v-else>
      <p class="text-primary" v-if="orderProp.status === 'completed'">
        This order was fulfilled
      </p>
      <p class="text-secondary" v-else-if="orderProp.status==='cancelledByBusiness'">
        This order was cancelled by business
      </p>
      <p class="text-secondary" v-else-if="orderProp.status==='cancelledByCustomer'">
        This order was cancelled by customer
      </p>
    </div>
  </div>
  <complete-order-modal :complete-prop="orderProp._id" />
  <cancel-order-modal :cancel-prop="orderProp._id" />
  <!-- Modal -->
  <div class="modal fade bg-light"
       data-backdrop="static"
       :id="'chat'+ orderProp._id"
       tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="d-flex justify-content-end">
          <i class="fa fa-times-circle-o" @click="closeModal(orderProp._id)" aria-hidden="true"></i>
        </div>
        <div class="modal-body">
          <chat-component :chat-prop="state.chat" />
        </div>
        <div class="modal-footer">
          <form @submit.prevent="createMessage()">
            <input class="border-0"
                   type="text"
                   id="message"
                   name="message"
                   v-model="state.message"
                   placeholder="Send Message..."
            >
            <button type="submit" class="btn btn-primary">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { chatService } from '../services/ChatService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { socketService } from '../services/SocketService'
import $ from 'jquery'
export default {
  name: 'OrderComponent',
  props: {

    orderProp: {
      type: Object,
      required: true
    },
    archived: {
      type: Boolean
    }
  },
  setup(props) {
    const state = reactive({
      chat: computed(() => AppState.chat),
      message: '',
      // orderDate: computed(() => AppState.date),
      showDate: true,
      activeArchive: true
    })
    onMounted(() => {
      const orderDate = AppState.date
      if (props.orderProp.date === orderDate) {
        state.showDate = false
        // AppState.date = props.orderProp.date
      } else {
        state.showDate = true
        AppState.date = props.orderProp.date
      }
      if (props.archived) {
        state.activeArchive = false
      }
    })
    return {
      state,
      time() {
        const date = new Date(props.orderProp.createdAt)
        let hours = date.getHours()
        let suffix = ' AM'
        // NOTE
        let minutes = date.getMinutes()
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (hours > 12) {
          hours -= 12
          suffix = ' PM'
        }
        return hours + ':' + minutes + suffix
      },

      async getChat() {
        try {
          socketService.emit('join:room', props.orderProp._id)
          await chatService.getChats(props.orderProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      closeModal(id) {
        $('#chat' + id).modal('hide')
        socketService.emit('leave:room', id)
        AppState.chat = {}
      },
      async createMessage() {
        try {
          await chatService.createMessage(state.message)
          state.message = ''
        } catch (error) {
          logger.error(error)
        }
      },
      getDate() {
        const date = new Date(props.orderProp.createdAt)
        let month = date.getMonth()
        const year = date.getFullYear()
        const day = date.getDate()
        month += 1
        switch (month) {
          case 1:
            month = 'January'
            break
          case 2:
            month = 'Febuary'
            break
          case 3:
            month = 'March'
            break
          case 4:
            month = 'April'
            break
          case 5:
            month = 'May'
            break
          case 6:
            month = 'June'
            break
          case 7:
            month = 'July'
            break
          case 8:
            month = 'August'
            break
          case 9:
            month = 'September'
            break
          case 10:
            month = 'October'
            break
          case 11:
            month = 'November'
            break
          case 12:
            month = 'December'
            break
        }
        return month + '-' + day + '-' + year
      }
    }
  }
}
</script>

<style scoped>
p{
  margin-bottom: 0;
}
.green-text{
  color: var(--primary)
}
.red-text{
  color: var(--secondary)
}
.text-sm{
  font-size: .8rem !important;
}
.min-width{
  width: 100%;
}
</style>
