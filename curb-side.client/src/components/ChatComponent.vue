<template>
  <div class="chat">
    <div class="row bg-primary">
      <div class="col">
        <h3>{{ state.business.name }}</h3>
      </div>
    </div>
    <div class="col-12 d-flex chat-col of-hidden">
      <div id="chat" class="row of-auto">
        <message-component v-for="message in chatProp.content" :key="message._id" :message-prop="{message: message, logo: state.business.logo}" />
      </div>
    </div>
    <div class="col-12">
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
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { socketService } from '../services/SocketService'
import { chatService } from '../services/ChatService'
export default {
  name: 'ChatComponent',
  watch: {
    'state.chat.content'(newChat, oldChat) {
      const messageBody = document.querySelector('#chat')
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
    }
  },
  props: {
    chatProp: { type: Object, required: true }
  },
  setup(props) {
    onMounted(async() => {
      await socketService.emit('update:message', props.chatProp.orderId)
      const messageBody = document.querySelector('#chat')
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
    })
    const state = reactive({
      chat: computed(() => AppState.chat),
      business: computed(() => AppState.activeBusiness),
      message: ''

    })
    return {
      state,
      async createMessage() {
        try {
          await chatService.createMessage(state.message)
          const messageBody = document.querySelector('#chat')
          messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
          state.message = ''
        } catch (error) {
          console.error(error)
        }
      }

    }
  }
}
</script>

<style>

.chat {
  height: 100%;
}

.of-auto {
  overflow-y:auto ;
}
.of-hidden {
  overflow-y: hidden;
  height: 80%;

}
</style>
