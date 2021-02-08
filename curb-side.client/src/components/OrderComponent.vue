<template>
  <div class="row lines p-3">
    <div class="col-6 p-0">
      <div class="d-flex">
        <p class="mr-1">
          Order Recieved:
        </p>
        <p>{{ time() }}</p>
      </div>

      <order-item-component v-for="item in orderProp.contents" :key="item._id" :item-prop="item" />
    </div>
    <div class="col-6 d-flex justify-content-center flex-column">
      <p class="green-text" v-if="orderProp.here">
        The customer is waiting!
      </p>
      <p class="red-text" v-else>
        The customer is not here yet!
      </p>
      <p>Chat with the customer</p>
      <!-- trigger modal -->
      <i class="fa fa-comment fa-2x pointer align-self-center" aria-hidden="true" @click="getChat()" data-toggle="modal" data-target="#chatModal"></i>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade bg-light"
       data-backdrop="static"
       id="chatModal"
       tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="d-flex justify-content-end">
          <i class="fa fa-times-circle-o" @click="closeModal()" aria-hidden="true" data-dismiss="modal"></i>
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
import { computed, reactive } from 'vue'
import { chatService } from '../services/ChatService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'OrderComponent',
  props: {
    orderProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      chat: computed(() => AppState.chat[0] || AppState.chat),
      message: ''
    })
    return {
      state,
      time() {
        const date = new Date(props.orderProp.createdAt)
        let hours = date.getHours()
        const minutes = date.getMinutes()
        if (hours > 12) {
          hours -= 12
        }
        return hours + ':' + minutes
      },
      async getChat() {
        try {
          await chatService.getChats(props.orderProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      closeModal() {
        AppState.chat = {}
      },
      async createMessage() {
        try {
          await chatService.createMessage(state.message)
          state.message = ''
        } catch (error) {
          logger.error(error)
        }
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
</style>
